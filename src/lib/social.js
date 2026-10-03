const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { useAuth } from "@/lib/AuthContext";

export function useMyProfile() {
  const { user } = useAuth();
  const qc = useQueryClient();
  const query = useQuery({
    queryKey: ["myProfile", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const list = await db.entities.Profile.filter({ created_by_id: user.id }, "-updated_date", 1);
      if (list[0]) return list[0];
      try {
        return await db.entities.Profile.create({
          display_name: user.full_name || (user.email ? user.email.split("@")[0] : "Me"),
          streak: 0,
          today_done: 0,
          today_total: 0,
          last_active: "",
        });
      } catch {
        const retry = await db.entities.Profile.filter({ created_by_id: user.id }, "-updated_date", 1);
        return retry[0] || null;
      }
    },
  });
  const save = useMutation({
    mutationFn: ({ id, ...patch }) => db.entities.Profile.update(id, patch),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["myProfile", user?.id] }),
  });
  return { profile: query.data, save, isLoading: query.isLoading };
}

export function useFriendships() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["friendships", user?.id],
    enabled: !!user,
    queryFn: () => db.entities.Friendship.list("-updated_date", 200),
  });
}

export function useFriendProfiles(ids) {
  const key = ids.slice().sort().join(",");
  return useQuery({
    queryKey: ["friendProfiles", key],
    enabled: ids.length > 0,
    queryFn: () => db.entities.Profile.filter({ created_by_id: { $in: ids } }, "-updated_date", 200),
  });
}

export function useAddFriend() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (email) =>
      db.entities.Friendship.create({ to_email: email.toLowerCase(), status: "pending" }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["friendships"] }),
  });
}

export function useAcceptFriend() {
  const { user } = useAuth();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (f) => db.entities.Friendship.update(f.id, { status: "accepted", to_user: user.id }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["friendships"] }),
  });
}

export function useRemoveFriend() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (f) => db.entities.Friendship.delete(f.id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["friendships"] }),
  });
}