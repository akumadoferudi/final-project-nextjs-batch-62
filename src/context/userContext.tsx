/* eslint-disable */

import React, { createContext, useContext } from "react";
import { useQueries } from "@/hooks/useQueries";
import Cookies from "js-cookie";

export const UserContext = createContext({});

export default function UserContextProvider({
  children,
  ...props
}: {
  children: React.ReactNode;
  props: any;
}) {
  const token = Cookies.get("user_token");

  const { data: userData }: any = useQueries({
    prefixUrl: `${process.env.NEXT_PUBLIC_API_URL}/user/me`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return (
    <UserContext.Provider value={userData || {}} {...props}>
      {children}
    </UserContext.Provider>
  );
}
