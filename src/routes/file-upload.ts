import express from "express";
import { handleSingleUploadFile } from "../services/uploadSingle";

type UploadedFile = {
  fieldname: string; // file
  originalname: string; // myPicture.png
  encoding: string; // 7bit
  mimetype: string; // image/png
  destination: string; // ./public/uploads
  filename: string; // 1571575008566-myPicture.png
  path: string; // public/uploads/1571575008566-myPicture.png
  size: number; // 1255
};

const router = express.Router();

router.post("/", uploadFiles);

async function uploadFiles(req: any, res: any) {
  try {
    const uploadResult = await handleSingleUploadFile(req, res);
    const uploadedFile: UploadedFile = uploadResult.file;
    res.json({ message: "Successfully Uploaded Files", filename: uploadedFile.filename });
  } catch (e: any) {
    return res.status(422).json({ errors: [e.message] });
  }
};

export default router;