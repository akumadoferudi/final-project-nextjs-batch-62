import { Textarea } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toaster } from "@/components/ui/toaster";
import { useMutation } from "@/hooks/useMutation";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaRegComment } from "react-icons/fa";
import ListOfReplies from "@/components/listOfReplies";

interface componentProps {
  token: any;
  itemData: any;
}

export default function ReplyPostDialog({ token, itemData }: componentProps) {
  const { mutate } = useMutation();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [payload, setPayload] = useState({ description: "" });

  // console.log("payload => ", payload);

  const HandleSubmit = async () => {
    const response = await mutate({
      url: `${process.env.NEXT_PUBLIC_API_URL}/replies/post/${itemData.id}`,
      headers: { Authorization: `Bearer ${token}` },
      payload,
    });
    // console.log("response => ", response);

    if (!response?.success) {
      toaster.create({
        title: `${response.message}`,
        type: "error",
        duration: 3000,
        action: {
          label: "Close",
          onClick: () => {},
        },
      });

      // router.reload();
    } else {
      router.reload();

      toaster.create({
        title: `${response.message}`,
        type: "success",
        duration: 3000,
        action: {
          label: "Close",
          onClick: () => {},
        },
      });
    }
  };

  return (
    <DialogRoot
      lazyMount
      scrollBehavior="inside"
      placement={"center"}
      motionPreset="slide-in-bottom"
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
    >
      <DialogTrigger asChild>
        <Button variant="ghost">
          <FaRegComment /> {`${itemData.replies_count} Reply`}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mt-5">
            <Textarea
              autoresize
              value={payload.description}
              onChange={(event) =>
                setPayload({ description: event.target.value })
              }
              padding="0.5rem"
            />
            <Button
              size="sm"
              className="bg-blue-700 px-2 hover:bg-blue-500 w-full text-center"
              onClick={HandleSubmit}
            >
              Reply
            </Button>
          </DialogTitle>
        </DialogHeader>
        <DialogBody>
          <ListOfReplies open={open} itemData={itemData} />
        </DialogBody>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}
