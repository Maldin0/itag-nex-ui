"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import profileStyle from "./profileStyle.module.css";
import line from "./images/line.png";
import { log } from "util";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  DropdownMenu,
  Dropdown,
  DropdownTrigger,
  DropdownSection,
  DropdownItem,
} from "@nextui-org/react";

type Props = {};


export default function Profile({}: Props) {
  return (
    <div className={`${profileStyle.profileBox} container flex flex-col items-center justify-center w-9/12 `}>
        <div className={profileStyle.topfont}>
          dawdwadwa
        </div>
    </div>
   
  );
}
