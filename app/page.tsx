"use client";

import { useState } from "react";

type Style =
  | "Professional"
  | "Friendly"
  | "Casual"
  | "Academic"
  | "Simple";

type FixLevel =
  | "Grammar Only"
  | "Grammar + Clarity"
  | "Full Rewrite";

const styles: Style[] = [
  "Professional",
  "Friendly",
  "Casual",
  "Academic",
  "Simple",
];

const fixLevels: FixLevel[] = [
  "Grammar Only",
  "Grammar + Clarity",
  "Full Rewrite",
];

function formatResult(text: string) {
  return text.split("\n").map((line, index) => {
    const trimmed = line.trim();

    if (!trimmed) {
      return <div key={index} className="h-3" />;
    }

    const isHeading =
      /^(corrected text|corrected version|improvements|changes|grammar|clarity|explanation|notes|suggestions|result)\s*[:\-—]?/i.test(
        trimmed
      );

    if (isHeading) {
      return (
        <div
          key={index}
          className="mt-4 mb-2 rounded-xl border border-[#76e6bd]/25 bg-[#76e6bd]/10 px-4 py-3 text-sm font-bold text-[#9af3d0]"
        >
          {trimmed}
        </div>
      );
    }

    return (
      <p
        key={index}
        className="text-sm leading-7 text-zinc-300"
      >
        {trimmed}
      </p>
    );
  });
}

