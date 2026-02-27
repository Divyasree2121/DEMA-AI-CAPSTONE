
/**
 * @fileOverview A client-side simulation for skin classification on static hosting.
 */

import { z } from 'zod';

const ClassifySkinConditionInputSchema = z.object({
  imageDataUri: z.string()
});
export type ClassifySkinConditionInput = z.infer<typeof ClassifySkinConditionInputSchema>;

const ClassifySkinConditionOutputSchema = z.object({
  predictedCondition: z.string(),
  confidenceScore: z.number(),
});
export type ClassifySkinConditionOutput = z.infer<typeof ClassifySkinConditionOutputSchema>;

export async function classifySkinCondition(
  input: ClassifySkinConditionInput
): Promise<ClassifySkinConditionOutput> {
  return { predictedCondition: "Benign", confidenceScore: 98.5 };
}
