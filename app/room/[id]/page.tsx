"use client"
import React, { useState, useEffect } from 'react';
import { RoomData } from '../../api/getRoom/route'
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image, Textarea,Input} from "@nextui-org/react";
import roomStyle from "./roomStyle.module.css";


type Props = {
  params: any;
}

export default function session({ params }: Props) {

  const [roomData, setRoomData] = useState<RoomData | null>(null);

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

  return (
    <>
      <div>Session ID: {params.id}</div>
      <div className=" flex flex-row gap-10 justify-center">
        {roomData?.users.map((user, index) => (
          <Card className='w-[300px] h-auto justify-between' shadow="sm" key={index} isPressable onPress={() => console.log("char pressed")}>
            <CardBody className="overflow-visible p-0">
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
              <p className="text-default-500">{user.role}</p> {/* Displaying the role here, change as needed */}
            </CardFooter>
          </Card>
        ))}
      </div>
      <br /><br /><br /><br />

      <div className={roomStyle.box} style={{
        width: "100%",
        minHeight: "600px",
        textAlign: 'center', alignItems: 'center',display:'flex',flexDirection:'column'
      }}>
        
        <Textarea
          placeholder="Chat World"
          size='lg'
          maxRows={7}
          defaultValue=""
        />
        
        <Input
            label="PRESS ENTER"
            labelPlacement="outside"
            placeholder="Chat"
            size='lg'
            maxRows={7}
            className='w-96'
          />
        
      </div>

    </>
  );
}