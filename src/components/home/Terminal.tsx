"use client";

import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { useTranslation } from "@/lib/i18n/useTranslation";
import { useTheme, type Theme } from "@/lib/theme/useTheme";
import type { Locale } from "@/lib/i18n/config";

type LineKind = "input" | "output" | "error" | "success" | "system";

interface Line {
  kind: LineKind;
  text: string;
}

interface Section {
  id: string;
  cwd: string;
  aliases: string[];
}

const SECTIONS: Section[] = [
  { id: "top", cwd: "", aliases: ["inicio", "home", "top", "~", "\\", ".."] },
  { id: "sobre", cwd: "sobre", aliases: ["sobre", "about", "sobre-mi", "sobremi"] },
  { id: "proyectos", cwd: "proyectos", aliases: ["proyectos", "projects", "work", "trabajo"] },
  { id: "habilidades", cwd: "habilidades", aliases: ["habilidades", "skills"] },
  { id: "experiencia", cwd: "experiencia", aliases: ["experiencia", "experience", "exp"] },
  { id: "contacto", cwd: "contacto", aliases: ["contacto", "contact"] },
];

const PROMPT_BASE = "PS C:\\portfolio";

const COLORS: Record<LineKind, string> = {
  input: "#d4d4d4",
  output: "#d4d4d4",
  success: "#4ade80",
  error: "#f87171",
  system: "#9b9b9b",
};

