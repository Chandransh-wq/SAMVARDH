import { useState } from "react";
import { fetchIllustrations } from "./manyPixels";

interface Illustration {
  id: string;
  name: string;
  tags: string[];
  svg: string;
  png: string;
}

export const SubjectIllustration = () => {
  const [subject, setSubject] = useState("");
  const [illustration, setIllustration] = useState<Illustration | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFetch = async () => {
    setLoading(true);
    try {
      const illustrations = await fetchIllustrations(subject);
      setIllustration(illustrations[0] || null); // pick the first one
    } catch (err) {
      console.error(err);
      setIllustration(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <input
        type="text"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        placeholder="Enter subject (e.g., science)"
        style={{ padding: "0.5rem", width: "250px" }}
      />
      <button onClick={handleFetch} disabled={loading} style={{ marginLeft: "1rem", padding: "0.5rem 1rem" }}>
        {loading ? "Loading..." : "Get Illustration"}
      </button>

      {illustration && (
        <div style={{ marginTop: "2rem" }}>
          <img src={illustration.svg} alt={illustration.name} style={{ maxWidth: "300px" }} />
        </div>
      )}
    </div>
  );
};
