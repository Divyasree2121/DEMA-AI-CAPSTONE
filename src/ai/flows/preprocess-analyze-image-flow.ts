
/**
 * @fileOverview A client-side simulation for image analysis on static hosting.
 */

import { z } from 'zod';

const PreprocessAnalyzeImageInputSchema = z.object({
  imageDataUri: z.string(),
});
export type PreprocessAnalyzeImageInput = z.infer<typeof PreprocessAnalyzeImageInputSchema>;

const SkinConditionPredictionSchema = z.object({
  condition: z.string(),
  score: z.number(),
});

const PreprocessAnalyzeImageOutputSchema = z.object({
  predictedCondition: z.string(),
  confidenceScore: z.number(),
  explanation: z.string(),
  allPredictions: z.array(SkinConditionPredictionSchema),
  disclaimer: z.string(),
});
export type PreprocessAnalyzeImageOutput = z.infer<typeof PreprocessAnalyzeImageOutputSchema>;

/**
 * Simulates AI analysis for static environments like GitHub Pages.
 */
export async function preprocessAnalyzeImage(input: PreprocessAnalyzeImageInput): Promise<PreprocessAnalyzeImageOutput> {
  // Artificial delay for UI realism
  await new Promise(r => setTimeout(r, 1500));

  return {
    predictedCondition: "Benign Melanocytic Lesion",
    confidenceScore: 94.2,
    explanation: "The analysis shows a symmetric lesion with uniform pigment distribution. No signs of architectural disorder or atypical network patterns were detected in the dermatoscopic image provided.",
    allPredictions: [
      { condition: "Benign Lesion", score: 94.2 },
      { condition: "Melanocytic Nevus", score: 4.1 },
      { condition: "Seborrheic Keratosis", score: 1.2 },
      { condition: "Others", score: 0.5 }
    ],
    disclaimer: "MEDICAL DISCLAIMER: This analysis is a research-only simulation provided by Derm-AI 🏥. It does not constitute medical advice or a professional diagnosis. Please consult a board-certified dermatologist for clinical evaluation."
  };
}