function gotoSection(id: string) {
  if (id === "top") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

interface TerminalProps {
  autoBoot?: boolean;
  onBootStep?: (step: number) => void;
  onBootComplete?: () => void;
}

export function Terminal({ autoBoot = false, onBootStep, onBootComplete }: TerminalProps) {
  const { t, locale, setLocale, ready } = useTranslation();
  const { theme, setTheme } = useTheme();

  const [lines, setLines] = useState<Line[]>([]);
  const [value, setValue] = useState("");
  const [cwd, setCwd] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState<number | null>(null);
  const [booting, setBooting] = useState(autoBoot);

  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const prompt = `${PROMPT_BASE}${cwd ? "\\" + cwd : ""}>`;

  // Mensaje de bienvenida (una vez), salvo que arranquemos con la secuencia de boot.
  useEffect(() => {
    if (autoBoot || !ready) return;
    setLines([{ kind: "system", text: t("terminal.welcome") }]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready]);

  // Secuencia de boot automática: "escribe" y "ejecuta" un par de comandos
  // antes de entregarle el control al usuario. Espera a `ready` para no
  // arrancar con el idioma por defecto si el usuario tenía otro guardado.
  useEffect(() => {
    if (!autoBoot || !ready) return;
    let cancelled = false;

    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        window.setTimeout(resolve, ms);
      });

    async function typeText(text: string, speed = 32) {
      for (let i = 0; i <= text.length; i++) {
        if (cancelled) return;
        setValue(text.slice(0, i));
        await wait(speed);
      }
    }

    async function runBoot() {
      // Cada paso "programa" una parte del hero: en cuanto se imprime su
      // salida, `onBootStep` le avisa a Hero que revele esa sección.
      const steps: { cmd: string; outputs: Line[]; revealStep?: number }[] = [
        {
          cmd: t("terminal.boot.cmd1"),
          outputs: [{ kind: "output", text: t("terminal.boot.out1") }],
        },
        {
          cmd: t("terminal.boot.cmd2"),
          outputs: [{ kind: "success", text: t("terminal.boot.out2") }],
          revealStep: 0,
        },
        {
          cmd: t("terminal.boot.cmd3"),
          outputs: [{ kind: "success", text: t("terminal.boot.out3") }],
          revealStep: 1,
        },
        {
          cmd: t("terminal.boot.cmd4"),
          outputs: [{ kind: "success", text: t("terminal.boot.out4") }],
          revealStep: 2,
        },
        {
          cmd: t("terminal.boot.cmd5"),
          outputs: [{ kind: "system", text: t("terminal.boot.out5") }],
        },
      ];

      await wait(500);
      for (const step of steps) {
        if (cancelled) return;
        await typeText(step.cmd);
        if (cancelled) return;
        await wait(280);
        setLines((prev) => [...prev, { kind: "input", text: `${prompt} ${step.cmd}` }]);
        setValue("");
        for (const line of step.outputs) {
          await wait(220);
          if (cancelled) return;
          setLines((prev) => [...prev, line]);
        }
        if (step.revealStep !== undefined) onBootStep?.(step.revealStep);
        await wait(450);
      }
      if (cancelled) return;
      await wait(400);
      setBooting(false);
      onBootComplete?.();
    }

    runBoot();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoBoot, ready]);

  // Auto-scroll al fondo.
  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  function run(raw: string) {
    const input = raw.trim();
    const echo: Line = { kind: "input", text: `${prompt} ${input}` };

    if (!input) {
      setLines((prev) => [...prev, echo]);
      return;
    }

    const [cmdRaw, ...rest] = input.split(/\s+/);
    const cmd = cmdRaw.toLowerCase();
    const arg = (rest[0] ?? "").toLowerCase();
    const out: Line[] = [echo];

    switch (cmd) {
      case "help":
      case "ayuda":
        out.push(
          { kind: "output", text: t("terminal.help.title") },
          { kind: "output", text: "  help                " + t("terminal.help.help") },
          { kind: "output", text: "  dir                 " + t("terminal.help.dir") },
          { kind: "output", text: "  cd <seccion>        " + t("terminal.help.cd") },
          { kind: "output", text: "  theme <dark|light>  " + t("terminal.help.theme") },
          { kind: "output", text: "  lang <es|en>        " + t("terminal.help.lang") },
          { kind: "output", text: "  whoami              " + t("terminal.help.whoami") },
          { kind: "output", text: "  cls                 " + t("terminal.help.cls") }
        );
        break;

      case "dir":
      case "ls":
        out.push({ kind: "output", text: t("terminal.sectionsTitle") }, { kind: "output", text: "" });
        SECTIONS.filter((s) => s.id !== "top").forEach((s) => {
          out.push({
            kind: "output",
            text: `  <DIR>   ${s.cwd.padEnd(14)}${t("terminal.section." + s.id)}`,
          });
        });
        break;

      case "cd":
      case "goto": {
        if (!arg || arg === "\\" || arg === "..") {
          setCwd("");
          gotoSection("top");
          out.push({ kind: "success", text: `${t("terminal.navigating")} ${t("terminal.section.top")}` });
          break;
        }
        const sec = SECTIONS.find((s) => s.aliases.includes(arg));
        if (!sec) {
          out.push({ kind: "error", text: `${t("terminal.notFound")} '${arg}'` });
          break;
        }
        setCwd(sec.cwd);
        gotoSection(sec.id);
        out.push({ kind: "success", text: `${t("terminal.navigating")} ${t("terminal.section." + sec.id)}` });
        break;
      }

      case "theme":
      case "tema": {
        if (arg === "dark" || arg === "light") {
          setTheme(arg as Theme);
          out.push({ kind: "success", text: `${t("terminal.themeSet")} ${arg}` });
        } else if (!arg) {
          const next: Theme = theme === "dark" ? "light" : "dark";
          setTheme(next);
          out.push({ kind: "success", text: `${t("terminal.themeSet")} ${next}` });
        } else {
          out.push({ kind: "error", text: `${t("terminal.usage")} theme <dark|light>` });
        }
        break;
      }

      case "lang":
      case "idioma": {
        if (arg === "es" || arg === "en") {
          setLocale(arg as Locale);
          out.push({
            kind: "success",
            text: arg === "es" ? "Idioma cambiado a espanol (es)" : "Language set to English (en)",
          });
        } else if (!arg) {
          const next: Locale = locale === "es" ? "en" : "es";
          setLocale(next);
          out.push({
            kind: "success",
            text: next === "es" ? "Idioma cambiado a espanol (es)" : "Language set to English (en)",
          });
        } else {
          out.push({ kind: "error", text: `${t("terminal.usage")} lang <es|en>` });
        }
        break;
      }

      case "whoami":
        out.push({ kind: "output", text: t("terminal.boot.out1") });
        break;

      case "cls":
      case "clear":
        setLines([]);
        return;

      default:
        out.push({ kind: "error", text: `'${cmdRaw}' ${t("terminal.unknown")}` });
    }

    setLines((prev) => [...prev, ...out]);
  }

  function onKeyDown(e: ReactKeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      run(value);
      if (value.trim()) setHistory((h) => [...h, value.trim()]);
      setHistIdx(null);
      setValue("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const idx = histIdx === null ? history.length - 1 : Math.max(0, histIdx - 1);
      setHistIdx(idx);
      setValue(history[idx]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIdx === null) return;
      const idx = histIdx + 1;
      if (idx >= history.length) {
        setHistIdx(null);
        setValue("");
      } else {
        setHistIdx(idx);
        setValue(history[idx]);
      }
    }
  }

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className="overflow-hidden rounded-lg border border-line shadow-2xl"
      style={{ background: "#0c0c0c" }}
    >
      {/* Barra de título */}
      <div className="flex items-center justify-between px-3 py-2" style={{ background: "#2b2b2b" }}>
        <div className="flex items-center gap-2 font-mono text-[12px]" style={{ color: "#cfcfcf" }}>
          <span aria-hidden style={{ color: "#c4b5fd" }}>{">_"}</span>
          {t("terminal.windowTitle")}
        </div>
        <div className="flex items-center gap-3 text-[12px]" style={{ color: "#9b9b9b" }} aria-hidden>
          <span>&#9472;</span>
          <span>&#9633;</span>
          <span>&#10005;</span>
        </div>
      </div>

      {/* Cuerpo */}
      <div
        ref={bodyRef}
        className="h-[320px] overflow-y-auto px-4 py-3 font-mono text-[13px] leading-[1.55]"
        style={{ color: "#d4d4d4" }}
      >
        {lines.map((line, i) => (
          <div
            key={i}
            style={{ color: COLORS[line.kind], whiteSpace: "pre-wrap", wordBreak: "break-word" }}
          >
            {line.text || "\u00a0"}
          </div>
        ))}

        {/* Línea de entrada activa */}
        <div className="flex items-center">
          <span className="mr-2 shrink-0" style={{ color: "#c4b5fd" }}>{prompt}</span>
          <input
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDown}
            readOnly={booting}
            spellCheck={false}
            autoComplete="off"
            aria-label={t("terminal.inputAria")}
            className="min-w-0 flex-1 border-0 bg-transparent font-mono text-[13px] outline-none"
            style={{ color: "#d4d4d4", caretColor: "#c4b5fd" }}
          />
        </div>
      </div>
    </div>
  );
}