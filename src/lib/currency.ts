"use client";

import { useSyncExternalStore } from "react";
import { CURRENCIES, type Currency } from "./pricing";

/**
 * Shared currency state (FR-2). Defaults from the browser locale and can be
 * overridden manually; the override is a per-viewer convenience kept in
 * localStorage. Every price on the page subscribes to the same store.
 */
const STORAGE_KEY = "stackd.currency";
const SERVER_DEFAULT: Currency = "GBP";

const EURO_REGIONS = new Set([
  "AT", "BE", "CY", "DE", "EE", "ES", "FI", "FR", "GR", "HR", "IE", "IT",
  "LT", "LU", "LV", "MT", "NL", "PT", "SI", "SK", "AD", "MC", "SM", "VA", "ME", "XK",
]);
const GBP_REGIONS = new Set(["GB", "IM", "JE", "GG"]);

let current: Currency | null = null;
const listeners = new Set<() => void>();

export function toCurrency(value: unknown): Currency | null {
  if (typeof value !== "string") return null;
  const upper = value.toUpperCase();
  return (CURRENCIES as readonly string[]).includes(upper) ? (upper as Currency) : null;
}

export function currencyForLocale(tag: string): Currency | null {
  try {
    const region = new Intl.Locale(tag).maximize().region;
    if (!region) return null;
    if (GBP_REGIONS.has(region)) return "GBP";
    if (EURO_REGIONS.has(region)) return "EUR";
    if (region === "US") return "USD";
  } catch {
    /* invalid tag */
  }
  return null;
}

function detect(): Currency {
  const tags = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const tag of tags) {
    const match = currencyForLocale(tag);
    if (match) return match;
  }
  return SERVER_DEFAULT;
}

function readStored(): Currency | null {
  try {
    return toCurrency(localStorage.getItem(STORAGE_KEY));
  } catch {
    return null;
  }
}

export function getCurrency(): Currency {
  if (!current) current = readStored() ?? detect();
  return current;
}

export function setCurrency(next: Currency) {
  if (next === current) return;
  current = next;
  try {
    localStorage.setItem(STORAGE_KEY, next);
  } catch {
    /* storage unavailable: still works for this page view */
  }
  listeners.forEach((fn) => fn());
}

function subscribe(fn: () => void) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

export function useCurrency(): Currency {
  return useSyncExternalStore(subscribe, getCurrency, () => SERVER_DEFAULT);
}
