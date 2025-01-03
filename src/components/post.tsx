import React from "react";
import { Card, Flex, HStack } from "@chakra-ui/react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "@/components/ui/menu";
import { FaRegComment, FaHeart, FaRegHeart } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import { IconButton } from "@chakra-ui/react";
import { useMutation } from "@/hooks/useMutation";
import DeletePostDialog from "@/components/deletePostDialog";
import EditPostDialog from "@/components/editPostDialog";
import ReplyPostDialog from "@/components/replyPostDialog";
import formatDate from "@/utils/formatDate";

interface componentProps {
  itemData: any;
  token: any;
}

export default function Post({ itemData, token }: componentProps) {
  const { mutate } = useMutation();
  const formattedDate = formatDate(itemData.updated_at);
  // const router = useRouter();

  const handleLikeClick = (id: number) => {
    mutate({
      url: `${process.env.NEXT_PUBLIC_API_URL}/likes/post/${id}`,
      headers: { Authorization: `Bearer ${token}` },
    });

    // Revalidated
    // mutatePosts();
    // router.reload();
  };

  const handleUnlikeClick = (id: number) => {
    mutate({
      url: `${process.env.NEXT_PUBLIC_API_URL}/unlikes/post/${id}`,
      headers: { Authorization: `Bearer ${token}` },
    });

    // Revalidated
    // mutatePosts();
    // router.reload();
  };

  return (
    <Card.Root
      key={itemData.id}
      variant={"subtle"}
      className="rounded-xl bg-[#3C3D37]"
    >
      <Card.Header>
        <Flex direction="row" justify="space-between">
          <Flex gap="4" align="center" justify="flex-start">
            <Avatar name={`${itemData.user.name}`} size="xl" />
            <Flex direction="column">
              <p className="text-sm font-bold">
                {itemData.is_own_post === true
                  ? `${itemData.user.name} (You)`
                  : `${itemData.user.name}`}
              </p>
              <p className="text-sm">{itemData.user.email}</p>
              {itemData.updated_at !== itemData.created_at ? (
                <p className="text-xs mt-2">
                  {`${formattedDate}`}
                  <span className="bg-[#ECDFCC] p-1 ms-2 rounded-md text-black">
                    EDITED
                  </span>
                </p>
              ) : (
                <p className="text-xs mt-1">{`${formattedDate}`}</p>
              )}
            </Flex>
          </Flex>

          {/* show button if post is ours */}
          {itemData.is_own_post === true && (
            <MenuRoot>
              <MenuTrigger asChild>
                <IconButton
                  size="md"
                  className="hover:bg-slate-300 hover:text-black"
                >
                  <HiDotsVertical />
                </IconButton>
              </MenuTrigger>
              <MenuContent>
                <MenuItem value="edit">
                  <EditPostDialog
                    token={token}
                    id={itemData.id}
                    descriptionValue={itemData.description}
                  />
                </MenuItem>
                <MenuItem
                  value="delete"
                  color="fg.error"
                  _hover={{ bg: "bg.error", color: "fg.error" }}
                >
                  <DeletePostDialog token={token} id={itemData.id} />
                </MenuItem>
              </MenuContent>
            </MenuRoot>
          )}
        </Flex>
      </Card.Header>
      <Card.Body>
        <p>{itemData.description}</p>
      </Card.Body>
      <Card.Footer>
        <HStack gap="4" width="100%" className="">
          <Button
            variant="ghost"
            onClick={() => {
              if (itemData.is_like_post !== true) {
                console.log("post liked");
                return handleLikeClick(itemData.id);
              } else {
                console.log("post unliked");
                return handleUnlikeClick(itemData.id);
              }
            }}
          >
            {itemData.is_like_post === true ? (
              <FaHeart className="text-red-500" />
            ) : (
              <FaRegHeart className="text-red-500" />
            )}
            {`${itemData.likes_count} Like`}
          </Button>

          {/* Reply */}
          <ReplyPostDialog token={token} itemData={itemData} />
        </HStack>
      </Card.Footer>
    </Card.Root>
  );
}
