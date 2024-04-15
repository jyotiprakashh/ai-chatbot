import React, { useState } from "react";
import { Avatar, Box, Typography, Button, IconButton } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import red from "@mui/material/colors/red";
import ChatItem from "../components/chat/ChatItem";
import { IoMdSend } from "react-icons/io";
import { sendChatRequest } from "../helpers/api-communicator";

// const chatMessages = [
//   {
//     role: "user",
//     content: "Hi there! Can you help me with some information about dinosaurs?",
//   },
//   {
//     role: "assistant",
//     content:
//       "Of course! I'd be happy to help. What specific information are you looking for?",
//   },
//   {
//     role: "user",
//     content:
//       "I'm curious about the velociraptor. Can you tell me more about it?",
//   },
//   {
//     role: "assistant",
//     content:
//       "Absolutely. Velociraptors were small, feathered dinosaurs that lived during the Cretaceous period. They were known for their agility and intelligence.",
//   },
//   {
//     role: "user",
//     content: "Interesting! Did they hunt in packs?",
//   },
//   {
//     role: "assistant",
//     content:
//       "Yes, they likely did. Fossil evidence suggests that velociraptors were social animals and may have hunted in packs to take down larger prey.",
//   },
//   {
//     role: "user",
//     content: "Fascinating. Thanks for the information!",
//   },
//   {
//     role: "assistant",
//     content:
//       "You're welcome! If you have any more questions, feel free to ask.",
//   },
// ];

type Message= {
  role: "user" | "assistant";
  content: string;
}
const Chat = () => {
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const auth = useAuth();
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const handleSubmit = async()=>{
    // console.log(inputRef.current?.value)
    const content= inputRef.current?.value as string;
    if(inputRef && inputRef.current){
      inputRef.current.value = "";
    }
    const newMessage:Message= {role:"user", content};
    setChatMessages((prev)=>[...prev, newMessage]);
    const chatData= await sendChatRequest(content);
    setChatMessages([...chatData.chats]);
  }
  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        width: "100%",
        height: "100%",
        mt: 3,
        gap: 3,
      }}
    >
      <Box
        sx={{
          display: { md: "flex", sm: "none", xs: "none" },
          flex: "0.2",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: "60vh",
            bgcolor: "rgb(17, 29, 39)",
            borderRadius: 5,
            flexDirection: "column",
            mx: 3,
          }}
        >
          <Avatar
            sx={{
              mx: "auto",
              my: 2,
              bgcolor: "white",
              color: "black",
              fontWeight: "700",
            }}
          >
            {auth.user?.name[0]} {auth.user?.name.split(" ")[1]}
          </Avatar>
          <Typography
            sx={{ mx: "auto", fontFamily: "work sans", color: "white" }}
          >
            You are talking to a chatbot.
          </Typography>
          <Typography
            sx={{
              mx: "auto",
              fontFamily: "work sans",
              my: 2,
              p: 3,
              color: "white",
              fontWeight: "700",
            }}
          >
            You can ask some questions regarding anything.
          </Typography>
          <Button
            sx={{
              width: "200px",
              my: "auto",
              mx: "auto",
              color: "white",
              fontWeight: "700",
              borderRadius: 3,
              bgcolor: red[300],
              ":hover": { bgcolor: red.A400 },
            }}
          >
            Clear Chat
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flex: { md: 0.8, xs: 1, sm: 1 },
          flexDirection: "column",
          px: 3,
        }}
      >
        <Typography
          sx={{
            fontSize: "40px",
            color: "white",
            mb: 2,
            mx: "auto",
            fontWeight: "600",
          }}
        >
          Model - GPT 3.5 Turbo
        </Typography>
        <Box
          sx={{
            width: "100%",
            height: "60vh",
            borderRadius: 3,
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            overflow: "scroll",
            overflowX: "hidden",
            scrollBehavior: "smooth",
            overflowY: "auto",
          }}
        >
          {chatMessages.map((chat, index) => (
            <div>
              <ChatItem content={chat.content} role={chat.role} key={index} />
            </div>
          ))}
        </Box>
        <div style={{ width: "100%", padding: "15px", paddingRight: "-20px", borderRadius:8, backgroundColor: "rgb(12,27, 39)", display: "flex", marginRight: "auto" }}>
          <input
            ref={inputRef}
            type="text"
            style={{
              width: "100%",
              backgroundColor: "transparent",
              padding: "10px",
              border: "none",
              outline: "none",
              color: "white",
              fontSize: "20px",
            }}
          ></input>
          <IconButton onClick={handleSubmit} sx={{ color: "white", ml: "auto" }}>
            <IoMdSend/>
          </IconButton>
        </div>
      </Box>
    </Box>
  );
};

export default Chat;
