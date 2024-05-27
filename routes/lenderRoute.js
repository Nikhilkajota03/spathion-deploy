import express from "express";
const router = express.Router();
import mongoose from "mongoose";
import multer from "multer";
// import Borrower from "../models/Borrower.js";
import Invoice from "../models/Invoice.js";
import Lender from "../models/Lender.js"




router.post("/lender-post", async (req, res) => {

    console.log("lender hit")

    console.log(req.body);

    try {
        const newParticipant = new Lender({
            username: req.body.username,
            fullName: req.body.fullName,
            email: req.body.email,
            nationality: req.body.nationality,
            identityProof: req.body.identityProof,
        });

        await newParticipant.save();
        res.json({ msg: "Successful" });
    } catch (err) {
        console.error(err); // Log to console for debugging
        res.status(500).json({ msg: "Failed to create lender", error: err.message });
    }
});


router.get("/profileStatus", async (req, res) => {

      console.log(req.body.email)

    try {
        const response = await Lender.find({ email: req.body.email });

        console.log(response)

        if (response.length > 0) {
            res.status(200).json(response);
        } else {
            res.status(200).json({message: "error fetching profile"});
        }
    } catch (err) {
        console.error(err); // Log to console for debugging
        res.status(500).json({ msg: "Error retrieving profile", error: err.message });
    }
});





export default router;