export default function Home() {
  const [text, setText] = useState("");
  const [style, setStyle] =
    useState<Style>("Professional");
  const [fixLevel, setFixLevel] =
    useState<FixLevel>("Grammar + Clarity");
  const [instruction, setInstruction] = useState("");

  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const fixText = async () => {
    if (!text.trim()) {
      setError("Please enter some text first.");
      return;
    }

    setLoading(true);
    setError("");
    setCopied(false);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          style,
          fixLevel,
          instruction,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error || "Unable to fix the text."
        );
      }

      if (!data?.result) {
        throw new Error(
          "AI returned an empty response."
        );
      }

      setResult(data.result);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  const copyResult = async () => {
    if (!result) return;

    try {
      await navigator.clipboard.writeText(result);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      setError("Unable to copy the result.");
    }
  };

  const clearAll = () => {
    setText("");
    setInstruction("");
    setResult("");
    setError("");
    setCopied(false);
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-gradient-to-b from-[#063d31] via-[#020908] to-black text-white">

      {/* MINT AMBIENT GLOW */}

      <div className="pointer-events-none absolute left-1/2 top-[-220px] h-[600px] w-[850px] max-w-[100vw] -translate-x-1/2 rounded-full bg-[#76e6bd]/20 blur-[170px]" />

      <div className="pointer-events-none absolute left-[-180px] top-[45%] h-[350px] w-[350px] rounded-full bg-[#76e6bd]/10 blur-[150px]" />

      <div className="pointer-events-none absolute right-[-180px] top-[65%] h-[350px] w-[350px] rounded-full bg-[#76e6bd]/10 blur-[150px]" />

      {/* NAVBAR */}

      <nav className="relative z-20 mx-4 mt-5 rounded-3xl border border-[#76e6bd]/20 bg-black/70 px-4 py-4 shadow-2xl backdrop-blur-2xl sm:mx-auto sm:max-w-6xl sm:px-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex min-w-0 items-center gap-3">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#76e6bd]/30 bg-[#76e6bd]/10">

              <img
                src="/logo.png"
                alt="KrishAIWorks"
                className="h-full w-full rounded-full object-cover"
              />

            </div>

            <div className="min-w-0">

              <h2 className="truncate text-sm font-bold sm:text-base">
                KrishAIWorks
              </h2>

              <p className="text-[10px] text-zinc-500 sm:text-xs">
                AI Solutions That Work
              </p>

            </div>

          </div>

          <div className="hidden items-center gap-7 text-sm text-zinc-300 md:flex">

            <a
              href="#home"
              className="transition hover:text-[#9af3d0]"
            >
              Home
            </a>

            <a
              href="#features"
              className="transition hover:text-[#9af3d0]"
            >
              Features
            </a>

            <a
              href="#how"
              className="transition hover:text-[#9af3d0]"
            >
              How To Use
            </a>

            <a
              href="#faq"
              className="transition hover:text-[#9af3d0]"
            >
              FAQ
            </a>

            <a
              href="https://www.instagram.com/krishaiworks/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[#c9ffe9] px-5 py-2 font-medium text-black transition hover:bg-white"
            >
              Follow
            </a>

          </div>

        </div>

      </nav>

      {/* HERO */}

      <section
        id="home"
        className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-4 pb-16 pt-16 text-center sm:px-8 sm:pt-24"
      >

        <div className="rounded-full border border-[#76e6bd]/30 bg-[#76e6bd]/10 px-4 py-2 text-xs text-[#9af3d0]">
          ✍️ AI Grammar & Writing Fixer
        </div>

        <p className="mt-4 text-xs text-zinc-500">
          Built by{" "}
          <span className="font-semibold text-[#9af3d0]">
            KrishAIWorks
          </span>
        </p>

        <h1 className="mt-7 max-w-4xl text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">

          Write Clearly.
          <br />

          <span className="bg-gradient-to-r from-white via-[#b8ffe3] to-[#54dca9] bg-clip-text text-transparent">
            Sound Better.
          </span>

        </h1>

        <p className="mt-6 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base sm:leading-8">
          Fix grammar, improve clarity and transform rough
          writing into clean, natural and polished text.
        </p>

        <div className="mt-7 flex max-w-full flex-wrap justify-center gap-3">

          <span className="rounded-full border border-[#76e6bd]/20 bg-[#76e6bd]/10 px-4 py-2 text-xs text-zinc-300">
            ✨ Smart Corrections
          </span>

          <span className="rounded-full border border-[#76e6bd]/20 bg-[#76e6bd]/10 px-4 py-2 text-xs text-zinc-300">
            🎯 Multiple Styles
          </span>

          <span className="rounded-full border border-[#76e6bd]/20 bg-[#76e6bd]/10 px-4 py-2 text-xs text-zinc-300">
            🤖 Gemini AI
          </span>

        </div>

      </section>

      {/* GENERATOR */}

      <section
        id="generator"
        className="relative z-10 mx-auto max-w-5xl px-4 pb-24 sm:px-8"
      >

        <div className="rounded-[2rem] border border-[#76e6bd]/20 bg-black/75 p-4 shadow-2xl shadow-[#76e6bd]/5 backdrop-blur-2xl sm:p-7">

          <div className="mb-7">

            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#58c99c]">
              Writing Fixer
            </p>

            <h2 className="mt-3 text-xl font-bold sm:text-2xl">
              Turn rough writing into polished text.
            </h2>

          </div>

          {/* INPUT */}

          <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Your Text
          </label>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste or type your text here..."
            className="mt-3 min-h-[240px] w-full resize-y rounded-2xl border border-[#76e6bd]/15 bg-[#020707] p-4 text-sm leading-7 text-white outline-none transition placeholder:text-zinc-700 focus:border-[#76e6bd]/50 focus:ring-1 focus:ring-[#76e6bd]/20"
          />

          {/* CONTROLS */}

          <div className="mt-5 grid gap-4 sm:grid-cols-2">

            <div>

              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                Writing Style
              </label>

              <select
                value={style}
                onChange={(e) =>
                  setStyle(e.target.value as Style)
                }
                className="mt-2 h-12 w-full rounded-xl border border-[#76e6bd]/15 bg-[#020707] px-4 text-sm text-white outline-none focus:border-[#76e6bd]/50"
              >

                {styles.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}

              </select>

            </div>

            <div>

              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                Fix Level
              </label>

              <select
                value={fixLevel}
                onChange={(e) =>
                  setFixLevel(
                    e.target.value as FixLevel
                  )
                }
                className="mt-2 h-12 w-full rounded-xl border border-[#76e6bd]/15 bg-[#020707] px-4 text-sm text-white outline-none focus:border-[#76e6bd]/50"
              >

                {fixLevels.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}

              </select>

            </div>

          </div>

          {/* OPTIONAL INSTRUCTION */}

          <div className="mt-5">

            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Optional Instruction
            </label>

            <input
              value={instruction}
              onChange={(e) =>
                setInstruction(e.target.value)
              }
              placeholder="Example: Keep it concise and natural..."
              className="mt-2 h-12 w-full rounded-xl border border-[#76e6bd]/15 bg-[#020707] px-4 text-sm text-white outline-none placeholder:text-zinc-700 focus:border-[#76e6bd]/50"
            />

          </div>

          {/* GENERATE BUTTON */}

          {!result && (

            <button
              type="button"
              onClick={fixText}
              disabled={loading}
              className="mt-5 w-full rounded-xl bg-[#c9ffe9] px-5 py-4 text-sm font-semibold text-black shadow-lg shadow-[#76e6bd]/10 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading
                ? "🤖 Fixing Your Writing..."
                : "✨ Fix My Writing"}
            </button>

          )}

          {/* CLEAR */}

          <button
            type="button"
            onClick={clearAll}
            className="mt-3 w-full py-2 text-xs text-zinc-600 transition hover:text-[#9af3d0]"
          >
            Clear Everything
          </button>

          {/* ERROR */}

          {error && (
            <div className="mt-5 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-300">
              ⚠️ {error}
            </div>
          )}

          {/* RESULT */}

          {result && (

            <div className="mt-8 rounded-3xl border border-[#76e6bd]/20 bg-[#020707] p-5 sm:p-7">

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div>

                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#58c99c]">
                    AI Result
                  </p>

                  <h3 className="mt-2 text-2xl font-bold">
                    Your Writing Is Ready.
                  </h3>

                </div>

                <button
                  type="button"
                  onClick={copyResult}
                  className="rounded-xl bg-[#c9ffe9] px-5 py-3 text-sm font-semibold text-black transition hover:bg-white"
                >
                  {copied
                    ? "✓ Copied"
                    : "📋 Copy Text"}
                </button>

              </div>

              {/* STATS */}

              <div className="mt-6 grid gap-4 sm:grid-cols-2">

                <div className="rounded-2xl border border-[#76e6bd]/10 bg-black p-5">

                  <p className="text-xs uppercase tracking-wider text-zinc-600">
                    Original Words
                  </p>

                  <p className="mt-3 text-3xl font-bold text-[#9af3d0]">
                    {text.trim()
                      ? text.trim().split(/\s+/).length
                      : 0}
                  </p>

                </div>

                <div className="rounded-2xl border border-[#76e6bd]/10 bg-black p-5">

                  <p className="text-xs uppercase tracking-wider text-zinc-600">
                    Result Words
                  </p>

                  <p className="mt-3 text-3xl font-bold text-[#9af3d0]">
                    {result.trim()
                      ? result.trim().split(/\s+/).length
                      : 0}
                  </p>

                </div>

              </div>

              {/* HIGHLIGHTED RESULT */}

              <div className="mt-6 rounded-2xl border border-[#76e6bd]/10 bg-black p-5 sm:p-6">

                {formatResult(result)}

              </div>

              {/* REGENERATE */}

              <button
                type="button"
                onClick={fixText}
                disabled={loading}
                className="mt-4 w-full rounded-xl border border-[#76e6bd]/25 bg-[#76e6bd]/5 px-5 py-3 text-xs font-semibold text-[#9af3d0] transition hover:border-[#76e6bd]/50 hover:bg-[#76e6bd]/10 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading
                  ? "🤖 Generating New Version..."
                  : "🔄 Fix Again"}
              </button>

            </div>

          )}

        </div>

      </section>

      {/* FEATURES */}

      <section
        id="features"
        className="relative z-10 mx-auto max-w-6xl px-4 py-20 sm:px-8"
      >

        <div className="grid gap-5 md:grid-cols-3">

          {[
            [
              "📝",
              "Grammar Correction",
              "Fix grammar, spelling, punctuation and common writing mistakes.",
            ],
            [
              "✨",
              "Better Clarity",
              "Make sentences easier to understand without changing the core meaning.",
            ],
            [
              "🎯",
              "Multiple Styles",
              "Choose a writing style that matches your audience and purpose.",
            ],
          ].map(([icon, title, description]) => (

            <div
              key={title}
              className="rounded-3xl border border-[#76e6bd]/10 bg-black/70 p-6 backdrop-blur-xl transition hover:border-[#76e6bd]/25"
            >

              <div className="text-3xl">
                {icon}
              </div>

              <h3 className="mt-5 text-base font-bold">
                {title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-zinc-500">
                {description}
              </p>

            </div>

          ))}

        </div>

      </section>

      {/* HOW TO USE */}

      <section
        id="how"
        className="relative z-10 mx-auto max-w-6xl px-4 py-20 sm:px-8"
      >

        <div className="text-center">

          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#58c99c]">
            How To Use
          </p>

          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            Improve your writing in three steps.
          </h2>

        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">

          {[
            [
              "01",
              "Paste Your Text",
              "Enter the paragraph, email, assignment or message you want to improve.",
            ],
            [
              "02",
              "Choose Your Style",
              "Select a writing style and how much you want the AI to improve.",
            ],
            [
              "03",
              "Get Better Writing",
              "Review the improved version and copy it wherever you need it.",
            ],
          ].map(([number, title, description]) => (

            <div
              key={number}
              className="rounded-3xl border border-[#76e6bd]/10 bg-black/70 p-6"
            >

              <span className="text-sm font-bold text-[#70dcb0]">
                {number}
              </span>

              <h3 className="mt-5 text-lg font-bold">
                {title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-zinc-500">
                {description}
              </p>

            </div>

          ))}

        </div>

      </section>

      {/* FAQ */}

      <section
        id="faq"
        className="relative z-10 mx-auto max-w-4xl px-4 py-20 sm:px-8"
      >

        <div className="text-center">

          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#58c99c]">
            FAQ
          </p>

          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            Frequently Asked Questions
          </h2>

        </div>

        <div className="mt-10 space-y-4">

          {[
            [
              "What can this tool fix?",
              "It can improve grammar, spelling, punctuation, clarity, sentence structure and overall writing quality.",
            ],
            [
              "Will it change my original meaning?",
              "The AI is instructed to preserve your original meaning while improving the writing.",
            ],
            [
              "Can I choose a writing style?",
              "Yes. You can choose Professional, Friendly, Casual, Academic or Simple writing.",
            ],
            [
              "Can I use it for emails and assignments?",
              "Yes. The tool can improve emails, messages, assignments, essays, posts and general writing.",
            ],
          ].map(([question, answer]) => (

            <div
              key={question}
              className="rounded-3xl border border-[#76e6bd]/10 bg-black/70 p-6"
            >

              <h3 className="text-sm font-bold">
                {question}
              </h3>

              <p className="mt-3 text-sm leading-7 text-zinc-500">
                {answer}
              </p>

            </div>

          ))}

        </div>

      </section>

      {/* CTA */}

      <section className="relative z-10 mx-auto max-w-4xl px-4 py-20 text-center sm:px-8">

        <div className="rounded-[2rem] border border-[#76e6bd]/20 bg-gradient-to-b from-[#76e6bd]/15 to-black p-8 sm:p-12">

          <h2 className="text-3xl font-bold sm:text-4xl">
            Make every sentence better.
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-zinc-500">
            Fix mistakes, improve clarity and create writing
            that sounds clean and natural.
          </p>

          <a
            href="#generator"
            className="mt-7 inline-flex rounded-xl bg-[#c9ffe9] px-6 py-3 text-sm font-semibold text-black transition hover:bg-white"
          >
            Improve My Writing
          </a>

        </div>

      </section>

    {/* FOOTER */}

<footer className="relative z-10 border-t border-[#0f9f9c]/10 px-4 py-14">

  <div className="mx-auto w-full max-w-6xl">

    {/* RELATED TOOLS */}

    <div className="mb-12">

      <div className="mx-auto max-w-2xl text-center">

        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#0f9f9c]">
          Explore More
        </p>

        <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
          More AI Writing Tools
        </h2>

        <p className="mt-3 text-sm leading-7 text-zinc-500">
          Explore more AI-powered tools to write, improve and manage
          your emails and professional content.
        </p>

      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

        {/* AI EMAIL WRITER */}

        <a
          href="https://aiemailwriter.krishaiworks.com/"
          className="group rounded-2xl border border-white/5 bg-white/[0.025] p-5 transition hover:-translate-y-1 hover:border-[#0f9f9c]/20 hover:bg-[#0f9f9c]/[0.03]"
        >

          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#0f9f9c]/10 bg-[#0f9f9c]/10 text-lg">
            ✉️
          </div>

          <h3 className="mt-4 text-sm font-semibold text-white transition group-hover:text-[#0f9f9c]">
            AI Email Writer
          </h3>

          <p className="mt-2 text-xs leading-6 text-zinc-500">
            Write clear and professional emails quickly with AI.
          </p>

        </a>

        {/* AI GRAMMAR & WRITING FIXER */}

        <a
          href="https://aigrammarwritingfixer.krishaiworks.com/"
          className="group rounded-2xl border border-white/5 bg-white/[0.025] p-5 transition hover:-translate-y-1 hover:border-[#0f9f9c]/20 hover:bg-[#0f9f9c]/[0.03]"
        >

          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#0f9f9c]/10 bg-[#0f9f9c]/10 text-lg">
            ✍️
          </div>

          <h3 className="mt-4 text-sm font-semibold text-white transition group-hover:text-[#0f9f9c]">
            AI Grammar & Writing Fixer
          </h3>

          <p className="mt-2 text-xs leading-6 text-zinc-500">
            Fix grammar, spelling and improve your writing with AI.
          </p>

        </a>

        {/* AI TEXT HUMANIZER */}

        <a
          href="https://aitexthumanizer.krishaiworks.com/"
          className="group rounded-2xl border border-white/5 bg-white/[0.025] p-5 transition hover:-translate-y-1 hover:border-[#0f9f9c]/20 hover:bg-[#0f9f9c]/[0.03]"
        >

          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#0f9f9c]/10 bg-[#0f9f9c]/10 text-lg">
            ✨
          </div>

          <h3 className="mt-4 text-sm font-semibold text-white transition group-hover:text-[#0f9f9c]">
            AI Text Humanizer
          </h3>

          <p className="mt-2 text-xs leading-6 text-zinc-500">
            Make AI-generated text sound natural and human.
          </p>

        </a>

        {/* AI COVER LETTER GENERATOR */}

        <a
          href="https://aicoverlettergenerator.krishaiworks.com/"
          className="group rounded-2xl border border-white/5 bg-white/[0.025] p-5 transition hover:-translate-y-1 hover:border-[#0f9f9c]/20 hover:bg-[#0f9f9c]/[0.03]"
        >

          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#0f9f9c]/10 bg-[#0f9f9c]/10 text-lg">
            💼
          </div>

          <h3 className="mt-4 text-sm font-semibold text-white transition group-hover:text-[#0f9f9c]">
            AI Cover Letter Generator
          </h3>

          <p className="mt-2 text-xs leading-6 text-zinc-500">
            Create personalized cover letters for your job applications.
          </p>

        </a>

      </div>

    </div>

    {/* FOOTER MAIN */}

    <div className="border-t border-white/5 pt-8">

      <div className="flex flex-col items-center justify-between gap-5 text-center sm:flex-row sm:text-left">

        <div className="flex items-center gap-3">

          <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-[#0f9f9c]/20">

            <img
              src="/logo.png"
              alt="KrishAIWorks"
              className="h-full w-full rounded-full object-cover"
            />

          </div>

          <div>

            <p className="text-sm font-bold text-white">
              KrishAIWorks
            </p>

            <p className="text-xs text-zinc-600">
              AI Solutions That Work
            </p>

          </div>

        </div>

        <p className="text-xs text-zinc-600">
          © {new Date().getFullYear()} KrishAIWorks. All rights reserved.
        </p>

      </div>

    </div>

  </div>

</footer>
    </main>
  );
}