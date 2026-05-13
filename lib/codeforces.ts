// ============================================================
// CODEFORCES API UTILITIES (Public REST API)
// ============================================================

const CF_API = "https://codeforces.com/api";

export interface CodeforcesUser {
  handle: string;
  rating: number;
  maxRating: number;
  rank: string;
  maxRank: string;
  titlePhoto: string;
  friendOfCount: number;
  contribution: number;
}

export interface CodeforcesContest {
  contestId: number;
  contestName: string;
  rank: number;
  oldRating: number;
  newRating: number;
  ratingUpdateTimeSeconds: number;
}

export interface CodeforcesStats {
  user: CodeforcesUser | null;
  recentContests: CodeforcesContest[];
  ratingHistory: CodeforcesContest[];
  problemsSolved: number;
}

export async function fetchCodeforcesRatingHistory(
  handle: string
): Promise<CodeforcesContest[]> {
  if (!handle || handle === "your-codeforces-handle") return [];

  try {
    const res = await fetch(`${CF_API}/user.rating?handle=${handle}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error("CF API error");
    const data = await res.json();
    if (data.status !== "OK") return [];
    return data.result;
  } catch (error) {
    console.error("Failed to fetch Codeforces rating history:", error);
    return [];
  }
}

export async function fetchCodeforcesUser(
  handle: string
): Promise<CodeforcesUser | null> {
  if (!handle || handle === "your-codeforces-handle") return null;

  try {
    const res = await fetch(`${CF_API}/user.info?handles=${handle}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error("CF API error");
    const data = await res.json();
    if (data.status !== "OK") throw new Error(data.comment);
    return data.result[0];
  } catch (error) {
    console.error("Failed to fetch Codeforces user:", error);
    return null;
  }
}

export async function fetchCodeforcesStats(
  handle: string
): Promise<CodeforcesStats> {
  const [user, ratingHistory] = await Promise.all([
    fetchCodeforcesUser(handle),
    fetchCodeforcesRatingHistory(handle),
  ]);

  const recentContests = [...ratingHistory].reverse().slice(0, 5);

  // Fetch problem submissions to count unique solved
  let problemsSolved = 0;
  try {
    const res = await fetch(
      `${CF_API}/user.status?handle=${handle}&from=1&count=10000`,
      { next: { revalidate: 3600 } }
    );
    if (res.ok) {
      const data = await res.json();
      if (data.status === "OK") {
        const solved = new Set(
          data.result
            .filter((s: { verdict: string }) => s.verdict === "OK")
            .map(
              (s: { problem: { contestId: number; index: string } }) =>
                `${s.problem.contestId}-${s.problem.index}`
            )
        );
        problemsSolved = solved.size;
      }
    }
  } catch {
    // ignore
  }

  return { user, recentContests, ratingHistory, problemsSolved };
}

// Color for CF rank
export function getCFRankColor(rank: string): string {
  const colors: Record<string, string> = {
    newbie: "#808080",
    pupil: "#008000",
    specialist: "#03a89e",
    expert: "#0000ff",
    "candidate master": "#aa00aa",
    master: "#ff8c00",
    "international master": "#ff8c00",
    grandmaster: "#ff0000",
    "international grandmaster": "#ff0000",
    "legendary grandmaster": "#ff0000",
  };
  return colors[rank?.toLowerCase()] || "#a855f7";
}
