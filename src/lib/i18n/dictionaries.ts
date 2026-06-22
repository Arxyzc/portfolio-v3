import en from "@/lib/translations/en.json";
import es from "@/lib/translations/es.json";
import type { Locale } from "./config";

export type Messages = { [key: string]: string | Messages };

export const dictionaries: Record<Locale, Messages> = { es, en };
