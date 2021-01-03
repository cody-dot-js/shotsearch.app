import { randomSuggestion } from "lib/suggestions";
import type { NextApiRequest, NextApiResponse } from "next";

export type SuggestionApiResponse = {
  suggestion: string;
};

export default (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ suggestion: randomSuggestion() });
};
