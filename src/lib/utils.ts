import { clsx } from 'clsx';

/**
 * Concatenate class names intelligently, merging Tailwind classes when necessary.
 * This helper mirrors the `cn` utility from the shadcn/ui library.
 */
export function cn(...inputs: ClassValue[]) {
  // In the absence of tailwind-merge we simply join classes with clsx.
  return clsx(inputs);
}

// Type used by clsx (avoid importing types from the library directly in other files)
type ClassValue = string | number | boolean | null | undefined | ClassDictionary | ClassArray;
interface ClassDictionary {
  [id: string]: any;
}
interface ClassArray extends Array<ClassValue> {}