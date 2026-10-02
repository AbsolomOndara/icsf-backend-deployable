import{prisma}from"../config/prisma.js";
export async function listBooks(req,res,next){try{res.json({books:await prisma.eBook.findMany({where:{published:true},orderBy:{createdAt:"desc"}})});}catch(e){next(e);}}
export async function createBook(req,res,next){try{const{title,author,description,category,coverUrl,fileUrl}=req.body;if(!title||!fileUrl)return res.status(400).json({message:"Book title and file URL are required."});res.status(201).json({book:await prisma.eBook.create({data:{title,author:author||null,description:description||null,category:category||null,coverUrl:coverUrl||null,fileUrl}})});}catch(e){next(e);}}
export async function deleteBook(req,res,next){try{await prisma.eBook.delete({where:{id:Number(req.params.id)}});res.status(204).end();}catch(e){next(e);}}
