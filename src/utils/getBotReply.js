// Finds the best answer for a question. No real AI: it counts matching keywords.
import { chatbotData, fallbackReply } from '../data/chatbotData.js';

// Lowercase, remove apostrophes, and turn other punctuation into spaces.
function normalize(text) {
  return text
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// ["A", "B", "C"] becomes "A, B and C".
function joinNames(names) {
  if (names.length === 1) {
    return names[0];
  }

  return `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}`;
}

export function getBotReply(question, orders) {
  const text = normalize(question);

  let bestMatch = null;
  let bestScore = 0;

  // The entry with the most matching keywords wins.
  chatbotData.forEach((entry) => {
    const score = entry.keywords.filter((keyword) =>
      text.includes(keyword)
    ).length;

    if (score > bestScore) {
      bestScore = score;
      bestMatch = entry;
    }
  });

  if (!bestMatch) {
    return fallbackReply;
  }

  // "Last order" uses the customer's real newest order when there is one.
  if (bestMatch.id === 'last-order' && orders.length > 0) {
    const names = orders[0].items.map((item) => item.name);
    return `Your previous order was ${joinNames(names)}.`;
  }

  return bestMatch.response;
}