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

import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";

type Props = {};


export default function Profile({ }: Props) {
  return (
    <div className={profileStyle.profileBox}>
      <div className="container  flex-col items-center justify-center w-9/12 mx-auto " style={{ minHeight: '120vh', marginTop: '-150px' }}>
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />

        <div className="font justify-items-center" >
          <div className="text-center" style={{ fontSize: '30px' }}>
          <h1>Your Character</h1>
          </div>
          <br />
          <div className="text-center" style={{ fontSize: '20px' }}>
          <Tabs aria-label="Options" color="primary" radius="full" size="md">
            <Tab key="charactername" title="CharacterName">
              <Card>
                <CardBody>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </CardBody>
              </Card>
            </Tab>
            <Tab key="classname" title="ClassName">
              <Card>
                <CardBody>
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                </CardBody>
              </Card>
            </Tab>
            <Tab key="racename" title="RaceName">
              <Card>
                <CardBody>
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </CardBody>
              </Card>
            </Tab>
            <Tab key="details" title="Details">
              <Card>
                <CardBody>
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </CardBody>
              </Card>
            </Tab>
            <Tab key="inventory" title="Inventory">
              <Card>
                <CardBody>
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </CardBody>
              </Card>
            </Tab>
            <Tab key="delete" title="Delete">
              <Card>
                <CardBody>
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </CardBody>
              </Card>
            </Tab>
          </Tabs>
          </div>  
        </div>

        <br />
      </div>
    </div>

  );
}
