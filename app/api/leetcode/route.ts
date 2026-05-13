import { NextResponse } from "next/server";

const LEETCODE_GRAPHQL = "https://leetcode.com/graphql";

const query = `
  query userProblemsSolved($username: String!) {
    matchedUser(username: $username) {
      username
      profile {
        ranking
        reputation
      }
      submitStats {
        acSubmissionNum {
          difficulty
          count
          submissions
        }
        totalSubmissionNum {
          difficulty
          count
        }
      }
      userCalendar {
        streak
        totalActiveDays
      }
    }
    userContestRanking(username: $username) {
      attendedContestsCount
      rating
      globalRanking
      topPercentage
    }
    allQuestionsCount {
      difficulty
      count
    }
  }
`;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");

  if (!username) {
    return NextResponse.json({ error: "Username is required" }, { status: 400 });
  }

  try {
    const res = await fetch(LEETCODE_GRAPHQL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Referer: "https://leetcode.com",
      },
      body: JSON.stringify({ query, variables: { username } }),
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!res.ok) throw new Error("LeetCode API error");
    const data = await res.json();
    const user = data?.data?.matchedUser;
    const contest = data?.data?.userContestRanking;
    
    if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const acStats = user.submitStats?.acSubmissionNum || [];
    const allQ = data?.data?.allQuestionsCount || [];

    const findCount = (arr: { difficulty: string; count: number }[], diff: string) =>
      arr.find((x) => x.difficulty === diff)?.count ?? 0;

    const stats = {
      username,
      totalSolved: findCount(acStats, "All"),
      easySolved: findCount(acStats, "Easy"),
      mediumSolved: findCount(acStats, "Medium"),
      hardSolved: findCount(acStats, "Hard"),
      totalQuestions: findCount(allQ, "All"),
      easyTotal: findCount(allQ, "Easy"),
      mediumTotal: findCount(allQ, "Medium"),
      hardTotal: findCount(allQ, "Hard"),
      ranking: user.profile?.ranking ?? 0,
      reputation: user.profile?.reputation ?? 0,
      streak: user.userCalendar?.streak ?? 0,
      totalActiveDays: user.userCalendar?.totalActiveDays ?? 0,
      contestRating: Math.round(contest?.rating ?? 0),
      contestGlobalRanking: contest?.globalRanking ?? 0,
      contestTopPercentage: contest?.topPercentage ?? 0,
      contestCount: contest?.attendedContestsCount ?? 0,
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error("Failed to fetch LeetCode stats via API:", error);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
