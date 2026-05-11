// ============================================================
// GITHUB API UTILITIES
// ============================================================

const GITHUB_API = "https://api.github.com";

export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  topics: string[];
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  fork: boolean;
}

export interface GitHubUser {
  login: string;
  avatar_url: string;
  name: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
}

const headers: HeadersInit = {
  Accept: "application/vnd.github.v3+json",
  ...(process.env.NEXT_PUBLIC_GITHUB_TOKEN && {
    Authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
  }),
};

export async function fetchGitHubRepos(
  username: string,
  limit: number = 10
): Promise<GitHubRepo[]> {
  try {
    const res = await fetch(
      `${GITHUB_API}/users/${username}/repos?sort=updated&per_page=${limit}&type=owner`,
      { headers, next: { revalidate: 3600 } }
    );
    if (!res.ok) throw new Error("GitHub API error");
    const repos: GitHubRepo[] = await res.json();
    return repos.filter((r) => !r.fork).slice(0, limit);
  } catch (error) {
    console.error("Failed to fetch GitHub repos:", error);
    return [];
  }
}

export async function fetchGitHubUser(username: string): Promise<GitHubUser | null> {
  try {
    const res = await fetch(`${GITHUB_API}/users/${username}`, {
      headers,
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error("GitHub user API error");
    return await res.json();
  } catch (error) {
    console.error("Failed to fetch GitHub user:", error);
    return null;
  }
}

export async function fetchGitHubStats(username: string) {
  try {
    const repos = await fetchGitHubRepos(username, 100);
    const totalStars = repos.reduce((acc, r) => acc + r.stargazers_count, 0);
    const totalForks = repos.reduce((acc, r) => acc + r.forks_count, 0);
    const languages = repos
      .filter((r) => r.language)
      .reduce((acc: Record<string, number>, r) => {
        if (r.language) {
          acc[r.language] = (acc[r.language] || 0) + 1;
        }
        return acc;
      }, {});

    return { totalStars, totalForks, languages, repoCount: repos.length };
  } catch {
    return null;
  }
}
