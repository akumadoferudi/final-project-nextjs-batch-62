import React from "react";
import { Flex } from "@chakra-ui/react";
import Cookies from "js-cookie";
import Post from "@/components/post";

interface ComponentProps {
  postsData: any;
  postsError: any;
  postsLoading: any;
}

export default function SelfPosts({
  postsData,
  postsError,
  postsLoading,
}: ComponentProps) {
  const token = Cookies.get("user_token");

  return (
    <Flex direction="column" gap="6" className="px-8">
      {postsData?.data.map((item: any) => {
        return <Post key={item.key} itemData={item} token={token} />;
      })}
    </Flex>
  );
}
