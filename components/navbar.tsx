"use client";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { useSession, signIn, signOut } from "next-auth/react";
import Swal from "sweetalert2";

import React from "react";

export const Navbar = () => {
  const [loading, setLoading] = React.useState<boolean>(false);

  async function handleLogin() {
    try {
      setLoading(true);
      await signIn("google");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <NextUINavbar style={{ background: "white" }}>
      <NavbarBrand>
        <Link className="font-bold text-inherit text-xl select-none" href="/">
          ITAG
        </Link>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button
            as={Link}
            color="warning"
            onClick={async () => {
              await handleLogin();
            }}
            variant="flat"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
              style={{marginRight:'-3px'}}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
              />
            </svg>
            Login
          </Button>
        </NavbarItem>
        {/* <Avatar icon={<AvatarIcon/>}></Avatar> */}
      </NavbarContent>
    </NextUINavbar>
  );
};
