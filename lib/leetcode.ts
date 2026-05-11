// ============================================================
// LEETCODE API UTILITIES (Public GraphQL API)
// ============================================================

const INTERNAL_API = "/api/leetcode";

export interface LeetCodeStats {
  username: string;
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  totalQuestions: number;
  easyTotal: number;
  mediumTotal: number;
  hardTotal: number;
  acceptanceRate: number;
  ranking: number;
  streak?: number;
  reputation?: number;
}

export async function fetchLeetCodeStats(
  username: string
): Promise<LeetCodeStats | null> {
  if (!username || username === "your-leetcode-username") return null;

  try {
    const res = await fetch(`${INTERNAL_API}?username=${username}`);

    if (!res.ok) throw new Error("Internal API error");
    const data = await res.json();
    
    if (data.error) return null;

    return data as LeetCodeStats;
  } catch (error) {
    console.error("Failed to fetch LeetCode stats:", error);
    return null;
  }
}
