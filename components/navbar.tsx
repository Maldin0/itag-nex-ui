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
import Swal from 'sweetalert2'


import React from "react";

export const Navbar = () => {
  const [loading, setLoading] = React.useState<boolean>(false);

  async function handleLogin() {
    try {
      setLoading(true);
      await signIn("google")
      .then(()=>{
        Swal.fire({
          icon: 'success',
          title: 'Login Success',
          text: 'Welcome to ITAG Project Web-Game',
        })
        })
      } catch (error) {
      console.log(error);
    }
  }

  return (
    <NextUINavbar style={{background:'white'}}>
      <NavbarBrand>
        <Link className="font-bold text-inherit text-xl" href="/" style={{userSelect:'none'}} >ITAG</Link>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="warning" onClick={async ()=>{await signIn("google")}} variant="flat">
            login
          </Button>
        </NavbarItem>
        {/* <Avatar icon={<AvatarIcon/>}></Avatar> */}
      </NavbarContent>
    </NextUINavbar>
  );
};
