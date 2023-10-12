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

import { Tabs, Tab, Card, CardBody, Chip } from "@nextui-org/react";

type Props = {};


export default function Mycharacter({ }: Props) {

  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  

  return (
    <div className={profileStyle.profileBox}>
      <div className="container  flex-col items-center justify-center w-9/12 mx-auto " style={{ minHeight: '120vh', marginTop: '-150px' }}>
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />

        <div className="font justify-items-center" >
          <div className="text-center" style={{ fontSize: '30px' }}>
            <h1>Your Characters</h1>
          </div>
          <br />
          <div className="text-center font" style={{ fontSize: '20px' }}>
            <Tabs aria-label="Options" color="primary" radius="full" size="md">
              <Tab key="charactername" 
                title={
                  <div className="flex items-center space-x-2">
                    <span>CharacterName</span>
                    <Chip size="sm" variant="faded">1</Chip>
                  </div>
                }
              >
                <Card>
                  <CardBody>
                    Name:
                  </CardBody>
                </Card>
              </Tab>

              <Tab key="classname" title="ClassName">
                <Card>
                  <CardBody>
                    <div style={{display:'flex',alignItems:'flex-start'}}>
                      <div style={{flexShrink: '0'}}>(CharacterName):  &nbsp;&nbsp;</div>
                      <div style={{flexGrow: '1',width:'0%',whiteSpace:'normal'}}>Class</div>
                    </div>
                  </CardBody>
                </Card>
              </Tab>

              <Tab key="racename" title="RaceName">
                <Card>
                  <CardBody>
                    <div style={{display:'flex',alignItems:'flex-start'}}>
                      <div style={{flexShrink: '0'}}>(CharacterName):  &nbsp;&nbsp;</div>
                      <div style={{flexGrow: '1',width:'0%',whiteSpace:'normal'}}>Race</div>
                    </div>
                  </CardBody>
                </Card>
              </Tab>

              <Tab key="details" title="Details">
                <Card>
                  <CardBody>
                    <div style={{display:'flex',alignItems:'flex-start'}}>
                      <div style={{flexShrink: '0'}}>(CharacterName):  &nbsp;&nbsp;</div>
                      <div style={{flexGrow: '1',width:'0%',whiteSpace:'normal'}}>Details</div>
                    </div>
                  </CardBody>
                </Card>
              </Tab>

              <Tab key="inventory" title="Inventory">
                <Card>
                  <CardBody>
                    <div style={{display:'flex',alignItems:'flex-start'}}>
                      <div style={{flexShrink: '0'}}>(CharacterName):  &nbsp;&nbsp;</div>
                      <div style={{flexGrow: '1',width:'0%',whiteSpace:'normal'}}>inventory &nbsp;&nbsp;<Button color="warning" variant="flat"  size="sm" onPress={onOpen}>OPEN INVENTORY</Button>
                        <Modal backdrop="blur" size="5xl" isOpen={isOpen} onOpenChange={onOpenChange}>
                          <ModalContent>
                            {(onClose) => (
                              <>
                                <ModalHeader className="flex flex-col gap-1">Ur inven bitches</ModalHeader>
                                <ModalBody>
                                  Items
                                </ModalBody>
                                <ModalFooter>
                                  <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                  </Button>  
                                </ModalFooter>
                              </>
                            )}
                          </ModalContent>
                        </Modal>
                        
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Tab>

              <Tab key="delete" title="Delete">
                <Card>
                  <CardBody>
                    <div style={{display:'flex',alignItems:'flex-start'}}>
                      <div style={{flexShrink: '0',marginTop:'0.3%'}}>(CharacterName):&nbsp;&nbsp;</div>
                      <div><Button color="danger" variant="flat" onPress={onOpen}>Delete</Button>
                        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                          <ModalContent>
                            {(onClose) => (
                              <>
                                <ModalHeader className="flex flex-col gap-1 text-center">ARE YOU SURE TO DELETE YOUR CHARACTER ?</ModalHeader>
                                <ModalBody>
                                  <p></p>
                                  <Button color="success" variant="light">Yes</Button>
                                  <p></p>
                                  <Button color="danger" variant="light" onPress={onClose}>No</Button>
                                </ModalBody>
                                <ModalFooter>
                                  <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                  </Button>
                                </ModalFooter>
                              </>
                            )}
                          </ModalContent>
                        </Modal>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Tab>
            </Tabs>
          </div>  
          <div className=" text-center mt-40" >
            <Link href="createcharacter">
              <Button size="lg" radius="full" color="warning" variant="shadow" >Create Character</Button>
            </Link>
          </div>
        </div>

        <br />
      </div>
    </div>

  );
}
