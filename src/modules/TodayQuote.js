import QuotesList from "@/data/QuotesList.js";

const localStorageKey = 'today-quote';

function getDayOfYear() {
  const date = new Date();
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date - start;
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

function getTodayQuote() {
  const day = getDayOfYear();
  const index = day % QuotesList.length;
  return QuotesList[index];
}

export const TodayQuote = getTodayQuote();
