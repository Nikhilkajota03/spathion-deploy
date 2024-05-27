import express from "express";
import { dbConnection } from "./database/dbConnection.js";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser"
import mongoose from "mongoose";

import borrowerRoute from "./routes/borrowerRoute.js"
import lenderRoute from "./routes/lenderRoute.js"
import validatorRoute from "./routes/validatorRoute.js";
import Invoice from "./models/Invoice.js";
const app = express();



var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
  methods: ["GET", "POST"],

  allowedHeaders: ["Content-Type"],
};



app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());


mongoose
.connect("mongodb://localhost:27017", {
  dbName: "spation-backend",
})
.then(() => {
  console.log("Connected to database.");
})
.catch((err) => {
  console.log(`Some Error occured. ${err}`);
});





app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);

  next();
});



// app.post("/api/borrower/invoice", async (req, res) => {

//    console.log("invoice hit")
//   console.log(req.body);  // Should now correctly log JSON data

//   try {
//     const newInvoice = new Invoice(req.body);
//     await newInvoice.save();
//     res.status(200).json({ message: "Invoice saved successfully" });
//   } catch (error) {
//     console.error("Error saving invoice:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });




app.use("/api/borrower",borrowerRoute)
app.use("/api/validator", validatorRoute);
app.use("/api/lender",lenderRoute)






app.listen(3001, () => {
  console.log(`Server running at port 3001`);
});


export default app;
