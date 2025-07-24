import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// 🎨 HYVE DYNAMICS BRAND UTILITIES
export const hyveColors = {
  background: "#F4F2F3",
  content: "#CDE2E7", 
  accent: "#7FB3BE",
  text: "#166088",
  header: "#102542",
} as const

export type HyveColor = keyof typeof hyveColors

// Font mapping for easy reference
export const hyveFonts = {
  heading: 'font-heading', // Peach Classy
  body: 'font-body',       // Poppins
  ui: 'font-sans',         // Moto Sans
} as const
