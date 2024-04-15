import app from "./app";
import { connectToDB } from "./db/connection";

const PORT = process.env.PORT || 5000;

connectToDB().then(() => {
  app.listen(PORT,()=>console.log("Server started on port 5000 and connected to DB"));
})
  .catch((err) => console.log(err));