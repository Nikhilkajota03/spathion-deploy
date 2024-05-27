import mongoose from "mongoose";

const invoiceSchema = {
  username: String,
  companyName: String,
  walletAdd:String,
  companyEmail: String,
  companyContactNumber: String,
  companyWebsite: String,
  companyAddress: String,
  supplierInvoice: String,
  invoiceDate: String,
  invoiceDue: String,
  invoiceAmount: String,
  advanceAmount: String,
  loanRequired: String,
  invoiceVerified: Boolean,
  invoiceRejected: Boolean,

  arpaVerified: Boolean,
  arpaRejected: Boolean,
  loanApplied: Boolean,
  files: Array,
};

const Invoice = mongoose.model("Invoice", invoiceSchema, "invoices");
export default Invoice;
