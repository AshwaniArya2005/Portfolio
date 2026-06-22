"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import {
  Star, GitFork, TrendingUp, Zap, Target,
  Award, Activity, Users, BookOpen,
  ChevronRight, Calendar, BarChart3,
  PieChart as PieIcon, Info
} from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { SiLeetcode, SiCodeforces } from "react-icons/si";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell,
  BarChart, Bar
} from "recharts";
import { GitHubCalendar } from "react-github-calendar";

import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { GlowCard } from "@/components/ui/GlowCard";
import { personal } from "@/data/personal";
import { fetchLeetCodeStats, type LeetCodeStats } from "@/lib/leetcode";
import { fetchCodeforcesStats, getCFRankColor, type CodeforcesStats } from "@/lib/codeforces";
import { fetchGitHubUser, fetchGitHubStats, type GitHubUser } from "@/lib/github";

// ── Components ──────────────────────────────────────────────────

function StatWidget({ label, value, icon, color, subValue }: {
  label: string; value: string | number; icon: React.ReactNode; color: string; subValue?: string
}) {
  return (
    <div className="flex flex-col p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-[var(--border)] hover:border-[var(--border-strong)] transition-colors">
      <div className="flex items-center justify-between mb-2">
        <span className="p-1.5 rounded-lg bg-black/5 dark:bg-white/5" style={{ color }}>{icon}</span>
        {subValue && <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase">{subValue}</span>}
      </div>
      <div className="text-xl font-bold font-heading text-[var(--text-primary)]">{value}</div>
      <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-widest font-medium mt-0.5">{label}</div>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="grid lg:grid-cols-3 gap-6 animate-pulse">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-[600px] rounded-3xl bg-black/5 dark:bg-white/5 border border-[var(--border-strong)]" />
      ))}
    </div>
  );
}

// ── Main Section ────────────────────────────────────────────────

