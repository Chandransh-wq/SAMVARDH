// manypixels.ts

export interface Illustration {
  id: string;
  name: string;
  tags: string[];
  svg: string;
  png: string;
}

export async function fetchIllustrations(subject: string): Promise<Illustration[]> {
  // Map subjects to categories for better matching
  const categoryMap: Record<string, string> = {
    math: "education",
    science: "education",
    history: "education",
    business: "business",
    technology: "technology",
  };

  const category = categoryMap[subject.toLowerCase()] || "education";

  const response = await fetch(`https://api.manypixels.co/v2/gallery?category=${category}`);
  if (!response.ok) throw new Error("Failed to fetch illustrations");

  const data: Illustration[] = await response.json();

  // Optionally filter by tags to match the subject
  return data.filter(illu => illu.tags.includes(subject.toLowerCase()));
}
