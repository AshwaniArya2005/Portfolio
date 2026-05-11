"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star, GitFork, TrendingUp, Zap, Target } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { SiLeetcode, SiCodeforces } from "react-icons/si";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { GlowCard } from "@/components/ui/GlowCard";
import { personal } from "@/data/personal";
import { fetchLeetCodeStats, type LeetCodeStats } from "@/lib/leetcode";
import { fetchCodeforcesStats, getCFRankColor, type CodeforcesStats } from "@/lib/codeforces";
import { fetchGitHubUser, fetchGitHubStats, type GitHubUser } from "@/lib/github";

function SkeletonCard() {
  return (
    <div className="p-6 rounded-2xl shimmer" style={{ border: "1px solid var(--border)", minHeight: 200 }} />
  );
}

function DonutChart({ easy, medium, hard, total }: { easy: number; medium: number; hard: number; total: number }) {
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const easyPct = total > 0 ? easy / total : 0;
  const medPct = total > 0 ? medium / total : 0;
  const hardPct = total > 0 ? hard / total : 0;

  const easyDash = easyPct * circumference;
  const medDash = medPct * circumference;
  const hardDash = hardPct * circumference;
  const emptyDash = circumference - easyDash - medDash - hardDash;

  return (
    <svg width="88" height="88" viewBox="0 0 88 88" className="-rotate-90">
      <circle cx="44" cy="44" r={radius} fill="none" stroke="var(--surface-2)" strokeWidth="10" />
      <motion.circle
        cx="44" cy="44" r={radius} fill="none" stroke="#10b981" strokeWidth="10"
        strokeDasharray={`${easyDash} ${circumference - easyDash}`}
        strokeDashoffset={0}
        initial={{ strokeDasharray: `0 ${circumference}` }}
        whileInView={{ strokeDasharray: `${easyDash} ${circumference - easyDash}` }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />
      <motion.circle
        cx="44" cy="44" r={radius} fill="none" stroke="#f59e0b" strokeWidth="10"
        strokeDasharray={`${medDash} ${circumference - medDash}`}
        strokeDashoffset={-easyDash}
        initial={{ strokeDasharray: `0 ${circumference}` }}
        whileInView={{ strokeDasharray: `${medDash} ${circumference - medDash}` }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
      />
      <motion.circle
        cx="44" cy="44" r={radius} fill="none" stroke="#ef4444" strokeWidth="10"
        strokeDasharray={`${hardDash} ${circumference - hardDash}`}
        strokeDashoffset={-(easyDash + medDash)}
        initial={{ strokeDasharray: `0 ${circumference}` }}
        whileInView={{ strokeDasharray: `${hardDash} ${circumference - hardDash}` }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }}
      />
    </svg>
  );
}

function StatPill({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="flex items-center justify-between px-3 py-2 rounded-lg" style={{ background: "var(--surface-2)" }}>
      <span className="text-xs" style={{ color: "var(--text-muted)" }}>{label}</span>
      <span className="text-sm font-bold" style={{ color, fontFamily: "var(--font-mono)" }}>{value}</span>
    </div>
  );
}

export function CodingProfiles() {
  const [lcStats, setLcStats] = useState<LeetCodeStats | null>(null);
  const [cfStats, setCfStats] = useState<CodeforcesStats | null>(null);
  const [ghUser, setGhUser] = useState<GitHubUser | null>(null);
  const [ghStats, setGhStats] = useState<{ totalStars: number; totalForks: number; repoCount: number } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const [lc, cf, gh, ghs] = await Promise.all([
        fetchLeetCodeStats(personal.leetcode),
        fetchCodeforcesStats(personal.codeforces),
        fetchGitHubUser(personal.github),
        fetchGitHubStats(personal.github),
      ]);
      setLcStats(lc);
      setCfStats(cf);
      setGhUser(gh);
      setGhStats(ghs);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <SectionWrapper
      id="coding-profiles"
      label="Competitive Programming"
      title="Coding Profiles"
      subtitle="Real-time stats from my competitive programming and open source journey."
    >
      <div className="grid md:grid-cols-3 gap-6">
        {/* LeetCode */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {loading ? <SkeletonCard /> : (
            <GlowCard className="p-6 h-full" glowColor="rgba(255,161,22,0.25)">
              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: "rgba(255,161,22,0.15)" }}>
                  <SiLeetcode size={20} style={{ color: "#FFA116" }} />
                </div>
                <div>
                  <h3 className="font-bold text-sm" style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}>LeetCode</h3>
                  <a href={`https://leetcode.com/${personal.leetcode}`} target="_blank" rel="noopener noreferrer"
                    className="text-xs" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                    @{personal.leetcode}
                  </a>
                </div>
              </div>

              {lcStats ? (
                <>
                  {/* Donut + total */}
                  <div className="flex items-center gap-5 mb-6">
                    <div className="relative">
                      <DonutChart
                        easy={lcStats.easySolved}
                        medium={lcStats.mediumSolved}
                        hard={lcStats.hardSolved}
                        total={lcStats.totalSolved}
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-lg font-bold" style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}>
                          {lcStats.totalSolved}
                        </span>
                      </div>
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2 text-xs">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                        <span style={{ color: "var(--text-muted)" }}>Easy</span>
                        <span className="ml-auto font-mono" style={{ color: "#10b981" }}>{lcStats.easySolved}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" />
                        <span style={{ color: "var(--text-muted)" }}>Medium</span>
                        <span className="ml-auto font-mono" style={{ color: "#f59e0b" }}>{lcStats.mediumSolved}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="w-2 h-2 rounded-full bg-red-500 inline-block" />
                        <span style={{ color: "var(--text-muted)" }}>Hard</span>
                        <span className="ml-auto font-mono" style={{ color: "#ef4444" }}>{lcStats.hardSolved}</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <StatPill label="Global Ranking" value={lcStats.ranking} color="var(--violet-light)" />
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 gap-3">
                  <SiLeetcode size={32} style={{ color: "#FFA116", opacity: 0.5 }} />
                  <p className="text-xs text-center" style={{ color: "var(--text-muted)" }}>
                    Update <code className="px-1 rounded" style={{ background: "var(--surface-2)" }}>NEXT_PUBLIC_LEETCODE_USERNAME</code> in <code>.env.local</code> to see live stats.
                  </p>
                </div>
              )}
            </GlowCard>
          )}
        </motion.div>

        {/* Codeforces */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {loading ? <SkeletonCard /> : (
            <GlowCard className="p-6 h-full" glowColor="rgba(31,138,203,0.25)">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: "rgba(31,138,203,0.15)" }}>
                  <SiCodeforces size={20} style={{ color: "#1F8ACB" }} />
                </div>
                <div>
                  <h3 className="font-bold text-sm" style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}>Codeforces</h3>
                  <a href={`https://codeforces.com/profile/${personal.codeforces}`} target="_blank" rel="noopener noreferrer"
                    className="text-xs" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                    @{personal.codeforces}
                  </a>
                </div>
              </div>

              {cfStats?.user ? (
                <div className="space-y-3">
                  <div className="text-center py-4 rounded-xl mb-4"
                    style={{ background: `${getCFRankColor(cfStats.user.rank)}15`, border: `1px solid ${getCFRankColor(cfStats.user.rank)}30` }}>
                    <div className="text-4xl font-bold" style={{ color: getCFRankColor(cfStats.user.rank), fontFamily: "var(--font-heading)" }}>
                      {cfStats.user.rating}
                    </div>
                    <div className="text-xs capitalize mt-1" style={{ color: getCFRankColor(cfStats.user.rank) }}>
                      {cfStats.user.rank}
                    </div>
                  </div>
                  <StatPill label="Max Rating" value={cfStats.user.maxRating} color="var(--cyan)" />
                  <StatPill label="Problems Solved" value={cfStats.problemsSolved} color="var(--violet-light)" />
                  {cfStats.recentContests.length > 0 && (
                    <div>
                      <p className="text-xs mb-2" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                        Recent contests
                      </p>
                      {cfStats.recentContests.slice(0, 3).map((c) => (
                        <div key={c.contestId} className="flex items-center justify-between py-1.5">
                          <span className="text-xs truncate max-w-[120px]" style={{ color: "var(--text-secondary)" }}>
                            {c.contestName.slice(0, 20)}…
                          </span>
                          <span className="text-xs font-mono" style={{ color: c.newRating > c.oldRating ? "#10b981" : "#ef4444" }}>
                            {c.newRating > c.oldRating ? "+" : ""}{c.newRating - c.oldRating}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 gap-3">
                  <SiCodeforces size={32} style={{ color: "#1F8ACB", opacity: 0.5 }} />
                  <p className="text-xs text-center" style={{ color: "var(--text-muted)" }}>
                    Update <code className="px-1 rounded" style={{ background: "var(--surface-2)" }}>NEXT_PUBLIC_CODEFORCES_HANDLE</code> in <code>.env.local</code>.
                  </p>
                </div>
              )}
            </GlowCard>
          )}
        </motion.div>

        {/* GitHub */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {loading ? <SkeletonCard /> : (
            <GlowCard className="p-6 h-full" glowColor="rgba(168,85,247,0.25)">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: "rgba(168,85,247,0.15)" }}>
                  <FaGithub size={20} style={{ color: "var(--violet-light)" }} />
                </div>
                <div>
                  <h3 className="font-bold text-sm" style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}>GitHub</h3>
                  <a href={`https://github.com/${personal.github}`} target="_blank" rel="noopener noreferrer"
                    className="text-xs" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                    @{personal.github}
                  </a>
                </div>
              </div>

              {ghUser ? (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: "Repos", value: ghUser.public_repos, icon: <FaGithub size={14} /> },
                      { label: "Followers", value: ghUser.followers, icon: <TrendingUp size={14} /> },
                      { label: "Stars", value: ghStats?.totalStars ?? 0, icon: <Star size={14} /> },
                      { label: "Forks", value: ghStats?.totalForks ?? 0, icon: <GitFork size={14} /> },
                    ].map(({ label, value, icon }) => (
                      <div key={label} className="flex flex-col items-center justify-center p-3 rounded-xl"
                        style={{ background: "var(--surface-2)" }}>
                        <span style={{ color: "var(--violet-light)" }}>{icon}</span>
                        <span className="text-xl font-bold mt-1" style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}>{value}</span>
                        <span className="text-xs" style={{ color: "var(--text-muted)" }}>{label}</span>
                      </div>
                    ))}
                  </div>
                  {/* Contribution graph placeholder */}
                  <div className="mt-4 p-3 rounded-xl" style={{ background: "var(--surface-2)" }}>
                    <p className="text-xs mb-2" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                      contribution activity
                    </p>
                    <div className="flex gap-0.5 flex-wrap">
                      {Array.from({ length: 52 }).map((_, i) => (
                        <div key={i} className="flex flex-col gap-0.5">
                          {Array.from({ length: 7 }).map((_, j) => (
                            <div
                              key={j}
                              className="w-2 h-2 rounded-sm"
                              style={{
                                background: Math.random() > 0.6
                                  ? `rgba(124,58,237,${Math.random() * 0.8 + 0.2})`
                                  : "var(--surface)",
                              }}
                            />
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 gap-3">
                  <FaGithub size={32} style={{ color: "var(--violet-light)", opacity: 0.5 }} />
                  <p className="text-xs text-center" style={{ color: "var(--text-muted)" }}>
                    Update <code className="px-1 rounded" style={{ background: "var(--surface-2)" }}>NEXT_PUBLIC_GITHUB_USERNAME</code> in <code>.env.local</code>.
                  </p>
                </div>
              )}
            </GlowCard>
          )}
        </motion.div>
      </div>

      {/* Profile links */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex flex-wrap justify-center gap-4 mt-10"
      >
        {[
          { label: "LeetCode Profile", href: `https://leetcode.com/${personal.leetcode}`, color: "#FFA116" },
          { label: "Codeforces Profile", href: `https://codeforces.com/profile/${personal.codeforces}`, color: "#1F8ACB" },
          { label: "GitHub Profile", href: `https://github.com/${personal.github}`, color: "var(--violet-light)" },
        ].map(({ label, href, color }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all hover:scale-105"
            style={{ background: "var(--surface)", border: "1px solid var(--border)", color }}
          >
            {label}
          </a>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
