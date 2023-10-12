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
  Tabs,
  Tab,
  Card,
  CardBody,
  Chip,
} from "@nextui-org/react";

type Props = {};

export default function Mycharacter({}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isinvenOpen, setinvenOpen] = useState(false);
  const [isdeleteOpen, setdeleteOpen] = useState(false);

  return (
    <div
      className="container  flex-col items-center justify-center w-9/12 mx-auto "
      style={{ minHeight: "120vh", marginTop: "-150px" }}
    >
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="font justify-items-center">
        <p className="text-6xl">Characters</p>
        <div className={profileStyle.line}></div>

        <div className=" ml-10 mt-5" style={{ fontStyle: "italic" }}>
          <h5>YOUR CHARACTER LIST</h5>
        </div>
        <br />
        <br />
        <br />
        <div
          className="text-left"
          style={{ fontSize: "30px", backgroundColor: "#0a0a0a" }}
        >
          <h1 onClick={onOpen}>Blablabla</h1>
          <Modal
            size="5xl"
            backdrop="blur"
            isOpen={isOpen}
            onClose={onClose}
            className="font"
            style={{ color: "white", fontSize: "20px" }}
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    <h1 style={{ fontSize: "30px" }}>(Character name)</h1>
                  </ModalHeader>
                  <ModalBody>
                    <div className=" p-3">
                      <p>
                        <strong>Class: </strong>
                      </p>
                      <p>
                        <strong>Race: </strong>
                      </p>
                      <p>
                        <strong>Status: </strong>
                      </p>
                      <p>
                        <strong>Backstory: </strong>
                      </p>
                      <p>
                        <strong>Skills: </strong>
                      </p>
                      <p>
                        <strong>Features: </strong>
                      </p>
                      <p>
                        <strong>Spells: </strong>
                      </p>
                      <p>
                        <strong>Traits: </strong>
                      </p>
                    </div>
                    <br />
                    <p className=" text-center">
                      <Button
                        color="warning"
                        variant="flat"
                        onClick={() => setinvenOpen(true)}
                      >
                        OPEN INVENTORY
                      </Button>
                    </p>
                    <Modal
                      closeButton
                      isOpen={isinvenOpen}
                      onClose={() => setinvenOpen(false)}
                    >
                      <ModalContent>
                        <ModalHeader className="flex flex-col gap-1">
                          YOUR ITEMS
                        </ModalHeader>
                        <ModalBody>items</ModalBody>
                        <ModalFooter>
                          <Button
                            color="danger"
                            onPress={() => setinvenOpen(false)}
                          >
                            Close
                          </Button>
                        </ModalFooter>
                      </ModalContent>
                    </Modal>

                    <p className=" text-center">
                      <Button
                        color="danger"
                        variant="flat"
                        onClick={() => setdeleteOpen(true)}
                      >
                        DELETE CHARACTER
                      </Button>
                    </p>
                    <Modal
                      closeButton
                      isOpen={isdeleteOpen}
                      onClose={() => setdeleteOpen(false)}
                    >
                      <ModalContent>
                        <ModalHeader className="flex flex-col gap-1">
                          ARE YOU SURE TO DELETE YOUR CHARACTER ?
                        </ModalHeader>
                        <ModalBody>
                          <Button color="success" variant="light">
                            YES
                          </Button>
                          <Button
                            color="danger"
                            variant="light"
                            onPress={() => setdeleteOpen(false)}
                          >
                            NO
                          </Button>
                        </ModalBody>
                        <ModalFooter>
                          <Button
                            color="danger"
                            onPress={() => setdeleteOpen(false)}
                          >
                            Close
                          </Button>
                        </ModalFooter>
                      </ModalContent>
                    </Modal>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" onPress={onClose}>
                      Close
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </div>

        <div className=" text-center mt-40">
          <Link href="createcharacter">
            <Button size="lg" radius="md" color="success" variant="solid">
              Create Character
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
