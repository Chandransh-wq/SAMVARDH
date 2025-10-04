// routes/example.js
import express from "express";
import { loginUser, registerUser } from "../Controller/userController.js";
import CreateNewNotebook, { createNewPage, createNewSubject, createNewTopic, getAllNotebook, updatePage } from "../Controller/NotebookController.js";
import authMiddleware from "../MiddleWare/AuthMiddleWare.js";

const router = express.Router();

// Route now calls the controller function

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/notebook/create', authMiddleware, CreateNewNotebook);
router.get('/notebook/get', authMiddleware, getAllNotebook)
router.post('/notebook/:notebookId/subject', authMiddleware, createNewSubject)
router.post('/notebook/:notebookId/subject/:subjectId/topic', authMiddleware, createNewTopic)
router.post('/notebook/:notebookId/subject/:subjectId/topic/:topicId/page', authMiddleware, createNewPage)
router.put('/notebook/:notebookId/subject/:subjectId/topic/:topicId/page/:pageId', authMiddleware, updatePage)

export default router;
