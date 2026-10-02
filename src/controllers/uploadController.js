import{uploadBuffer}from"../services/fileStorage.js";
export async function uploadMaterial(req,res,next){try{if(!req.file)return res.status(400).json({message:"Choose a PDF, Word, PowerPoint or text file."});const file=await uploadBuffer(req.file);res.status(201).json({file});}catch(error){next(error);}}
