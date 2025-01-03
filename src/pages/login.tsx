/** eslint-disable */

import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useMutation } from "@/hooks/useMutation";
import {
  Flex,
  Stack,
  // Heading,
  Fieldset,
  Input,
} from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { toaster } from "@/components/ui/toaster";

const LayoutComponent = dynamic(() => import("@/layout"));

export default function Login() {
  const { mutate } = useMutation();
  const router = useRouter();
  const [payload, setPayload] = useState({
    email: "",
    password: "",
  });

  const HandleSubmit = async () => {
    // console.log(`Hello, ${payload.email} and ${payload.password}`);

    const response = await mutate({
      url: `${process.env.NEXT_PUBLIC_API_URL}/login`,
      payload,
    });
    console.log("response => ", response);

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

      console.log("!!!Gagal login!!!");
      router.reload();
    } else {
      Cookies.set("user_token", response?.data?.token, {
        expires: new Date(response?.data?.expires_at),
        path: "/",
      });
      router.push("/");

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
    <LayoutComponent>
      <Flex alignItems={"center"} justifyContent={"center"} height="100vh">
        <Stack direction={"column"}>
          <Fieldset.Root size="lg" maxW="md">
            <Stack>
              <Fieldset.Legend>LOGIN</Fieldset.Legend>
              <Fieldset.HelperText>
                Login to the app or{" "}
                <Link
                  href="/register"
                  className="text-blue-500 hover:bg-blue-500 hover:text-white hover:p-1 hover:rounded-md underline"
                >
                  do not have an account?
                </Link>
              </Fieldset.HelperText>
            </Stack>

            <Fieldset.Content>
              <Field label="Email address">
                <Input
                  padding="0.5rem"
                  value={payload.email}
                  onChange={(event) =>
                    setPayload({ ...payload, email: event.target.value })
                  }
                  name="email"
                  type="email"
                  className="border-2 border-solid border-slate-300"
                />
              </Field>

              <Field label="Password">
                <Input
                  padding="0.5rem"
                  value={payload.password}
                  onChange={(event) =>
                    setPayload({ ...payload, password: event.target.value })
                  }
                  name="password"
                  type="password"
                  className="border-2 border-solid border-slate-300"
                />
              </Field>
            </Fieldset.Content>

            <Button
              // type="submit"
              variant="outline"
              size="sm"
              onClick={() => HandleSubmit()}
              alignSelf="flex-start"
              className="bg-blue-600 mt-4 px-3"
            >
              Submit
            </Button>
          </Fieldset.Root>
        </Stack>
      </Flex>
    </LayoutComponent>
  );
}
