import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatReferences(ref: string) {
  return ref.split(",").map((item) => {
    const [name, phone, relationship] = item.trim().split("-");
    return { name, phone, relationship };
  });
}
