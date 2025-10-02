import mongoose from "mongoose";

const contentSchema = new mongoose.Schema({
    page: {
        type: String,
        required: true,
    },
    pageContent: {
        type: String,
        default: "",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    editedAt: {
        type: Date,
        default: Date.now,
    },
    tags: {
        type: [String],
        default: [],
    }
})

const TopicSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    importance: {
        type: Number,
        default: 1
    },
    description: {
        type: String,
        required: true
    },
    dueDate: {
        type: Date,
        default: Date.now,
    },
    content: {
        type: [contentSchema],
        default: [],
    }
})

const subjectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    importance: {
        type: Number,
        default: 1
    },
    tags: {
        type: [String],
        default: [],
    },
    topics: {
        type: [TopicSchema],
        default: [],
    }
})

const notebookSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    icon: { 
        type: String 
    },
    description: { 
        type: String 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    updatedAt: { 
        type: Date, 
        default: Date.now 
    },
    favorite: { 
        type: Boolean,
        default: false 
    },
    color: { 
        type: String 
    },
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "user", 
        required: true 
    }, // add this
    subjects: { 
        type: [subjectSchema], 
        default: [] 
    },
});


export default notebookSchema