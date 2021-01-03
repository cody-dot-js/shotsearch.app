import { sample } from "./sample";

export const suggestions = [
  "pacific northwest",
  "fast cars",
  "retrowave",
  "bitcoin",
  "web development",
  "programming",
  "coffee",
  "nature",
  "artisan bread",
  "food",
  "double rainbow",
  "lovecraft",
  "soccer",
  "football",
  "family",
  "love",
  "bugs",
  "ships",
  "blue sky",
  "fruit",
];

export const randomSuggestion = (): string => sample(suggestions);
