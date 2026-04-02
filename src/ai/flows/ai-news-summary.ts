'use server';

/**
 * @fileOverview AI-powered news summarization flow.
 *
 * - summarizeArticle - A function that summarizes a news article and determines if the full article should be rendered.
 * - SummarizeArticleInput - The input type for the summarizeArticle function.
 * - SummarizeArticleOutput - The return type for the summarizeArticle function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeArticleInputSchema = z.object({
  articleTitle: z.string().describe('The title of the news article.'),
  articleContent: z.string().describe('The full content of the news article.'),
});
export type SummarizeArticleInput = z.infer<typeof SummarizeArticleInputSchema>;

const SummarizeArticleOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the news article.'),
  shouldRenderFullArticle: z
    .boolean() 
    .describe(
      'Whether the full article should be rendered based on the information density of the summary.'
    ),
});
export type SummarizeArticleOutput = z.infer<typeof SummarizeArticleOutputSchema>;

export async function summarizeArticle(input: SummarizeArticleInput): Promise<SummarizeArticleOutput> {
  return summarizeArticleFlow(input);
}

const summarizeArticlePrompt = ai.definePrompt({
  name: 'summarizeArticlePrompt',
  input: {schema: SummarizeArticleInputSchema},
  output: {schema: SummarizeArticleOutputSchema},
  prompt: `You are an AI that summarizes political news articles. Your goal is to provide a concise summary and determine if the full article is necessary based on the information provided.

Article Title: {{{articleTitle}}}
Article Content: {{{articleContent}}}

Summary:
{{summary}}

Based on the summary, determine if the full article should be rendered. If the summary provides sufficient information to understand the main points of the article, then the shouldRenderFullArticle should be false. Otherwise it should be true.

Should Render Full Article: {{shouldRenderFullArticle}}`,
});

const summarizeArticleFlow = ai.defineFlow(
  {
    name: 'summarizeArticleFlow',
    inputSchema: SummarizeArticleInputSchema,
    outputSchema: SummarizeArticleOutputSchema,
  },
  async input => {
    const {output} = await summarizeArticlePrompt(input);
    return output!;
  }
);
