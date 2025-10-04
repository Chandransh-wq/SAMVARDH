import mongoose from "mongoose";
import Notebook from "../Models/Notebook.js";

// Controller to create a new notebook with nested subjects, topics, and content
const CreateNewNotebook = async (req, res) => {
  try {
    const userId = req.user._id; // Logged-in user

    const newNotebook = new Notebook({
      ...req.body,
      userId
    });

    await newNotebook.save();

    res.status(201).json({
      message: "Notebook created successfully",
      notebook: newNotebook,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred",
      error: error.message,
    });
  }
};

export const getAllNotebook = async(req, res) => {
  try {
    const userId = req.user._id;
    const notebooks = await Notebook.find({ userId })
    res.status(200).json({ message: "Notebooks fetched : ", notebooks })
  } catch (error) {
    res.json(500).json({ message: "Error Occured : ", error: error.message })
  }
}

// Create a new subject inside a notebook
export const createNewSubject = async (req, res) => {
  try {
    const { notebookId } = req.params; // notebook ID from route
    const userId = req.user._id;       // logged-in user
    const { title, description, color, importance, tags } = req.body;

    // Ensure required fields are provided
    if (!title) {
      return res.status(400).json({ message: "Subject title is required" });
    }

    // Find the notebook
    const notebook = await Notebook.findOne({ _id: notebookId, userId });
    if (!notebook) {
      return res.status(404).json({ message: "Notebook not found" });
    }

    // New subject object
    const newSubject = {
      title,
      description,
      color,
      importance,
      tags,
      topics: []
    };

    // Push subject into notebook
    notebook.subjects.push(newSubject);
    await notebook.save();

    res.status(201).json({
      message: "Subject added successfully",
      notebook,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error occurred while creating subject",
      error: error.message,
    });
  }
};

export const createNewTopic = async (req, res) => {
  try {
    const { notebookId, subjectId } = req.params;
    const userId = req.user._id;
    const { title, color, importance, description } = req.body;

    // Validate required fields
    if (!title || !color || !description) {
      return res.status(400).json({ message: "Title, color, and description are required" });
    }

    // Find the notebook
    const notebook = await Notebook.findOne({ _id: notebookId, userId });
    if (!notebook) {
      return res.status(404).json({ message: "Notebook not found" });
    }

    // Find the subject inside the notebook's subjects array using string comparison
    const subject = notebook.subjects.find(sub => sub._id.toString() === subjectId);
    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }

    // Create the new topic
    const newTopic = subject.topics.create({
      title,
      description,
      color,
      importance,
      content: []
    });
    subject.topics.push(newTopic);

    // Save the notebook
    await notebook.save();

    res.status(201).json({
      message: "Topic created successfully",
      topic: {
        _id: newTopic._id,
        title: newTopic.title,
        description: newTopic.description,
        color: newTopic.color,
        importance: newTopic.importance,
        content: newTopic.content,
        createdAt: newTopic.createdAt,
        editedAt: newTopic.editedAt
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error occurred while creating topic",
      error: error.message
    });
  }
};

export const createNewPage = async (req, res) => {
  try {
    const { notebookId, subjectId, topicId } = req.params;
    const userId = req.user._id;
    const { page, pageContent, tags } = req.body;

    if (!page || !pageContent) {
      return res.status(400).json({ message: "Page and Page-Content are required" });
    }

    const notebook = await Notebook.findOne({ _id: notebookId, userId });
    if (!notebook) return res.status(404).json({ message: "Notebook not found" });

    const subject = notebook.subjects.find(sub => sub._id.toString() === subjectId);
    if (!subject) return res.status(404).json({ message: "Subject not found" });

    const topic = subject.topics.find(t => t._id.toString() === topicId);
    if (!topic) return res.status(404).json({ message: "Topic not found" });

    // Create new subdocument properly so Mongoose sets _id and defaults
    const newContent = topic.content.create({ 
      page, 
      pageContent, 
      tags: tags || [] 
    });
    topic.content.push(newContent);

    await notebook.save();

    // Return a consistent shape for frontend
    res.status(201).json({
      message: "Page added successfully",
      page: {
        _id: newContent._id,
        page: newContent.page,
        pageContent: newContent.pageContent,
        tags: newContent.tags,
        createdAt: newContent.createdAt,
        editedAt: newContent.editedAt
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error occurred while creating page",
      error: error.message
    });
  }
};

export const updatePage = async(req, res) => {
  try {
    const { notebookId, subjectId, topicId, pageId } = req.params;
    const userId = req.user._id;
    const { pageTitle, pageContent } = req.body;

    // Validate required fields
    if (!pageTitle || !pageContent ) {
      return res.status(400).json({ message: "Page and Page-Content are required" });
    }

    // Find the notebook
    const notebook = await Notebook.findOne({ _id: notebookId, userId });
    if (!notebook) {
      return res.status(404).json({ message: "Notebook not found" });
    }

    // Find the subject inside the notebook's subjects array using string comparison
    const subject = notebook.subjects.find(sub => sub._id.toString() === subjectId);
    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }

    //find the topic
    const topic = subject.topics.find(t => t._id.toString() === topicId)

    if(!topic) {
      return res.status(404).json({ message: "Topic not found" })
    }

    const content = topic.content.find(c => c.id === pageId)
    if(!content) {
      return res.status(404).json({ message: "Content not found" })
    }


    content.page = pageTitle
    content.pageContent = pageContent
    await notebook.save();

    res.status(200).json({ messaage: "Test successful", notebook })

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error occurred while creating page",
      error: error.message
    });
  }
}

export default CreateNewNotebook;
