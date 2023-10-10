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

import React from "react";
import { Avatar, AvatarIcon } from "@nextui-org/react";

export const Navbar = () => {
  return (
    <NextUINavbar style={{background:'white'}}>
      <NavbarBrand>
        <p className="font-bold text-inherit text-xl" style={{userSelect:'none'}}>ITAG</p>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="#" color="foreground">Login</Link>
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
