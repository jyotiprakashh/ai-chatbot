import mongoose from "mongoose";
import { randomUUID as uuid } from "crypto";

const chatSchema= new mongoose.Schema({
   id: {
       type: String,
       default: uuid
   },
   role: {
       type: String,
       required: true,
   },
   content:{
       type: String,
       required: true,
   },
});


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    password: {
        type: String,
        required: true
    },
   chats: [chatSchema],
});

export default mongoose.model("User", userSchema);
