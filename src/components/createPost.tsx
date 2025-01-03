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
import { useState } from "react";
import { useMutation } from "@/hooks/useMutation";
import { useRouter } from "next/router";

interface componentProps {
  token: any;
}

const CreatePost = ({ token }: componentProps) => {
  const { mutate } = useMutation();
  const router = useRouter();
  const [payload, setPayload] = useState({ description: "" });

  // console.log("payload => ", payload);

  const HandleSubmit = async () => {
    // console.log(`Hello, ${payload.email} and ${payload.password}`);

    const response = await mutate({
      url: `${process.env.NEXT_PUBLIC_API_URL}/post`,
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
    <DialogRoot placement={"center"} motionPreset="slide-in-bottom">
      <DialogTrigger asChild>
        <Button
          colorScheme="blue"
          size="sm" // Adjust size as needed
          borderRadius="full" // Makes it circular
          zIndex={9}
        >
          Create Post
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <p className="font-bold text-xl">What is on your mind?</p>
          </DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Textarea
            autoresize
            onChange={(event) =>
              setPayload({ description: event.target.value })
            }
            padding="0.5rem"
          />
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button
              size="sm"
              className="border-solid border-2 border-white px-2 hover:bg-white hover:text-black"
            >
              Cancel
            </Button>
          </DialogActionTrigger>
          <Button
            size="sm"
            className="bg-blue-700 px-2 hover:bg-blue-500"
            onClick={HandleSubmit}
          >
            Submit
          </Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
};

export default CreatePost;
