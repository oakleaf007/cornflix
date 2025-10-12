import express from "express";
import { postQS, getAllQA, postANS,deleteQA} from "../controller/helpController.js";


const router = express.Router();


router.post("/",postQS);
router.post("/:id/answer",postANS);
router.delete("/:id", deleteQA);

router.get("/",getAllQA);


export default router;