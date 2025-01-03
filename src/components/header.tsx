/* eslint-disable */

import React, { useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { UserContext } from "@/context/userContext";
import { Box, Flex, HStack, IconButton, Text } from "@chakra-ui/react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { FiLogOut } from "react-icons/fi";
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "@/components/ui/menu";
import { useMutation } from "@/hooks/useMutation";
import Cookies from "js-cookie";
import CreatePost from "@/components/createPost";

export default function Header() {
  const router = useRouter();
  const { mutate } = useMutation();
  const dataProfile = useContext(UserContext);
  const profileUser = dataProfile;
  const token = Cookies.get("user_token");

  console.log("data profile => ", profileUser);

  /** handle logout practice base */
  const HandleLogout = async () => {
    const response = await mutate({
      url: `${process.env.NEXT_PUBLIC_API_URL}/logout`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response?.success) {
      Cookies.remove("user_token", { path: "" });
      // router.reload();
    }
  };

  return (
    <div className="relative">
      <Box
        position="fixed"
        top="0"
        left="0"
        right="0"
        bg="#432E54"
        zIndex="999"
        shadow="md"
        className="container-phone"
      >
        <Flex
          alignItems="center"
          justifyContent="space-between"
          px={6}
          py={4}
          color="white"
        >
          {/* Left Section: Menu or Logo */}
          <HStack>
            <Link href="/">
              <Text fontWeight="bold" fontSize="xl">
                SEDULURUM
              </Text>
            </Link>
          </HStack>

          {/* Right Section: menu profile (rendered if token exist or not null) */}
          {!!token && (
            <HStack>
              <MenuRoot>
                <MenuTrigger asChild>
                  <IconButton
                    aria-label="Open menu"
                    variant="plain"
                    // color="white"
                    // _hover={{ bg: "teal.600" }}
                  >
                    <Avatar
                      name={profileUser?.data?.name}
                      size="md"
                      variant="solid"
                      // colorPalette={pickPalette(profileUser.name)}
                      className="hover:scale-125 transform transition duration-300"
                    />
                    {/* <FiMenu /> */}
                  </IconButton>
                </MenuTrigger>
                <MenuContent>
                  {/* Create Post */}
                  <MenuItem
                    value="create-post"
                    color="fg.success"
                    _hover={{ bg: "bg.success", color: "fg.success" }}
                  >
                    <CreatePost token={token} />
                  </MenuItem>

                  {/* Profile */}
                  <MenuItem value="profile">
                    <Link href="/profile">Profile</Link>
                  </MenuItem>

                  {/* Notifications */}
                  <MenuItem value="notifications">
                    <Link href="/notifications">Notifications</Link>
                  </MenuItem>

                  {/* Logout */}
                  <MenuItem
                    value="logout"
                    color="fg.error"
                    _hover={{ bg: "bg.error", color: "fg.error" }}
                  >
                    <Button size="sm" onClick={HandleLogout}>
                      Logout
                      <FiLogOut />
                    </Button>
                  </MenuItem>
                </MenuContent>
              </MenuRoot>
            </HStack>
          )}
        </Flex>
      </Box>
    </div>
  );
}
