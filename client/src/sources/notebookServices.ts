// src/sources/notebookServices.ts
import type { Subject, Topic } from '../assets/types';
import api from './api';

// ------------------ Payload Types ------------------

// Payload for creating a page
export interface CreatePagePayload {
  page: string;
  pageContent: string;
  tags?: string[];
}

// Page / Content returned from backend
export interface Content {
  _id: string;
  page: string;
  pageContent: string;
  createdAt: string;
  editedAt: string;
  tags: string[];
}

// Payload for creating a topic (no _id required)
export interface NewTopicPayload {
  title: string;
  description: string;
  importance: number;
  color: string;
  content?: Content[];
}

// Payload for creating a subject (no _id required)
export interface NewSubjectPayload {
  title: string;
  description: string;
  color: string;
  createdAt?: string;
  importance?: number;
  tags?: string[];
  topics?: Topic[];
}

// Notebook type
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
  subjects?: Subject[];
}

// ---------------- GET ----------------
export const getNotebooks = async (): Promise<Notebook[]> => {
  try {
    const token = localStorage.getItem("token") || "";
    const res = await api.get("/notebook/get", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data.notebooks || [];
  } catch (error) {
    console.error("Failed to fetch notebooks:", error);
    return [];
  }
};

// ---------------- CREATE ----------------
export const createNotebook = async (data: Omit<Notebook, "_id">): Promise<Notebook> => {
  const token = localStorage.getItem("token") || "";
  const res = await api.post<Notebook>("/notebook/create", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const createSubject = async (
  data: NewSubjectPayload,
  notebookId: string
): Promise<Subject> => {
  const token = localStorage.getItem("token") || "";
  const res = await api.post<Subject>(`/notebook/${notebookId}/subject`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const createTopic = async (
  data: NewTopicPayload,
  notebookId: string,
  subjectId: string
): Promise<Topic> => {
  if (!notebookId || !subjectId ) {
    throw new Error("Missing notebookId, or subjectId");
  }

  const token = localStorage.getItem("token") || "";
   
  const res = await api.post<Topic>(
    `/notebook/${notebookId}/subject/${subjectId}/topic`,
    data,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};

export const createPage = async (
  data: CreatePagePayload,
  notebookId: string,
  subjectId: string,
  topicId: string
): Promise<Content> => {
  if (!notebookId || !subjectId || !topicId) {
    throw new Error("Missing notebookId, subjectId, or topicId");
  }

  const token = localStorage.getItem("token") || "";

  const res = await api.post<{ message: string; page: Content }>(
    `/notebook/${notebookId}/subject/${subjectId}/topic/${topicId}/page`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  return res.data.page;
};
