"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useFailModal } from "../store/use-fail-modal";
import { useSuccessModal } from "../store/use-success-modal";

export const SubscriptionAlert = () => {
  const params = useSearchParams();

  const { onOpen: onOpenFail } = useFailModal();
  const { onOpen: onOpenSuccess } = useSuccessModal();

  const canceled = params.get("cancel");
  const success = params.get("success");

  useEffect(() => {
    if (canceled) {
      onOpenFail();
    }

    if (success) {
      onOpenSuccess();
    }
  }, [canceled, onOpenFail, success, onOpenSuccess]);

  return null;
};
