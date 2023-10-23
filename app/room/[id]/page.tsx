"use client"
import React, { useState, useEffect, use } from 'react';
import { RoomData } from '../../api/getRoom/route'
import {
  Card, CardBody, CardFooter, Divider, Link, Image, Textarea, Input, Button, Modal,
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
import { useSession } from 'next-auth/react';

type Props = {
  params: any;
}
type ChatItem = {
  name: string;
  action: string;
  time: string;
}
export default function Room({ params }: Props) {
  
  const router = useRouter();
  const { data :session } = useSession();
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [roomAction, setRoomAction] = useState<string[]>([]);
  const [roomData, setRoomData] = useState<RoomData | null>(null);
  const [selectedChardata, setSelectedChardata] = useState<CharData | null>(null);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [inputText, setInputText] = useState("");
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

  async function getRoomData() {
    await fetch('/api/getRoom', {
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
  }

  useEffect(() => {
    getRoomData();
  }, [params.id]);


  async function getChat() {
    try {
      const response = await fetch('/api/getAction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ room_id: params.id })
      })
      const data = await response.json();
      const transformedData = data.map((item: ChatItem) => `${item.name}: ${item.action} - ${item.time}`);
      setRoomAction(transformedData);
    } catch (error) {
      console.error("Failed to fetch room data:", error);
    }
  }

  async function handleSent(text: string) {
    try {
      const response = await fetch('/api/sentAction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          room_id: params.id, 
          email: session?.user?.email,
          action: text })
      })
    } catch (error) {
      console.error("Failed to fetch room data:", error);
    }
  }

  useEffect(() => {
    getChat();
    getRoomData();
    setLastUpdate(Date.now());

  }, [])

  useEffect(() => {
    let pollingTimer: NodeJS.Timeout;

    const pollChat = () => {
      getChat();
      getRoomData();

      // Check time since last activity
      const timeSinceLastActivity = Date.now() - lastUpdate;

      let pollingFrequency;
      if (timeSinceLastActivity < 5 * 60 * 1000) { // Less than 5 minutes
        pollingFrequency = 1000; // Poll every second
      } else if (timeSinceLastActivity < 10 * 60 * 1000) { // Less than 10 minutes
        pollingFrequency = 5000; // Poll every 5 seconds
      } else {
        pollingFrequency = 30000; // Poll every 30 seconds
      }

      pollingTimer = setTimeout(pollChat, pollingFrequency);
    };

    pollChat();

    // Cleanup the polling on unmount
    return () => clearTimeout(pollingTimer);
  }, [lastUpdate]);



  useEffect(() => {
    console.log(chatContent)

  }, [chatContent])

  useEffect(() => {
    console.log(roomAction)
    const formattedChat = roomAction.join('\n');
    setChatContent(formattedChat);
  }, [roomAction])
  

  async function exitRoom() {
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure ?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: `No`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await fetch('/api/roomAction', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ room_id: params.id, email: session?.user?.email, role:'l', status: 'leave' })
        })
        router.push('/')
      }
    })
  }

  
  const clearChat = async () => {
    setChatContent("");
    const response = await fetch('/api/clearAction', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ room_id: params.id })
    })
    if (response.status === 200) {
      Swal.fire({
        icon: 'success',
        title: 'Clear chat success',
        showConfirmButton: false,
        timer: 1500
      })
    }
  };



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
            <Button size="md" color='warning' variant='shadow' onPress={async () => {
              
              await handleSent(inputText)
              setInputText("")
            }}
            ><Sent /></Button>
          </div>
          <div>
            <Button size="md" color='default' onPress={async () => {
              const rand = Math.floor(Math.random() * 20) + 1
              await handleSent(`Rolled NAT: ${rand}`)
            }}><Dice /></Button>
          </div>
        </div>
      </div>
      <div className=' text-center'>ดีคับ</div>
    </>
  );
}