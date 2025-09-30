// routes/example.js
import express from "express";
import { sayBye, sayHello } from "../Controller/CreationPaths.js";
import { loginUser, registerUser } from "../Controller/userController.js";
import CreateNewNotebook, { getAllNotebook } from "../Controller/NotebookController.js";
import authMiddleware from "../MiddleWare/AuthMiddleWare.js";

const router = express.Router();

// Route now calls the controller function
router.get("/hello", sayHello);
router.get('/bye', sayBye);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/notebook/create', authMiddleware, CreateNewNotebook);
router.get('/notebook/get', authMiddleware, getAllNotebook)

export default router;
