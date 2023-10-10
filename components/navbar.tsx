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
import { useSession, signIn, signOut } from "next-auth/react"


import React from "react";

export const Navbar = () => {
  return (
    <NextUINavbar style={{background:'white'}}>
      <NavbarBrand>
        <Link className="font-bold text-inherit text-xl" href="/" style={{userSelect:'none'}} >ITAG</Link>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link onClick={()=>{signIn("google")}} color="foreground">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="warning" href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
        {/* <Avatar icon={<AvatarIcon/>}></Avatar> */}
      </NavbarContent>
    </NextUINavbar>
  );
};
