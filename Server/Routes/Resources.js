// routes/example.js
import express from "express";
import { loginUser, registerUser } from "../Controller/userController.js";
import CreateNewNotebook, { createNewPage, createNewSubject, createNewTopic, DELETE, getAllNotebook, updatePage } from "../Controller/NotebookController.js";
import authMiddleware from "../MiddleWare/AuthMiddleWare.js";
import { summarizeText, wiki } from "../Controller/APIcontroller.js";

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
// DELETE notebook
router.delete('/notebook/:notebookId', authMiddleware, DELETE);

// DELETE subject
router.delete('/notebook/:notebookId/:subjectId', authMiddleware, DELETE);

// DELETE topic
router.delete('/notebook/:notebookId/:subjectId/:topicId', authMiddleware, DELETE);

// DELETE page/content
router.delete('/notebook/:notebookId/:subjectId/:topicId/:contentId', authMiddleware, DELETE);

// Search Wiki
router.get('/search/wiki/:title', authMiddleware, wiki);

//Summarize text
router.post('/summarize', summarizeText)


export default router;
