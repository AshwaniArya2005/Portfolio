"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Send, Check, Copy, MapPin } from "lucide-react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa6";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { GlowCard } from "@/components/ui/GlowCard";
import { personal } from "@/data/personal";
import { sendContactEmail, type ContactFormData } from "@/lib/emailjs";

export function Contact() {
  const [form, setForm] = useState<ContactFormData>({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [copied, setCopied] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus("sending");
    const result = await sendContactEmail(form);
    if (result.success) {
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } else {
      setStatus("error");
      setErrorMsg(result.message);
    }
  };

  const copyEmail = async () => {
    await navigator.clipboard.writeText(personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const inputClass = "w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200";
  const inputStyle = {
    background: "var(--surface-2)",
    border: "1px solid var(--border)",
    color: "var(--text-primary)",
    fontFamily: "var(--font-body)",
  };
  const inputFocusStyle = { borderColor: "rgba(124,58,237,0.5)", boxShadow: "0 0 0 3px rgba(124,58,237,0.1)" };

  return (
    <SectionWrapper
      id="contact"
      label="Get In Touch"
      title="Let's Connect"
      subtitle="I'm always open to new opportunities, collaborations, or just a good tech conversation."
    >
      <div className="grid lg:grid-cols-5 gap-10 max-w-5xl mx-auto">
        {/* Left: Info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-2 space-y-6"
        >
          <div>
            <h3
              className="text-xl font-bold mb-2"
              style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}
            >
              Hit me up!
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              Whether it&apos;s a project idea, internship opportunity, or just want to talk DSA — my inbox
              is always open.
            </p>
          </div>

          {/* Email copy */}
          <div
            className="flex items-center gap-3 p-4 rounded-xl cursor-pointer group transition-colors"
            style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
            onClick={copyEmail}
          >
            <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: "rgba(124,58,237,0.1)" }}>
              <Mail size={16} style={{ color: "var(--violet-light)" }} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs mb-0.5" style={{ color: "var(--text-muted)" }}>Email</p>
              <p className="text-sm font-medium truncate" style={{ color: "var(--text-primary)", fontFamily: "var(--font-mono)" }}>
                {personal.email}
              </p>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={copied ? "check" : "copy"}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                {copied
                  ? <Check size={15} style={{ color: "#10b981" }} />
                  : <Copy size={15} style={{ color: "var(--text-muted)" }} />
                }
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Location & Availability */}
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm" style={{ color: "var(--text-secondary)" }}>
              <MapPin size={15} style={{ color: "var(--violet-light)" }} />
              {personal.location}
            </div>
            <div className="flex items-center gap-3 text-sm" style={{ color: "var(--text-secondary)" }}>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              {personal.availability}
            </div>
          </div>

          {/* Social links */}
          <div>
            <p className="text-xs mb-3" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
              // Social
            </p>
            <div className="flex gap-3">
              {[
                { icon: FaGithub, href: `https://github.com/${personal.github}`, label: "GitHub" },
                { icon: FaLinkedin, href: `https://linkedin.com/in/${personal.linkedin}`, label: "LinkedIn" },
                { icon: FaInstagram, href: `https://instagram.com/${personal.instagram}`, label: "Instagram" },
              ].map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2.5 rounded-xl transition-colors"
                  style={{
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    color: "var(--text-secondary)",
                  }}
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right: Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-3"
        >
          <GlowCard className="p-8">
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-12 gap-4"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(16,185,129,0.15)" }}
                  >
                    <Check size={32} style={{ color: "#10b981" }} />
                  </motion.div>
                  <h3 className="text-xl font-bold" style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}>
                    Message Sent!
                  </h3>
                  <p className="text-sm text-center" style={{ color: "var(--text-secondary)" }}>
                    Thanks for reaching out. I&apos;ll get back to you soon!
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="text-sm underline mt-2"
                    style={{ color: "var(--violet-light)" }}
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="space-y-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs mb-1.5" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                        Name *
                      </label>
                      <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        required
                        className={inputClass}
                        style={inputStyle}
                        onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                        onBlur={(e) => Object.assign(e.target.style, { borderColor: "var(--border)", boxShadow: "none" })}
                      />
                    </div>
                    <div>
                      <label className="block text-xs mb-1.5" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                        Email *
                      </label>
                      <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        required
                        className={inputClass}
                        style={inputStyle}
                        onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                        onBlur={(e) => Object.assign(e.target.style, { borderColor: "var(--border)", boxShadow: "none" })}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs mb-1.5" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                      Subject
                    </label>
                    <input
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      placeholder="What's this about?"
                      className={inputClass}
                      style={inputStyle}
                      onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                      onBlur={(e) => Object.assign(e.target.style, { borderColor: "var(--border)", boxShadow: "none" })}
                    />
                  </div>

                  <div>
                    <label className="block text-xs mb-1.5" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project, opportunity, or idea..."
                      required
                      rows={5}
                      className={`${inputClass} resize-none`}
                      style={inputStyle}
                      onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                      onBlur={(e) => Object.assign(e.target.style, { borderColor: "var(--border)", boxShadow: "none" })}
                    />
                  </div>

                  {status === "error" && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs px-3 py-2 rounded-lg"
                      style={{ background: "rgba(239,68,68,0.1)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.2)" }}
                    >
                      {errorMsg}
                    </motion.p>
                  )}

                  <MagneticButton
                    id="contact-submit"
                    type="submit"
                    variant="primary"
                    size="md"
                    className="w-full justify-center gap-2"
                    disabled={status === "sending"}
                  >
                    {status === "sending" ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white"
                        />
                        Sending…
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Send Message
                      </>
                    )}
                  </MagneticButton>
                </motion.form>
              )}
            </AnimatePresence>
          </GlowCard>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
