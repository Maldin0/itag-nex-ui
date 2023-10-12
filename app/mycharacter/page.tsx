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
        <br /><br /><br /><br /><br /><br />

        <div className="font justify-items-center" >
          <div className="text-left" style={{ fontSize: '60px',fontWeight:'bold',fontStyle:'italic'}}>
            <h1>CHARACTERS</h1>
          </div>

          
          <div className={profileStyle.line}></div>
          <div className=" ml-10 mt-5" style={{fontStyle:'italic'}}>
            <h5>YOUR CHARACTER LIST</h5>
          </div>
          <br /><br /><br />

          <div className="text-center " style={{ fontSize: '20px' }}>
            <Tabs aria-label="Options" color="warning" radius="sm" size="lg">
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
                      <div style={{flexShrink: '0',marginTop:'0.5%'}}>(CharacterName):  &nbsp;&nbsp;</div>
                      <div style={{flexGrow: '1',width:'0%',whiteSpace:'normal',textAlign:'right'}}> &nbsp;&nbsp;<Button color="warning" variant="flat"  size="lg" onPress={onOpen}>OPEN INVENTORY</Button>
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
                      <div style={{flexShrink: '0',marginTop:'0.5%'}}>(CharacterName):&nbsp;&nbsp;</div>
                      <div style={{ flexGrow: 1, textAlign: 'right' }}><Button color="danger" variant="flat" size="lg" onPress={onOpen}>Delete Character</Button>
                        <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
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
<<<<<<< HEAD
          </div>
=======
          </div>  
          
          

          
          
          
>>>>>>> 4d2f6d6171f1ab1def66b608647b67b9d0bba231
          <div className=" text-center mt-40" >
            
            <Link href="createcharacter">
              <Button  size="lg" radius='md' color='success' variant='solid' >Create Character</Button>
            </Link>
          </div>
        </div>

        <br />
      </div>
    </div>

  );
}
