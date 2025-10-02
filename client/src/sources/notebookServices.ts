// src/sources/notebookServices.ts
import type { Subject, Topic } from '../assets/types';
import api from './api';

// Minimal payloads for creation
export interface CreatePagePayload {
  page: string;
  pageContent: string;
  tags?: string[];
}

export interface Content {
  _id: string;
  page: string;
  pageContent: string;
  createdAt: string;
  editedAt: string;
  tags: string[];
}

export interface TopicType {
  _id: string;
  title: string;
  color: string;
  importance: number;
  description: string;
  dueDate: string;
  content: Content[];
}

export interface SubjectType {
  _id: string;
  title: string;
  description: string;
  color: string;
  createdAt: string;
  importance: number;
  tags: string[];
  topics?: TopicType[];
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
  subjects?: SubjectType[];
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
export const createNotebook = async (data: Notebook): Promise<Notebook> => {
  const token = localStorage.getItem("token") || "";
  const res = await api.post<Notebook>("/notebook/create", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const createSubject = async (
  data: Subject,
  notebookId: string
): Promise<Subject> => {
  const token = localStorage.getItem("token") || "";
  const res = await api.post<Subject>(`/notebook/${notebookId}/subject`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const createTopic = async (
  data: Topic,
  notebookId: string,
  subjectId: string
): Promise<Topic> => {
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
  console.log("📡 Sending request:", {
    url: `/notebook/${notebookId}/subject/${subjectId}/topic/${topicId}/page`,
    body: data,
  });

  const res = await api.post<Content>(
    `/notebook/${notebookId}/subject/${subjectId}/topic/${topicId}/page`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  return res.data;
};
