"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { likertLabels, modes, questionsForMode, type Likert, type Mode } from "@/lib/quiz";
import { SCORING_VERSION, scoreQuiz, type AnswerMap, type ResultProfile } from "@/lib/scoring";

const progressKey = "gmp.quiz.progress";
const resultKey = "gmp.quiz.results";
const currentResultKey = "gmp.quiz.currentResult";
const latestResultIdKey = "gmp.quiz.latestResultId";

type StoredProgress = {
  scoringVersion?: number;
  mode: Mode;
  current: number;
  answers: AnswerMap;
  started: boolean;
};

const modelIntro = [
  ["Big Five", "Broad traits: openness, conscientiousness, extraversion, agreeableness, and emotional stability."],
  ["HEXACO", "A six-factor lens that adds honesty-humility and emotionality for extra nuance."],
  ["16-Type", "A preference estimate for energy, information, decision style, and structure."],
  ["Enneagram", "A motivation-style estimate for stress patterns, values, and growth themes."]
] as const;

function track(event: string, params: Record<string, string | number> = {}) {
  if (typeof window === "undefined") return;
  const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
  gtag?.("event", event, params);
}

function saveResult(result: ResultProfile) {
  const existing = window.localStorage.getItem(resultKey);
  let parsed: Record<string, ResultProfile> = {};

  if (existing) {
    try {
      parsed = JSON.parse(existing) as Record<string, ResultProfile>;
    } catch {
      parsed = {};
    }
  }

  parsed[result.resultId] = result;
  window.localStorage.setItem(resultKey, JSON.stringify(parsed));
  window.localStorage.setItem(currentResultKey, JSON.stringify(result));
  window.localStorage.setItem(latestResultIdKey, result.resultId);
  window.sessionStorage.setItem(currentResultKey, JSON.stringify(result));
}

function scrollToQuizTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export function QuizClient() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("standard");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [started, setStarted] = useState(false);
  const [isPreparingResult, setIsPreparingResult] = useState(false);
  const activeQuestions = useMemo(() => questionsForMode(mode), [mode]);
  const question = activeQuestions[current];
  const answeredCount = Object.keys(answers).length;
  const progress = Math.round((answeredCount / activeQuestions.length) * 100);

  useEffect(() => {
    const saved = window.localStorage.getItem(progressKey);
    if (!saved) return;
    try {
      const parsed = JSON.parse(saved) as StoredProgress;
      if (parsed.scoringVersion !== SCORING_VERSION) {
        window.localStorage.removeItem(progressKey);
        return;
      }
      // Restoring browser-only quiz progress after hydration is intentional here.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMode(parsed.mode);
      setCurrent(parsed.current);
      setAnswers(parsed.answers);
      setStarted(parsed.started);
    } catch {
      window.localStorage.removeItem(progressKey);
    }
  }, []);

  useEffect(() => {
    const progressState: StoredProgress = { scoringVersion: SCORING_VERSION, mode, current, answers, started };
    window.localStorage.setItem(progressKey, JSON.stringify(progressState));
  }, [mode, current, answers, started]);

  function chooseMode(nextMode: Mode) {
    setMode(nextMode);
    setCurrent(0);
    setAnswers({});
    track("select_quiz_mode", { mode: nextMode });
  }

  function finish(nextAnswers: AnswerMap) {
    const result = scoreQuiz(mode, nextAnswers);
    saveResult(result);
    window.localStorage.removeItem(progressKey);
    track("complete_test", { mode, confidence: result.confidence });
    setIsPreparingResult(true);
    scrollToQuizTop();
    window.setTimeout(() => {
      router.push(`/personality-test/results?resultId=${encodeURIComponent(result.resultId)}`);
    }, 3000);
  }

  function chooseAnswer(value: Likert) {
    const nextAnswers = { ...answers, [question.id]: value };
    setAnswers(nextAnswers);
    track("answer_question", { mode, question_id: question.id, value });

    window.setTimeout(() => {
      if (current < activeQuestions.length - 1) {
        setCurrent((questionIndex) => Math.min(questionIndex + 1, activeQuestions.length - 1));
        scrollToQuizTop();
        return;
      }

      finish(nextAnswers);
    }, 160);
  }

  function back() {
    setCurrent((value) => Math.max(0, value - 1));
    scrollToQuizTop();
  }

  if (isPreparingResult) {
    return (
      <div className="quiz-shell">
        <section className="card loading-card">
          <p className="eyebrow">Preparing your report</p>
          <h1>Your profile is coming together</h1>
          <p>We are turning your answers into clear trait scores, type notes, and practical ideas.</p>
          <div className="loading-bar" aria-label="Preparing result">
            <span />
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="quiz-shell">
      {!started ? (
        <div className="card quiz-intro">
          <p className="eyebrow">One integrated test</p>
          <h1>Before you start</h1>
          <p>
            Great Mind Profile uses one quiz to estimate several personality lenses. You will not take four separate
            tests; these models combine into one result page.
          </p>
          <div className="model-list">
            {modelIntro.map(([title, description]) => (
              <div className="model-row" key={title}>
                <strong>{title}</strong>
                <span>{description}</span>
              </div>
            ))}
          </div>
          <h2>Choose your depth</h2>
          <div className="card-grid" style={{ marginTop: 18 }}>
            {(Object.keys(modes) as Mode[]).map((modeKey) => (
              <button
                className={`${mode === modeKey ? "button" : "secondary-button"} depth-choice depth-${modeKey}`}
                key={modeKey}
                onClick={() => chooseMode(modeKey)}
                type="button"
              >
                {modes[modeKey].label} - {modes[modeKey].minutes}
              </button>
            ))}
          </div>
          <p style={{ marginTop: 16 }}>
            {modes[mode].description} Progress saves locally in your browser. No login required.
          </p>
          <div className="button-row start-action">
            <button
              className="button"
              onClick={() => {
                setCurrent(0);
                setAnswers({});
                setStarted(true);
                scrollToQuizTop();
                track("start_test", { mode });
              }}
              type="button"
            >
              Start quiz
            </button>
          </div>
        </div>
      ) : (
        <div className="card quiz-question">
          <div className="trait-label">
            <span>
              Question {current + 1} of {activeQuestions.length}
            </span>
            <span>{progress}%</span>
          </div>
          <div className="progress" aria-label="Quiz progress">
            <span style={{ width: `${progress}%` }} />
          </div>
          <h1>{question.text}</h1>
          <div className="likert" role="group" aria-label="Answer scale">
            {likertLabels.map((label, index) => {
              const value = (index + 1) as Likert;
              return (
                <button
                  aria-pressed={answers[question.id] === value}
                  key={label}
                  onClick={() => chooseAnswer(value)}
                  type="button"
                >
                  {label}
                </button>
              );
            })}
          </div>
          <div className="button-row">
            <button className="secondary-button" disabled={current === 0} onClick={back} type="button">
              Previous
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
