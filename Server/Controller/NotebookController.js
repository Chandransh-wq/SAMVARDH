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

export default CreateNewNotebook;
