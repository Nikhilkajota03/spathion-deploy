import mongoose from "mongoose";
import { config } from "dotenv";
config({ path: "./config/config.env" });



// console.log({  Mongo_uri : process.env.MONGO_URI})

export const dbConnection = () => {
  mongoose
    .connect("mongodb+srv://cyddharthphotos:qODDXhPtobyMCFsa@spathion.ciafmo4.mongodb.net/?retryWrites=true&w=majority&appName=spathion", {
      dbName: "spation-backend",
    })
    .then(() => {
      console.log("Connected to database.");
    })
    .catch((err) => {
      console.log(`Some Error occured. ${err}`);
    });
};
