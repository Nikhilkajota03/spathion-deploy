import express from "express";
import mongoose from "mongoose";
import multer from "multer";
// import Borrower from "../models/Borrower.js";
import Invoice from "../models/Invoice.js";
import Borrower from "../models/Borrower.js";

const router = express.Router();

//-----------------------PROFILE--------------------------------------------------------------

router.post("/profile", async (req, res) => {
  const {
    walletAddress,
    username,
    fullName,
    email,
    nationality,
    designation,
    contactNumber,
    companyName,
    companyEmail,
    companyContactNumber,
    companyWebsite,
    companyAddress,
  } = req.body;

  console.log(req.body);

  try {
    const newBorrower = new Borrower(req.body);
    const savedBorrower = await newBorrower.save();

    res.status(200).json({ message: "newBorrower saved successfully" });
  } catch (error) {
    console.error("Error saving newBorrower:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//--------------------------------INVOICES-----------------------------------------------------

router.post("/invoice", async (req, res) => {
  const {
    username,
    walletAdd,
    companyName,
    companyEmail,
    companyContactNumber,
    companyWebsite,
    companyAddress,
    supplierInvoice,
    invoiceDate,
    invoiceDue,
    invoiceAmount,
    advanceAmount,
    loanRequired,
  } = req.body;

  console.log(req.body);

  console.log(
    username,
    walletAdd,
    companyName,
    companyEmail,
    companyContactNumber,
    companyWebsite,
    companyAddress,
    supplierInvoice,
    invoiceDate,
    invoiceDue,
    invoiceAmount,
    advanceAmount,
    loanRequired
  );

  try {
    const newInvoice = new Invoice({
      username,
      walletAdd,
      companyName,
      companyEmail,
      companyContactNumber,
      companyWebsite,
      companyAddress,
      supplierInvoice,
      invoiceDate,
      invoiceDue,
      invoiceAmount,
      advanceAmount,
      loanRequired,
      invoiceVerified: false,
      invoiceRejected: false,
      arpaVerified: false,
      arpaRejected: false,
      loanApplied: false,
      files: req.files, // Attach the uploaded files
    });

    await newInvoice.save();

    res.status(200).json({ message: "Invoice saved successfully" });
  } catch (error) {
    console.error("Error saving invoice:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/all-invoices", async (req, res) => {
  try {
    const invoices = await Invoice.find();
    res.status(200).json(invoices);
  } catch (error) {
    console.error("Error fetching all invoices:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/user-invoices", async (req, res) => {
  let username = req.query.user;
  try {
    const invoices = await Invoice.find({ username: username });
    if (invoices.length === 0) {
      res.status(404).json({ message: "No invoices found for this username" });
    } else {
      res.status(200).json(invoices);
    }
  } catch (error) {
    console.error("Error fetching invoices by username:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//---------------------------LOAN--------------------------------------------------------------

router.post("/loan", async (req, res) => {
  try {
    const { id: invoiceId } = req.body;

    // Check if the invoiceId is valid
    if (!mongoose.Types.ObjectId.isValid(invoiceId)) {
      return res.status(400).json({ message: "Invalid invoice ID" });
    }

    // Find the document by ID and update loanApplied field
    const updatedDocument = await Invoice.findByIdAndUpdate(
      invoiceId,
      { loanApplied: true },
      { new: true }
    );

    // Check if document is found and updated successfully
    if (!updatedDocument) {
      return res.status(404).json({ message: "Document not found" });
    }

    res
      .status(200)
      .json({
        message: "Loan application submitted successfully",
        updatedDocument,
      });
  } catch (error) {
    console.error("Error applying for loan:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});




router.get("/get-loan", async (req, res) => {
  let user = req.query.user;

  console.log(user);

  try {
    const getloans = await Invoice.find({ username: user, loanApplied: true });

    res.status(200).json(getloans);
  } catch (error) {
    res.status(500).json({ message: "server-error" });
  }
});


//-------------fetch all loans ------------------------





router.get("/get-all-loans", async (req, res) => {
  


  try {
    const getloans = await Invoice.find({ loanApplied: true });

    res.status(200).json(getloans);
  } catch (error) {
    res.status(500).json({ message: "server-error" });
  }
});


//---------------verify or Reject loan------------------------

router.post("/verify-loan", async (req, res) => {

  console.log("verify hit")

  try {
      let invoiceId = req.body.invoiceId;
      let docType = req.body.docType;
      let status = req.body.status;
      console.log(invoiceId,docType,status);

      // if (!invoiceId || !docType || !status) {
      //     return res.status(400).json({ msg: "Invalid request. Missing required fields." });
      // }

      let updateFields = {};

      if (docType === "invoiceVerified") {
          updateFields = {
              invoiceVerified: status,
              invoiceRejected: !status,
              arpaRejected: status ? false : true,
              arpaVerified: status ? status : !status,
          };
      } else {
          updateFields = {
              arpaVerified: status,
              arpaRejected: !status,
          };
      }

      console.log(invoiceId,updateFields)

      const result = await Invoice.updateOne({ _id: invoiceId }, { $set: updateFields });

      console.log(result)

      if (result.modifiedCount === 1) {
          res.json({ msg: "Successful" });
      } else {
          res.status(404).json({ msg: "Invoice not found or no modifications made." });
      }
  } catch (err) {
      console.error(err); // Log to console for debugging
      res.status(500).json({ msg: "Failed to update invoice", error: err.message });
  }
});


//-------------approved invoices-------------------------

router.get("/get-verified-loans", async (req, res) => {
  


  try {
    const getloans = await Invoice.find({ invoiceVerified: true });

    res.status(200).json(getloans);
  } catch (error) {
    res.status(500).json({ message: "server-error" });
  }
});


export default router;
