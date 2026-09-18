import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Whole dollars print without cents ($55), otherwise two decimals ($39.99). */
export function formatPrice(n: number) {
  return Number.isInteger(n) ? `$${n}` : `$${n.toFixed(2)}`
}

export function savePercent(price: number, original: number) {
  return Math.round((1 - price / original) * 100)
}
