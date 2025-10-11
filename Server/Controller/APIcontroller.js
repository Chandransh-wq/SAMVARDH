import fetch from "node-fetch";

// Fetch Wikipedia page by title
export const wiki = async (req, res) => {
  const title = req.params.title;
  if (!title) {
    return res.status(400).json({ error: "Missing query parameter 'title'" });
  }

  try {
    const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(
      title
    )}&prop=extracts&explaintext=true&redirects=true&format=json`;

    const response = await fetch(url);
    const data = await response.json();

    const pages = data.query.pages;
    const pageId = Object.keys(pages)[0];

    if (pageId === "-1") {
      return res.status(404).json({ error: "Page not found" });
    }

    const page = pages[pageId];

    res.status(200).json({
      title: page.title,
      content: page.extract,
      url: `https://en.wikipedia.org/wiki/${encodeURIComponent(page.title)}`,
    });
  } catch (error) {
    console.error("Wikipedia fetch failed:", error);
    res.status(500).json({
      message: "Failed to fetch Wikipedia page",
      error: error.message,
    });
  }
};

// Summarize text using Hugging Face
export const summarizeText = async (req, res) => {
  const { text, max_length, min_length } = req.body;

  if (!text) return res.status(400).json({ error: "Missing text to summarize" });

  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.SUMMARIZER}`, // Your Hugging Face API token
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: text,
          parameters: {
            max_length: max_length || 250, // optional, default 150 tokens
            min_length: min_length || 100,  // optional, default 40 tokens
          },
        }),
      }
    );

    const data = await response.json();

    if (!data || data.error) {
      return res.status(500).json({ error: "Hugging Face API error", message: data.error });
    }

    res.status(200).json({
      summary: data[0]?.summary_text || "No summary generated.",
    });
  } catch (err) {
    console.error("Summarization failed:", err);
    res.status(500).json({ error: "Summarization failed", message: err.message });
  }
};
