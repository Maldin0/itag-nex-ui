"use client"
import React, { useState, useEffect } from 'react';
import { RoomData } from '../../api/getRoom/route'
import {
  Card, CardHeader, CardBody, CardFooter, Divider, Link, Image, Textarea, Input, Button, Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter, useDisclosure, Accordion, AccordionItem
} from "@nextui-org/react";
import roomStyle from "./roomStyle.module.css";
import Dice from "../../../components/dice";
import Sent from "../../../components/Sent";
import Exit from "../../../components/exit";

import { CharData } from "../../api/charData/route";
import { Char } from "../../api/userData/route";
import Swal from 'sweetalert2';
import { useRouter } from "next/navigation"

type Props = {
  params: any;
}
type ChatItem = {
  name: string;
  action: string;
  time: string;
}
export default function session({ params }: Props) {

  const router = useRouter();
  const [roomAction, setRoomAction] = useState<string[]>([]);
  const [roomData, setRoomData] = useState<RoomData | null>(null);
  const [selectedChardata, setSelectedChardata] = useState<CharData | null>(null);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [chatContent, setChatContent] = useState("");



  async function getCharData(char_id: string | number) {
    

    try {
      const response = await fetch("/api/charData", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ char_id: String(char_id) })
      });

      const data = await response.json();
      setSelectedChardata(data);

    } catch (error) {
      console.error("Failed to fetch charData:", error);
    }
  }

  useEffect(() => {
    // Fetch RoomData from the API
    fetch('/api/getRoom', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ room_id: params.id })
    })
      .then(res => res.json())
      .then(data => {
        setRoomData(data);
      })
      .catch(err => {
        console.error("Failed to fetch room data:", err);
      });
  }, [params.id]);


  async function getChat() {
    fetch('/api/getAction', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ room_id: params.id })
    })
      .then(res => res.json())
      .then(data => {
        const transformedData = data.map((item: ChatItem) => `${item.name}: ${item.action} - ${item.time}`);
        setRoomAction(transformedData);
        console.log(data);
      })
      .catch(err => {
        console.error("Failed to fetch room data:", err);
      });

  }

  useEffect(() => {
    getChat();
    if (roomAction) {
      const formattedChat = roomAction.join('\n');
      setChatContent(formattedChat);
    }
    
  }, [])

  useEffect(() => {
    console.log(chatContent)

  }, [chatContent])

  useEffect(() => {
    console.log(roomAction)

  }, [roomAction])
  

  async function exitRoom() {
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure ?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        router.push('/')
      }
    })
  }

  
  const clearChat = () => {
    setChatContent("");
  };

  const [inputText, setInputText] = useState("");


  return (
    <>
      <div className=" flex flex-row gap-10 justify-center ">
        {roomData?.users.map((user, index) => (
          <>
            <Card className='w-[300px] h-auto justify-between' shadow="sm" key={index} isPressable onPress={() => {
              onOpen;
              console.log("char pressed");
              setSelectedUser(user);
              getCharData(user.char_id);
            }} >
              <CardBody onClick={onOpen} className="overflow-visible p-0">
                <Image
                  shadow="sm"
                  radius="lg"
                  width="100%"
                  alt={user.name}
                  className="w-full object-cover h-full"
                  src={user.image}
                />
              </CardBody>
              <CardFooter className="text-small justify-between">
                <b>{user.name}</b>
                <p className="text-default-500">{user.role === 'd' ? 'DM' : user.role === 'p' ? 'Player' : user.role}</p> {/* Displaying the role here, change as needed */}
              </CardFooter>
            </Card>
            <Modal
              size="5xl"
              backdrop="blur"
              scrollBehavior='inside'
              isOpen={isOpen}
              onOpenChange={onOpenChange}
              onClose={() => {

                setSelectedChardata(null);
                getCharData(user.char_id);
              }}
              className="font"
              style={{ color: "white", fontSize: "20px" }}
            >
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-col gap-1">
                      <h1 style={{ fontSize: "30px" }}>{selectedUser?.name}</h1>
                    </ModalHeader>
                    <ModalBody>
                      <div className=" p-5">
                        <p>
                          <strong>Class: {selectedChardata?.class.name}</strong>
                        </p>
                        <br />
                        <p>
                          <strong>Race: {selectedChardata?.race.name}</strong>
                        </p>
                        <br />

                        <Accordion isCompact variant="shadow">
                          <AccordionItem key="1" aria-label="Status" title="STATUS">
                            <div className="pl-10">
                              cha: {selectedChardata?.status.cha}
                              <br />
                              con: {selectedChardata?.status.con}
                              <br />
                              dex: {selectedChardata?.status.dex}
                              <br />
                              wis: {selectedChardata?.status.wis}
                              <br />
                              int: {selectedChardata?.status.int}
                              <br />
                              str: {selectedChardata?.status.str}
                              <br />
                              cha: {selectedChardata?.status.cha}
                              <br />
                              hp: {selectedChardata?.status.hp}
                              <br />
                              gold: {selectedChardata?.status.gold}

                            </div>
                          </AccordionItem>
                        </Accordion>
                        <div className="pt-5">
                          <Accordion isCompact variant="shadow">
                            <AccordionItem key="2" aria-label="skills" title="SKILLS">
                              <div className="pl-10">
                                {selectedChardata?.skills.map((skill, index) => (
                                  <div key={index}>
                                    <strong>{skill.name}:</strong> {skill.details}
                                    <br />
                                  </div>
                                ))}
                              </div>
                            </AccordionItem>
                          </Accordion>
                        </div>
                        <div className="pt-5">
                          <Accordion isCompact variant="shadow">
                            <AccordionItem key="3" aria-label="features" title="FEATURES">
                              {selectedChardata?.class.features.map((feature, index) => (
                                <div className="pt-5" key={index}>
                                  <Accordion isCompact variant="shadow">
                                    <AccordionItem key="4" aria-label="features" title={feature.name}>
                                      <p className="pl-10">{feature.details}</p>
                                    </AccordionItem>
                                  </Accordion>
                                  <br />
                                </div>
                              ))}

                            </AccordionItem>
                          </Accordion>
                        </div>
                        <div className="pt-5">
                          <Accordion isCompact variant="shadow">
                            <AccordionItem key="5" aria-label="spells" title="SPELLS">
                              {selectedChardata?.class.spell.map((spell, index) => (
                                <div className="pt-5" key={index}>
                                  <Accordion isCompact variant="shadow">
                                    <AccordionItem key="5" aria-label="spells" title={spell.name}>
                                      <p className="pl-10">
                                        Interval: {spell.interval_time}
                                        <br />
                                        Duration: {spell.duration}
                                        <br />
                                        Range: {spell.range}
                                        <br />
                                        Details: {spell.details}
                                        <br />
                                        <br />
                                      </p>
                                    </AccordionItem>
                                  </Accordion>
                                </div>
                              ))}

                            </AccordionItem>
                          </Accordion>
                        </div>
                        <p>

                        </p>
                        <div className="pt-5">
                          <strong>Backstory: <br />
                            <p className="pt-2 pl-24">
                              {selectedChardata?.background}
                            </p>
                          </strong>
                        </div>
                      </div>
                      <br />

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
          </>
        ))}
      </div>
      <br /><br /><br /><br />

      <div className={roomStyle.box} style={{
        width: "100%",
        minHeight: "470px",
        textAlign: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column',
      }}>
        <br />
        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
          <Button style={{ alignSelf: 'flex-start' }} color='danger' size='md' onPress={() => {
            exitRoom();
          }}>
            <Exit />
          </Button>

          <Button style={{ alignSelf: 'flex-end' }} color='danger' variant='faded' size='md' onPress={() => {
            clearChat();
          }}>
            Clear chat
          </Button>
        </div>
        <br />
        <div>

        </div>
        <Textarea
          label={`Room ${params.id}`}
          placeholder="Chat World"
          size='lg'
          maxRows={7}
          readOnly
          value={chatContent} // Bind the value of the Textarea to chatContent
          onChange={e => setChatContent(e.target.value)}

        />
        <div className='flex flex-row gap-5 items-center'>
          <Input
            label="Type somthing..."
            placeholder="Chat"
            size='lg'
            className='w-96'
            value={inputText}
            onChange={e => setInputText(e.target.value)}
          />
          <div>
            <Button size="md" color='warning' variant='shadow' onPress={() => {
              setChatContent(prevChatContent => `${prevChatContent}\n${inputText}`);
              setInputText("");
            }}><Sent /></Button>
          </div>
          <div>
            <Button size="md" color='default'><Dice /></Button>
          </div>
        </div>

      </div>
      <div className=' text-center'>ดีคับ</div>
    </>
  );
}