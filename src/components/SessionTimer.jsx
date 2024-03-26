"use client";

import { useEffect } from "react";
import { useSession, signOut } from "next-auth/react";

export default function InactivityTimer({ timeoutSeconds = 1800 }) {
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) {
      return;
    }

    let logoutTimer;

    const resetTimer = () => {
      clearTimeout(logoutTimer);
      logoutTimer = setTimeout(logout, timeoutSeconds * 1000);
    };

    const logout = () => {
      sessionStorage.removeItem("isVerificationValidated");
      const logoutMessage =
        "Por razones de seguridad, despues de un tiempo sin actividad se cierra automaticamente.";
      localStorage.setItem("logoutMessage", logoutMessage);
      signOut();
    };

    const handleActivity = () => {
      resetTimer();
    };

    resetTimer();

    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("keypress", handleActivity);

    return () => {
      clearTimeout(logoutTimer);
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("keypress", handleActivity);
    };
  }, [timeoutSeconds, session]);
  return null;
}
