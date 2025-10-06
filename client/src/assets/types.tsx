// Single page/content within a topic
export interface Content {
  _id: string;
  page: string;
  pageContent?: string;
  createdAt?: string;
  editedAt?: string;
  tags?: string[];
}

// Topic inside a subject
export interface Topic {
  _id: string;
  title: string;
  color: string;
  importance?: number;
  description: string;
  dueDate: string;
  content?: Content[];
  subjectId?: string;
  subjectTitle?: string;
  notebookId?: string;
  notebookTitle?: string;
}

export interface Topics {
  title: string;
  color: string;
  importance?: number;
  description: string;
  dueDate?: string;
  content?: Content[];
  subjectId?: string;
  subjectTitle?: string;
  notebookId?: string;
  notebookTitle?: string;
}

// Subject inside a notebook
export interface Subject {
  _id: string;
  title: string;
  description: string;
  color: string;
  createdAt?: string;
  importance?: number;
  tags?: string[];
  topics?: Topic[];
}

export interface Subjects {
  _id: string;
  title: string;
  description: string;
  color: string;
  createdAt?: string;
  importance?: number;
  tags?: string[];
  topics?: Topic[];
}

// Notebook
export interface Notebook {
  _id?: string; // optional, will be _id in Mongo
  title: string;
  icon?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
  favorite?: boolean;
  color?: string;
  userId: string; // ObjectId string
  subjects?: Subject[];
}

export interface Notebooks {
  title: string;
  icon?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
  favorite?: boolean;
  color?: string;
  userId: string; // ObjectId string
  subjects?: Subject[];
}
