'use server';

/**
 * @fileOverview A flow that uses Genkit to summarize the top-weighted ideas from the Idea Pool.
 *
 * - summarizeTopIdeas - A function that takes an array of ideas and returns a summary of each.
 * - SummarizeTopIdeasInput - The input type for the summarizeTopIdeas function.
 * - SummarizeTopIdeasOutput - The return type for the summarizeTopIdeas function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeTopIdeasInputSchema = z.object({
  ideas: z.array(
    z.object({
      text: z.string().describe('The text of the idea.'),
      author: z.string().describe('The author of the idea.'),
      weight: z.number().describe('The weight of the idea.'),
    })
  ).describe('An array of idea objects to summarize.'),
});
export type SummarizeTopIdeasInput = z.infer<typeof SummarizeTopIdeasInputSchema>;

const SummarizeTopIdeasOutputSchema = z.array(
  z.object({
    ideaId: z.number().describe('The index of the idea in the input array.'),
    summary: z.string().describe('A concise summary of the idea.'),
  })
);
export type SummarizeTopIdeasOutput = z.infer<typeof SummarizeTopIdeasOutputSchema>;

export async function summarizeTopIdeas(input: SummarizeTopIdeasInput): Promise<SummarizeTopIdeasOutput> {
  return summarizeTopIdeasFlow(input);
}

const summarizeIdeaPrompt = ai.definePrompt({
  name: 'summarizeIdeaPrompt',
  input: {
    schema: z.object({
      text: z.string().describe('The text of the idea.'),
    }),
  },
  output: {
    schema: z.object({
      summary: z.string().describe('A concise summary of the idea.'),
    }),
  },
  prompt: `Summarize the following idea in one sentence:\n\n{{text}}`,
});

const summarizeTopIdeasFlow = ai.defineFlow(
  {
    name: 'summarizeTopIdeasFlow',
    inputSchema: SummarizeTopIdeasInputSchema,
    outputSchema: SummarizeTopIdeasOutputSchema,
  },
  async input => {
    const summaries = await Promise.all(
      input.ideas.map(async (idea, index) => {
        const {output} = await summarizeIdeaPrompt({text: idea.text});
        return {
          ideaId: index,
          summary: output!.summary,
        };
      })
    );
    return summaries;
  }
);
