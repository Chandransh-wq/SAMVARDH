import Notebook from "../Models/Notebook.js";

// Controller to create a new notebook with nested subjects, topics, and content
const CreateNewNotebook = async (req, res) => {
  try {
    const userId = req.user._id; // Logged-in user

    // Expecting the request body to look something like this:
    // {
    //   title: "My Notebook",
    //   description: "Notes for Math",
    //   color: "blue",
    //   subjects: [
    //     {
    //       title: "Algebra",
    //       description: "Algebra topics",
    //       color: "red",
    //       topics: [
    //         {
    //           title: "Linear Equations",
    //           description: "Solving linear equations",
    //           color: "yellow",
    //           content: [
    //             { page: "Page 1", pageContent: "Notes here" }
    //           ]
    //         }
    //       ]
    //     }
    //   ]
    // }

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

export default CreateNewNotebook;
