import React from "react";
import { RotateCcw } from "lucide-react";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useLang } from "@/lib/i18n";
import { store } from "@/lib/storage";

export default function StartOverButton() {
  const { t } = useLang();
  const clear = () => {
    store.clearAll();
    window.location.href = "/";
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="inline-flex items-center gap-2 h-12 px-5 rounded-full border-2 border-border bg-card text-base font-bold hover:border-primary transition-colors">
          <RotateCcw className="w-5 h-5" /> {t("startOver")}
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className="rounded-3xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="font-heading text-2xl">{t("startOverTitle")}</AlertDialogTitle>
          <AlertDialogDescription className="text-lg text-muted-foreground">{t("startOverText")}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-2">
          <AlertDialogCancel className="h-12 px-6 text-base rounded-full">{t("cancel")}</AlertDialogCancel>
          <AlertDialogAction onClick={clear} className="h-12 px-6 text-base rounded-full">{t("confirmClear")}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}