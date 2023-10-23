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
import {  
  Dropdown,  
  DropdownTrigger,  
  DropdownMenu,  
  DropdownSection,  
  DropdownItem
} from "@nextui-org/dropdown";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import {Avatar} from "@nextui-org/react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import Swal from "sweetalert2";

import React from "react";
export const Navbar = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [loading, setLoading] = React.useState<boolean>(false);
  const pathname = usePathname();
  const disabledKeys = pathname === "/mycharacter" ? ["mycharacter"] : [];
  


  async function handleLogout() {
    try {
      setLoading(true);
      await signOut({
        callbackUrl: '/'});
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }


  async function handleLogin() {
    try {
      setLoading(true);
      await signIn("google", {callbackUrl: '/'});
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  
  return (
    <NextUINavbar style={{ background: "white"}}>
      <NavbarBrand>
        <Link className="font-bold text-inherit text-xl select-none" href="/">
          ITAG
        </Link>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem>
         {session ? (
          <Dropdown>
          <DropdownTrigger>
            <Avatar isBordered src={session.user?.image!} style={{ cursor: "pointer" }}></Avatar>
          </DropdownTrigger>
          <DropdownMenu disabledKeys={disabledKeys}>

              <DropdownItem key="mycharacter" onClick={()=>{
                router.push("/mycharacter")
              }}
              >
                My Character
              </DropdownItem> 
              <DropdownItem 
              onClick={async () => {
                document.body.style.cursor = "wait";
                await handleLogout();
              }}
              className="text-danger" 
              color="danger">
                  Logout
              </DropdownItem>
          </DropdownMenu>
          </Dropdown>
        
          ) : (
            <Button
              as={Link}
              color="warning"
              onClick={async () => {
                document.body.style.cursor = "wait";
                await handleLogin();
              }}
              variant="flat"
              disabled={loading}
            >
              {loading ? "Loading..." : "Login"}
            </Button>
          )}
        </NavbarItem>
      </NavbarContent>
    </NextUINavbar>
  );
};