export function CodingProfiles() {
  const { resolvedTheme } = useTheme();
  const [lcStats, setLcStats] = useState<LeetCodeStats | null>(null);
  const [cfStats, setCfStats] = useState<CodeforcesStats | null>(null);
  const [ghUser, setGhUser] = useState<GitHubUser | null>(null);
  const [ghStats, setGhStats] = useState<{ totalStars: number; totalForks: number; repoCount: number; languages: Record<string, number> } | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    async function load() {
      setLoading(true);
      try {
        const [lc, cf, gh, ghs] = await Promise.all([
          fetchLeetCodeStats(personal.leetcode),
          fetchCodeforcesStats(personal.codeforces),
          fetchGitHubUser(personal.github),
          fetchGitHubStats(personal.github),
        ]);
        setLcStats(lc);
        setCfStats(cf);
        setGhUser(gh);
        setGhStats(ghs as any);
      } catch (err) {
        console.error("Error loading profiles:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // Prepare chart data
  const lcChartData = useMemo(() => {
    if (!lcStats) return [];
    return [
      { name: "Easy", value: lcStats.easySolved, color: "#10b981" },
      { name: "Medium", value: lcStats.mediumSolved, color: "#f59e0b" },
      { name: "Hard", value: lcStats.hardSolved, color: "#ef4444" },
    ];
  }, [lcStats]);

  const cfChartData = useMemo(() => {
    if (!cfStats?.ratingHistory || cfStats.ratingHistory.length === 0) return [];
    return cfStats.ratingHistory.map(c => ({
      name: c.contestName,
      rating: c.newRating,
      date: new Date(c.ratingUpdateTimeSeconds * 1000).toLocaleDateString()
    }));
  }, [cfStats]);

  const ghLangData = useMemo(() => {
    if (!ghStats?.languages) return [];
    return Object.entries(ghStats.languages)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);
  }, [ghStats]);

  if (loading || !hasMounted) return <LoadingSkeleton />;

  return (
    <SectionWrapper
      id="coding-profiles"
      label="Analytics"
      title="Coding Dashboard"
      subtitle="Dynamic performance metrics from competitive programming and open-source contributions."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-start">

        {/* LEETCODE DASHBOARD */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="h-full"
        >
          <GlowCard className="p-6 h-full flex flex-col" glowColor="rgba(255,161,22,0.15)">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-[#FFA116]/10 border border-[#FFA116]/20">
                  <SiLeetcode size={24} className="text-[#FFA116]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[var(--text-primary)] font-heading leading-tight">LeetCode</h3>
                  <p className="text-xs text-[var(--text-muted)] font-mono tracking-tight">@{personal.leetcode}</p>
                </div>
              </div>
              <a
                href={`https://leetcode.com/${personal.leetcode}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-black/5 dark:bg-white/5 border border-[var(--border-strong)] flex items-center justify-center hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
              >
                <ChevronRight size={16} className="text-[var(--text-secondary)]" />
              </a>
            </div>

            {lcStats ? (
              <div className="flex-1 flex flex-col space-y-6">
                {/* Solved Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2 p-4 rounded-2xl bg-gradient-to-br from-[#FFA116]/10 to-transparent border border-[#FFA116]/10 flex items-center justify-between">
                    <div>
                      <div className="text-3xl font-black text-[var(--text-primary)] font-heading">{lcStats.totalSolved}</div>
                      <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-[0.2em] font-bold">Total Problems Solved</div>
                    </div>
                    <div className="w-16 h-16">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={lcChartData}
                            cx="50%"
                            cy="50%"
                            innerRadius={22}
                            outerRadius={30}
                            paddingAngle={5}
                            dataKey="value"
                            stroke="none"
                          >
                            {lcChartData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  <StatWidget icon={<Target size={14} />} label="Easy" value={lcStats.easySolved} color="#10b981" subValue={`${Math.round((lcStats.easySolved / lcStats.totalSolved) * 100)}%`} />
                  <StatWidget icon={<Zap size={14} />} label="Medium" value={lcStats.mediumSolved} color="#f59e0b" subValue={`${Math.round((lcStats.mediumSolved / lcStats.totalSolved) * 100)}%`} />
                  <StatWidget icon={<Award size={14} />} label="Hard" value={lcStats.hardSolved} color="#ef4444" subValue={`${Math.round((lcStats.hardSolved / lcStats.totalSolved) * 100)}%`} />
                  <StatWidget icon={<TrendingUp size={14} />} label="Global Rank" value={`#${lcStats.ranking.toLocaleString()}`} color="var(--gold-light)" />
                </div>

                {/* Contest Widget */}
                {lcStats.contestCount > 0 ? (
                  <div className="p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-[var(--border)] space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[var(--text-secondary)] tracking-wider">CONTEST PERFORMANCE</span>
                      <span className="text-[10px] font-mono text-[#FFA116] bg-[#FFA116]/10 px-2 py-0.5 rounded-md">
                        Rating: {lcStats.contestRating}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <div className="text-lg font-bold text-[var(--text-primary)]">{lcStats.contestGlobalRanking.toLocaleString()}</div>
                        <div className="text-[10px] text-[var(--text-muted)] uppercase font-medium">World Ranking</div>
                      </div>
                      <div className="space-y-1 text-right">
                        <div className="text-lg font-bold text-[var(--text-primary)]">Top {lcStats.contestTopPercentage}%</div>
                        <div className="text-[10px] text-[var(--text-muted)] uppercase font-medium">Percentile</div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-[var(--border)] text-center">
                    <div className="text-sm font-bold text-[var(--text-muted)] uppercase tracking-widest">Unrated in Contests</div>
                  </div>
                )}

                {/* Streak & Activity */}
                <div className="mt-auto grid grid-cols-2 gap-3">
                  <div className="p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-[var(--border)] flex flex-col items-center text-center">
                    <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center mb-2">
                      <Activity size={16} className="text-orange-500" />
                    </div>
                    <div className="text-xl font-bold text-[var(--text-primary)] font-heading">{lcStats.streak}</div>
                    <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-widest font-bold">Day Streak</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-[var(--border)] flex flex-col items-center text-center">
                    <div className="w-8 h-8 rounded-full bg-[var(--gold)]/10 flex items-center justify-center mb-2">
                      <Calendar size={16} style={{ color: "var(--gold)" }} />
                    </div>
                    <div className="text-xl font-bold text-[var(--text-primary)] font-heading">{lcStats.totalActiveDays}</div>
                    <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-widest font-bold">Active Days</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-[var(--text-muted)]">
                <SiLeetcode size={64} className="mb-4 opacity-10" />
                <p className="text-xs uppercase tracking-widest font-bold">Data Unavailable</p>
              </div>
            )}
          </GlowCard>
        </motion.div>

        {/* CODEFORCES DASHBOARD */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="h-full"
        >
          <GlowCard className="p-6 h-full flex flex-col" glowColor="rgba(31,138,203,0.15)">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-[#1F8ACB]/10 border border-[#1F8ACB]/20">
                  <SiCodeforces size={24} className="text-[#1F8ACB]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[var(--text-primary)] font-heading leading-tight">Codeforces</h3>
                  <p className="text-xs text-[var(--text-muted)] font-mono tracking-tight">@{personal.codeforces}</p>
                </div>
              </div>
              <a
                href={`https://codeforces.com/profile/${personal.codeforces}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-black/5 dark:bg-white/5 border border-[var(--border-strong)] flex items-center justify-center hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
              >
                <ChevronRight size={16} className="text-[var(--text-secondary)]" />
              </a>
            </div>

            {cfStats?.user ? (
              <div className="flex-1 flex flex-col space-y-6">
                {/* Rating Hero */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-[var(--border)]">
                    <div className="text-3xl font-black text-[var(--text-primary)] font-heading leading-none mb-1">{cfStats.user.rating || "—"}</div>
                    <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-[0.1em] font-bold">Current Rating</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-[var(--border)]">
                    <div className="text-3xl font-black text-[var(--text-secondary)] font-heading leading-none mb-1">{cfStats.user.maxRating || "—"}</div>
                    <div className="text-[10px] text-[var(--text-muted)] uppercase tracking-[0.1em] font-bold">Peak Rating</div>
                  </div>
                </div>

                {/* Rating Chart */}
                {cfChartData.length > 0 ? (
                  <div className="p-4 rounded-3xl bg-black/5 dark:bg-white/5 border border-[var(--border)]">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-widest">Rating History</span>
                      <TrendingUp size={12} style={{ color: "var(--gold-light)" }} />
                    </div>
                    <div className="h-40 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={cfChartData}>
                          <defs>
                            <linearGradient id="colorRating" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor={getCFRankColor(cfStats.user.rank)} stopOpacity={0.3} />
                              <stop offset="95%" stopColor={getCFRankColor(cfStats.user.rank)} stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                          <XAxis dataKey="date" hide />
                          <YAxis domain={['dataMin - 100', 'dataMax + 100']} hide />
                          <Tooltip
                            contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', fontSize: '10px' }}
                            itemStyle={{ color: getCFRankColor(cfStats.user.rank) }}
                          />
                          <Area type="monotone" dataKey="rating" stroke={getCFRankColor(cfStats.user.rank)} fillOpacity={1} fill="url(#colorRating)" strokeWidth={2} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                ) : (
                  <div className="p-8 rounded-3xl bg-black/5 dark:bg-white/5 border border-[var(--border-strong)] flex flex-col items-center justify-center text-center">
                    <BarChart3 size={24} className="text-[var(--border-strong)] mb-3" />
                    <div className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-[0.2em]">No Rating History</div>
                    <p className="text-[9px] text-[var(--text-muted)] mt-1 uppercase">Participate in rated contests to see trends</p>
                  </div>
                )}

                {/* CP Stats */}
                <div className="grid grid-cols-2 gap-3">
                  <StatWidget icon={<BookOpen size={14} />} label="Problems" value={cfStats.problemsSolved} color="var(--gold-light)" subValue="Solved" />
                  <StatWidget icon={<Users size={14} />} label="Friends" value={cfStats.user.friendOfCount} color="var(--gold)" subValue="Following" />
                </div>

                {/* Recent Contests */}
                <div className="space-y-2">
                  <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-[0.2em] px-1">Recent Contests</p>
                  <div className="space-y-1.5">
                    {cfStats.recentContests.slice(0, 3).map((contest) => (
                      <div key={contest.contestId} className="group/item flex items-center justify-between p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-transparent hover:border-[var(--border-strong)] transition-all">
                        <div className="flex-1 min-w-0">
                          <div className="text-[11px] font-bold text-[var(--text-primary)] truncate">{contest.contestName}</div>
                          <div className="text-[10px] text-[var(--text-muted)] uppercase font-medium">Rank: {contest.rank}</div>
                        </div>
                        <div className={`text-xs font-mono font-bold ${contest.newRating >= contest.oldRating ? 'text-emerald-500' : 'text-red-500'}`}>
                          {contest.newRating >= contest.oldRating ? '+' : ''}{contest.newRating - contest.oldRating}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-[var(--text-muted)]">
                <SiCodeforces size={64} className="mb-4 opacity-10" />
                <p className="text-xs uppercase tracking-widest font-bold">Data Unavailable</p>
              </div>
            )}
          </GlowCard>
        </motion.div>

        {/* GITHUB DASHBOARD */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="h-full"
        >
          <GlowCard className="p-6 h-full flex flex-col" glowColor="var(--gold-glow)">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-black/5 dark:bg-white/5 border border-[var(--border-strong)]">
                  <FaGithub size={24} className="text-[var(--text-primary)]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[var(--text-primary)] font-heading leading-tight">GitHub</h3>
                  <p className="text-xs text-[var(--text-muted)] font-mono tracking-tight">@{personal.github}</p>
                </div>
              </div>
              <a
                href={`https://github.com/${personal.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-black/5 dark:bg-white/5 border border-[var(--border-strong)] flex items-center justify-center hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
              >
                <ChevronRight size={16} className="text-[var(--text-secondary)]" />
              </a>
            </div>

            {ghUser ? (
              <div className="flex-1 flex flex-col space-y-6">
                {/* Real Contribution Calendar */}
                <div className="p-4 rounded-3xl bg-black/5 dark:bg-white/5 border border-[var(--border-strong)] overflow-hidden">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-widest">Activity Calendar</span>
                    <Activity size={12} className="text-emerald-500" />
                  </div>
                  <div className="github-calendar-wrapper overflow-x-auto text-[8px] sm:text-[10px] scrollbar-hide">
                    <div className="min-w-[600px] sm:min-w-0">
                      <GitHubCalendar
                        username={personal.github}
                        blockSize={8}
                        blockMargin={3}
                        fontSize={10}
                        colorScheme={resolvedTheme === "dark" ? "dark" : "light"}
                        theme={{
    dark: ['rgba(255,255,255,0.05)', 'rgba(192,57,43,0.4)', 'rgba(192,57,43,0.6)', 'rgba(192,57,43,0.8)', '#e74c3c'],
    light: ['rgba(0,0,0,0.05)', 'rgba(201,146,42,0.3)', 'rgba(201,146,42,0.5)', 'rgba(201,146,42,0.7)', '#c9922a'],
  }}
                      />
                    </div>
                  </div>
                </div>

                {/* Primary Stats */}
                <div className="grid grid-cols-2 gap-3">
                  <StatWidget icon={<Star size={14} />} label="Stars" value={ghStats?.totalStars ?? 0} color="#f59e0b" subValue="Earned" />
                  <StatWidget icon={<GitFork size={14} />} label="Repos" value={ghUser.public_repos} color="var(--gold)" subValue="Public" />
                </div>

                {/* Language Distribution */}
                <div className="p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-[var(--border)]">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-black text-[var(--text-secondary)] uppercase tracking-widest">Stack Distribution</span>
                    <PieIcon size={12} style={{ color: "var(--gold)" }} />
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={ghLangData}
                            cx="50%"
                            cy="50%"
                            innerRadius={25}
                            outerRadius={35}
                            dataKey="value"
                            stroke="none"
                          >
                            {ghLangData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={`rgba(201,146,42, ${1 - index * 0.15})`} />
                            ))}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="flex-1 grid grid-cols-1 gap-1.5">
                      {ghLangData.map((lang, i) => (
                        <div key={lang.name} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full" style={{ background: `rgba(201,146,42, ${1 - i * 0.15})` }} />
                            <span className="text-[10px] font-bold text-[var(--text-primary)]/70 uppercase">{lang.name}</span>
                          </div>
                          <span className="text-[10px] font-mono text-[var(--text-muted)]">{lang.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Social Stats */}
                <div className="mt-auto grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-3 p-3 rounded-2xl bg-black/5 dark:bg-white/5 border border-[var(--border)]">
                    <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500"><Users size={14} /></div>
                    <div>
                      <div className="text-sm font-bold text-[var(--text-primary)] leading-none">{ghUser.followers}</div>
                      <div className="text-[9px] text-[var(--text-muted)] uppercase font-medium">Followers</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-2xl bg-black/5 dark:bg-white/5 border border-[var(--border)]">
                    <div className="p-2 rounded-lg" style={{ background: "var(--gold-glow)", color: "var(--gold)" }}><GitFork size={14} /></div>
                    <div>
                      <div className="text-sm font-bold text-[var(--text-primary)] leading-none">{ghUser.following}</div>
                      <div className="text-[9px] text-[var(--text-muted)] uppercase font-medium">Following</div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-[var(--text-muted)]">
                <FaGithub size={64} className="mb-4 opacity-10" />
                <p className="text-xs uppercase tracking-widest font-bold">Data Unavailable</p>
              </div>
            )}
          </GlowCard>
        </motion.div>
      </div>


    </SectionWrapper>
  );
}

