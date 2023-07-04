import express, { Router } from "express";
import { getProfile, editProfile } from '../controllers/accountController'
import { verifyToken } from "../middlewares/authMiddleware";

export const accountRouter:Router = express.Router()

//common
accountRouter.get("/profile", verifyToken, getProfile)
accountRouter.put("/profile", verifyToken, editProfile)