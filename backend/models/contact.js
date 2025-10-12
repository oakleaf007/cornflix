import mongoose from "mongoose";



const contactSchema = new mongoose.Schema({
    phone: { type: String, required: true },
    email: { type: String, required: true },
    address1: { type: String, required: true },
    address2: { type: String, required: true }
});

const Contact =  mongoose.model("Contact",contactSchema);
export default Contact;
