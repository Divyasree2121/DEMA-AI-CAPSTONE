
/**
 * @fileOverview A Genkit flow for preprocessing and analyzing a dermatoscopic skin image.
 *
 * - preprocessAnalyzeImage - A function that handles the image preprocessing, AI analysis, and classification process.
 * - PreprocessAnalyzeImageInput - The input type for the preprocessAnalyzeImage function.
 * - PreprocessAnalyzeImageOutput - The return type for the preprocessAnalyzeImage function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const PreprocessAnalyzeImageInputSchema = z.object({
  imageDataUri: z
    .string()
    .describe(
      "A dermatoscopic skin image, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type PreprocessAnalyzeImageInput = z.infer<typeof PreprocessAnalyzeImageInputSchema>;

const SkinConditionPredictionSchema = z.object({
  condition: z.string().describe('The name of the skin condition.'),
  score: z.number().min(0).max(100).describe('The confidence score for this condition, as a percentage (0-100).'),
});

const PreprocessAnalyzeImageOutputSchema = z.object({
  predictedCondition: z.string().describe('The AI-predicted primary skin condition.'),
  confidenceScore: z.number().min(0).max(100).describe('The confidence score for the primary predicted condition, as a percentage (0-100).'),
  explanation: z.string().describe('A brief clinical explanation (2-3 sentences) for the prediction based on observed visual features.'),
  allPredictions: z.array(SkinConditionPredictionSchema).describe('A list of all 10 skin conditions with their respective confidence scores.'),
  disclaimer: z.string().describe('A mandatory medical disclaimer.'),
});
export type PreprocessAnalyzeImageOutput = z.infer<typeof PreprocessAnalyzeImageOutputSchema>;

export async function preprocessAnalyzeImage(input: PreprocessAnalyzeImageInput): Promise<PreprocessAnalyzeImageOutput> {
  // Check if we are in a browser environment (Static Export)
  if (typeof window !== 'undefined') {
    console.warn('AI analysis is not supported on static hosting (GitHub Pages). Returning mock data.');
    return {
      predictedCondition: "Benign Lesion",
      confidenceScore: 98.5,
      explanation: "Analysis simulation: Visual features suggest a benign melanocytic lesion with regular pigment network. (Note: AI features require a server-side backend).",
      allPredictions: [
        { condition: "Benign Lesion", score: 98.5 },
        { condition: "Melanocytic Nevus", score: 1.0 },
        { condition: "Others", score: 0.5 }
      ],
      disclaimer: "STUB: This is a static simulation. AI features are disabled in this environment."
    };
  }
  return preprocessAnalyzeImageFlow(input);
}

const classifyImagePrompt = ai.definePrompt({
  name: 'classifyImagePrompt',
  input: { schema: PreprocessAnalyzeImageInputSchema },
  output: { schema: PreprocessAnalyzeImageOutputSchema },
  prompt: `You are an expert AI-assisted decision-support tool for dermatological analysis. Your task is to classify a dermatoscopic skin image across 10 specific skin conditions.
  
  Based on the provided image, analyze visual features such as color variation, texture patterns, lesion shape, and border irregularities to provide a classification.
  
  You must output:
  1. A primary predicted skin condition.
  2. Its confidence score (as a percentage).
  3. A brief clinical explanation (2-3 sentences) for why this condition was predicted based on the visual features observed.
  4. Confidence scores for all 10 listed conditions. Ensure the sum of all scores for a given image equals 100%.

  The 10 skin conditions are:
  - Eczema, Warts, Melanoma, Atopic Dermatitis, Basal Cell Carcinoma, Melanocytic Nevus, Benign Lesion, Psoriasis, Seborrheic Keratosis, Tinea.

  Image for analysis: {{media url=imageDataUri}}
  `,
});

const preprocessAnalyzeImageFlow = ai.defineFlow(
  {
    name: 'preprocessAnalyzeImageFlow',
    inputSchema: PreprocessAnalyzeImageInputSchema,
    outputSchema: PreprocessAnalyzeImageOutputSchema,
  },
  async (input) => {
    const { output } = await classifyImagePrompt(input);
    return output!;
  }
);
