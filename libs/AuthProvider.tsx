"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";

interface AuthProviderProps {
  session: any;
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ session, children }) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default AuthProvider;
