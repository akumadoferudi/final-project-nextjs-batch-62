import React from "react";
import { Flex } from "@chakra-ui/react";
import Cookies from "js-cookie";
import Reply from "@/components/reply";
import GetReplies from "@/pages/api/getReplies";

interface ComponentProps {
  open: boolean;
  itemData: any;
}

export default function ListOfReplies({ open, itemData }: ComponentProps) {
  const token = Cookies.get("user_token");

  const {
    data: repliesData,
    error: repliesError,
    isLoading: repliesLoading,
  } = GetReplies(open, itemData.id);

  if (!repliesData && repliesLoading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <Flex direction="column" gap="6" className="px-8">
      {repliesData && repliesData.length !== 0 ? (
        repliesData?.data.map((item: any) => {
          return <Reply key={item.key} itemData={item} token={token} />;
        })
      ) : (
        <div className="text-center text-white">No Replies</div>
      )}
    </Flex>
  );
}
