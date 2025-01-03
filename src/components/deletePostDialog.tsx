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

interface componentProps {
  token: any;
  id: string | number;
}

export default function DeletePostDialog({ token, id }: componentProps) {
  const { mutate } = useMutation();
  const router = useRouter();

  // console.log("payload => ", payload);

  const HandleSubmit = async () => {
    const response = await mutate({
      url: `${process.env.NEXT_PUBLIC_API_URL}/post/delete/${id}`,
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
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
          size="sm" // Adjust size as needed
        >
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <p className="font-bold text-xl">Delete Post</p>
          </DialogTitle>
        </DialogHeader>
        <DialogBody>
          <p>U sure wanna delete this? You cannot undo your action.</p>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button
              size="sm"
              className="border-solid border-2 border-white px-2 hover:bg-white hover:text-black"
            >
              Nuh uh
            </Button>
          </DialogActionTrigger>
          <Button
            size="sm"
            className="bg-red-700 px-2 hover:bg-red-500"
            onClick={HandleSubmit}
          >
            Delete
          </Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}