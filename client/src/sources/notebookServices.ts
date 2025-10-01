// src/sources/notebookServices.ts
import api from './api';

export interface content {
    _id: string,
    page: string,
    pageContent: string,
    createdAt: string,
    editedAt: string,
    tags: string[]
}

export interface topic {
    _id: string,
    title: string,
    color: string,
    importance: number,
    description: string,
    dueDate: string,
    content: content[]
}

export interface subject {
    _id: string,
    title: string,
    description: string,
    color: string,
    createdAt: string,
    importance: number,
    tags: string[],
    topics?: topic[]
}

export interface Notebook {
  _id: string;
  title: string;
  description: string;
  icon: string;
  createdAt: string;
  updatedAt: string;
  favourite: boolean;
  color: string;
  userId: string;
  subjects?: subject[]
}

// GET all notebooks
export const getNotebooks = async (): Promise<Notebook[]> => {
  try {
    const token = localStorage.getItem("token") || "";
    const res = await api.get("/notebook/get", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data.notebooks || [];
  } catch (error) {
    console.error("Failed to fetch notebooks:", error);
    return [];
  }
};

// CREATE a new notebook
export const createNotebook = async (
  data: Notebook
): Promise<Notebook> => {
  const res = await api.post<Notebook>("/notebook/create", data);
  return res.data;
};
