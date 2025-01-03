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
// import { FaRegComment, FaHeart, FaRegHeart } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import { IconButton } from "@chakra-ui/react";
// import { useMutation } from "@/hooks/useMutation";
import DeleteReplyDialog from "@/components/deleteReplyDialog";
import formatDate from "@/utils/formatDate";

interface componentProps {
  itemData: any;
  token: any;
}

export default function Reply({ itemData, token }: componentProps) {
  //   const { mutate } = useMutation();
  const formattedDate = formatDate(itemData.updated_at);
  // const router = useRouter();

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

          {/* show button if reply is yours */}
          {itemData.is_own_reply === true && (
            <DeleteReplyDialog token={token} id={itemData.id} />
          )}
        </Flex>
      </Card.Header>
      <Card.Body>
        <p>{itemData.description}</p>
      </Card.Body>
    </Card.Root>
  );
}
