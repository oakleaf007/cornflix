

import express from "express";
import {addContact, getContact} from "../controller/contactControll.js";

const router = express.Router();


router.post("/", addContact);

router.get("/", getContact);

export default router;