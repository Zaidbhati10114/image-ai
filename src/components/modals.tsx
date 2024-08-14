"use client";

import { useState, useEffect } from "react";

import { SubscriptionModal } from "@/features/susbscriptions/components/subscription-modal";
import { FailModal } from "@/features/susbscriptions/components/fail-modal";
import { SuccessModal } from "@/features/susbscriptions/components/success-modal";

export const Modals = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <FailModal />
      <SuccessModal />
      <SubscriptionModal />
    </>
  );
};
