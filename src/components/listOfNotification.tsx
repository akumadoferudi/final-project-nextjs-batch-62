import React from "react";
import { Flex } from "@chakra-ui/react";
import Cookies from "js-cookie";
import Notification from "@/components/notification";

interface ComponentProps {
  notificationsData: any;
  notificationsError: any;
  notificationsLoading: any;
}

export default function ListOfPosts({
  notificationsData,
  notificationsError,
  notificationsLoading,
}: ComponentProps) {
  const token = Cookies.get("user_token");

  return (
    <Flex direction="column" gap="6" className="px-8">
      {notificationsData?.data.map((item: any) => {
        return <Notification key={item.key} itemData={item} token={token} />;
      })}
    </Flex>
  );
}
