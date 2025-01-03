/* eslint-disable */

import React, { createContext, useContext } from "react";
import { useQueries } from "@/hooks/useQueries";
import Cookies from "js-cookie";

export const SelfPostContext = createContext({});

export default function SelfPostContextProvider({
  children,
  ...props
}: {
  children: React.ReactNode;
  props: any;
}) {
  const token = Cookies.get("user_token");

  const { data: selfPostData }: any = useQueries({
    prefixUrl: `${process.env.NEXT_PUBLIC_API_URL}/user/me`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return (
    <SelfPostContext.Provider value={selfPostData || {}} {...props}>
      {children}
    </SelfPostContext.Provider>
  );
}
