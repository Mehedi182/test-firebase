// categorize-transactions.ts
'use server';

/**
 * @fileOverview This file defines a Genkit flow to categorize transactions using AI.
 *
 * - categorizeTransaction - A function that categorizes a transaction based on its description.
 * - CategorizeTransactionInput - The input type for the categorizeTransaction function.
 * - CategorizeTransactionOutput - The return type for the categorizeTransaction function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CategorizeTransactionInputSchema = z.object({
  description: z
    .string()
    .describe('The description of the transaction to categorize.'),
  exampleCategories: z
    .array(z.string())
    .optional()
    .describe(
      'A list of example categories to help the AI categorize the transaction.'
    ),
});
export type CategorizeTransactionInput = z.infer<typeof CategorizeTransactionInputSchema>;

const CategorizeTransactionOutputSchema = z.object({
  category: z
    .string()
    .describe('The predicted category of the transaction.'),
  confidence: z
    .number()
    .describe('The confidence level of the categorization (0-1).'),
});
export type CategorizeTransactionOutput = z.infer<typeof CategorizeTransactionOutputSchema>;

export async function categorizeTransaction(
  input: CategorizeTransactionInput
): Promise<CategorizeTransactionOutput> {
  return categorizeTransactionFlow(input);
}

const categorizeTransactionPrompt = ai.definePrompt({
  name: 'categorizeTransactionPrompt',
  input: {schema: CategorizeTransactionInputSchema},
  output: {schema: CategorizeTransactionOutputSchema},
  prompt: `You are a personal finance expert classifying transactions into categories.

  Your job is to classify the provided transaction description into one of the provided categories, using your best judgement.
  If no categories are provided, come up with one yourself. Output a confidence level from 0 to 1 on how accurate you think your classification is.

  Transaction Description: {{{description}}}
  Categories: {{#if exampleCategories}}{{#each exampleCategories}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}{{else}}No categories provided.{{/if}}
  `,
});

const categorizeTransactionFlow = ai.defineFlow(
  {
    name: 'categorizeTransactionFlow',
    inputSchema: CategorizeTransactionInputSchema,
    outputSchema: CategorizeTransactionOutputSchema,
  },
  async input => {
    const {output} = await categorizeTransactionPrompt(input);
    return output!;
  }
);
