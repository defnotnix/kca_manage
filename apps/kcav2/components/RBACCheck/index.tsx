"use client";

import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { Center, Text } from "@mantine/core";

interface SessionData {
  is_admin?: boolean;
  is_staff?: boolean;
  is_coach?: boolean;
}

export function RBACCheck({
  children,
  showStaff,
  showCoach,
}: {
  children: React.ReactNode;
  showStaff?: boolean;
  showCoach?: boolean;
}) {
  const [sessionData, setSessionData] = useState<SessionData | null>(null);

  useEffect(() => {
    const token = sessionStorage.getItem("kcatoken");
    if (token) {
      try {
        setSessionData(jwtDecode<SessionData>(token));
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  }, []);

  // Wait for sessionData to load
  if (sessionData === null) {
    return null; // Or a loading indicator
  }

  if (
    sessionData.is_admin ||
    (showStaff && sessionData.is_staff) ||
    (showCoach && sessionData.is_coach)
  ) {
    return <>{children}</>;
  }

  return (
    <Center p="xl">
      <Text size="xs">You do not have permissions to view this module</Text>
    </Center>
  );
}
