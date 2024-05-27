import mongoose from "mongoose";
import { config } from "dotenv";
config({ path: "./config/config.env" });



// console.log({  Mongo_uri : process.env.MONGO_URI})

export const dbConnection = () => {
  mongoose
    .connect("mongodb+srv://nikhilkajota9413750125:MNrlh4mJbp7kDLvl@spathion-backend.wn5hg3x.mongodb.net/", {
      dbName: "spation-backend",
    })
    .then(() => {
      console.log("Connected to database.");
    })
    .catch((err) => {
      console.log(`Some Error occured. ${err}`);
    });
};
