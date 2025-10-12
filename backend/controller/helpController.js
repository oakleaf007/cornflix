import QA from "../models/qs.js";

// posting question by user
export const postQS = async (req,res)=>{

    try{
        const {question} = req.body;
        if(!question || question.trim() === ""){
            return res.status(400).json({message :"Question is required"});
        }

        const newQA = new QA({question});
        await newQA.save();

        res.status(201).json({message:"Question posted", qa:newQA});
    }
    catch(err){
        res.status(400).json({error: err.message});
    }
};

// posting or updating answer by admin

export const postANS = async (req, res)=>{

    try{
        const {id} = req.params;
        const {answer} = req.body;
        const updatedQA = await QA.findByIdAndUpdate(
            id,
            {answer,updatedAt: Date.now()},
            {new:true}
        );

        if(!updatedQA) return res.status(404).json({error: "Question not found"});
        res.json({message:"Answer saved", qa:updatedQA});

    }catch(err){
        res.status(400).json({error: err.message});
    }
};


// Delete Question and Answers by admin

export const deleteQA = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await QA.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: "Question not found" });

    res.json({ message: "Question deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


// load all QNA
export const getAllQA= async(req, res)=>{
    try{
        const list = await QA.find().sort({createdAt:-1});
        res.json(list);
    }
    catch(err){
        res.status(500).json({error:err.message});
    }
};