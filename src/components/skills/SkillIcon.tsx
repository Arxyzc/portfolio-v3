import type { IconType } from "react-icons";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiGreensock,
  SiFramer,
  SiNodedotjs,
  SiExpress,
  SiPostgresql,
  SiPython,
  SiMysql,
  SiGit,
  SiDocker,
  SiVercel,
  SiFigma,
  SiVitest,
} from "react-icons/si";
import { FaAws } from "react-icons/fa6";

const icons: Record<string, IconType> = {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiGreensock,
  SiFramer,
  SiNodedotjs,
  SiExpress,
  SiPostgresql,
  SiPython,
  SiMysql,
  SiGit,
  SiDocker,
  SiVercel,
  SiFigma,
  SiVitest,
  FaAws,
};

export function SkillIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Icon = icons[name];

  if (!Icon) return null;

  return <Icon className={className} aria-hidden />;
}
