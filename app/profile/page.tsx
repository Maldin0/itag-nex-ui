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
    <div className={profileStyle.profileBox}>
      <div className="profileBox" style={{minHeight:'120vh', marginTop:'-150px'}}>
        <div>
          <br /><br /><br /><br />
          dawdwadwa
        </div>
      </div>
    </div>
   
  );
}
