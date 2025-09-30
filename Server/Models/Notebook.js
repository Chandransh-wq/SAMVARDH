import mongoose from "mongoose";
import notebookSchema from "../Schema/notebookSchema.js";

const Notebook = mongoose.model('Notebook', notebookSchema)

export default Notebook