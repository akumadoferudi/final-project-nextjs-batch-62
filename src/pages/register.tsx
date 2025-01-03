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
import DatePicker from "react-date-picker";

// Datepicker default styling
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";

const LayoutComponent = dynamic(() => import("@/layout"));

export default function Register() {
  const { mutate } = useMutation();
  const router = useRouter();
  const [dobValue, setDobValue] = useState(new Date());
  const [payload, setPayload] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    dob: "", // Date of Birth
    hobby: "",
  });

  const HandleSubmit = async () => {
    // console.log(`Hello, ${payload.email} and ${payload.password}`);

    const response = await mutate({
      url: `${process.env.NEXT_PUBLIC_API_URL}/register`,
      payload,
    });
    console.log("response => ", response);
    console.log("payload register => ", payload);

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

      console.log("!!!Gagal register!!!");
      router.reload();
    } else {
      router.push("/login");

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
              <Fieldset.Legend>REGISTER</Fieldset.Legend>
              <Fieldset.HelperText>
                <Link
                  href="/login"
                  className="text-blue-500 hover:bg-blue-500 hover:text-white hover:p-1 hover:rounded-md underline"
                >
                  Already have an account?
                </Link>
              </Fieldset.HelperText>
            </Stack>

            <Fieldset.Content>
              {/* Input: Name */}
              <Field label="Name" required>
                <Input
                  required
                  padding="0.5rem"
                  value={payload.name}
                  onChange={(event) =>
                    setPayload({ ...payload, name: event.target.value })
                  }
                  name="name"
                  type="text"
                  className="border-2 border-solid border-slate-300"
                />
              </Field>

              {/* Input: Email */}
              <Field label="Email address" required>
                <Input
                  required
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

              {/* Input: Password */}
              <Field label="Password" required>
                <Input
                  required
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

              {/* Input: Phone */}
              <Field label="Phone">
                <Input
                  padding="0.5rem"
                  value={payload.phone}
                  onChange={(event) =>
                    setPayload({ ...payload, phone: event.target.value })
                  }
                  name="phone"
                  type="text"
                  className="border-2 border-solid border-slate-300"
                />
              </Field>

              {/* Input: Hobby */}
              <Field label="Hobby">
                <Input
                  padding="0.5rem"
                  value={payload.hobby}
                  onChange={(event) =>
                    setPayload({ ...payload, hobby: event.target.value })
                  }
                  name="hobby"
                  type="text"
                  className="border-2 border-solid border-slate-300"
                />
              </Field>

              {/* Input: Date of Birth */}
              <Field label="Date of Birth">
                {/* <DatePicker
                  onChange={setDobValue}
                  value={dobValue}
                  className={"p-1 border-2 border-solid border-slate-300"}
                /> */}
                <Input
                  padding="0.5rem"
                  value={payload.dob}
                  onChange={(event) =>
                    setPayload({ ...payload, dob: event.target.value })
                  }
                  name="dob"
                  type="text"
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
