import { apiHF, api } from "./api";

export interface WikiData {
  title: string;
  content: string;
}

export interface SummarizeData {
  summary: string;
}

export const fetchWikiFromBackend = async (title: string): Promise<WikiData | null> => {
  if (!title.trim()) return null;

  try {
    const token = localStorage.getItem("token") || "";
    const res = await api.get(`/search/wiki/${title}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data || null; // Expect backend to return structured JSON { title, plainText }
  } catch (error) {
    console.error("Failed to fetch wiki info:", error);
    return null;
  }
};

export const summarize = async(texts: string): Promise<SummarizeData | null> => {
  if(!texts) return null

  try {
    const res = await apiHF.post('/summarize', {
      text: texts
    })
    return res.data || null;
  } catch (error) {
    console.log(error)
    return null
  }
}