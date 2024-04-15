import { Router } from "express";
import { verifyToken } from "../utils/token-manager";
import  {generateChatCompletion}  from "../controllers/chats-controllers";
import { validate, chatCompletionValidator } from "../utils/validators";

const chatRoutes= Router();
chatRoutes.post("/new", validate(chatCompletionValidator), verifyToken, generateChatCompletion);

export default chatRoutes