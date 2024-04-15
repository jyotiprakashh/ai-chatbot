import {connect, disconnect} from "mongoose";

async function connectToDB() {
    try{
        await connect(process.env.MONGODB_URL);
        console.log("Connected to MongoDB");
    }
    catch(err) {
        console.log(err);
        throw new Error("error connecting to MongoDB");
    }
}

async function disconnectFromDB() {
    try{
        await disconnect();
        console.log("Disconnected from MongoDB");
    }
    catch(err) {
        console.log(err);
        throw new Error("error disconnecting from MongoDB");
    }
}

export {connectToDB, disconnectFromDB};