'use server';

/**
 * @fileOverview This file defines a Genkit flow for designing personalized digital membership cards using AI.
 *
 * The flow takes a description of the desired card design and generates an image of a membership card.
 * The file exports:
 * - `designMembershipCard`: A function that triggers the membership card design flow.
 * - `MembershipCardDesignInput`: The input type for the designMembershipCard function.
 * - `MembershipCardDesignOutput`: The output type for the designMembershipCard function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import wav from 'wav';

const MembershipCardDesignInputSchema = z.object({
  description: z
    .string()
    .describe(
      'A detailed description of the desired membership card design, including theme, colors, and any specific elements to include.'
    ),
});
export type MembershipCardDesignInput = z.infer<typeof MembershipCardDesignInputSchema>;

const MembershipCardDesignOutputSchema = z.object({
  cardImageDataUri: z
    .string()
    .describe(
      'The image data URI of the generated membership card, in a format suitable for display in a web browser.'
    ),
});
export type MembershipCardDesignOutput = z.infer<typeof MembershipCardDesignOutputSchema>;

export async function designMembershipCard(input: MembershipCardDesignInput): Promise<MembershipCardDesignOutput> {
  return membershipCardDesignFlow(input);
}

const membershipCardPrompt = ai.definePrompt({
  name: 'membershipCardPrompt',
  input: {schema: MembershipCardDesignInputSchema},
  output: {schema: MembershipCardDesignOutputSchema},
  prompt: `You are an AI-powered graphic designer specializing in membership card design.

  Based on the user's description, generate an image of a digital membership card.
  The card should reflect the party's identity and the user's preferences.

  Description: {{{description}}}

  Return the image as a data URI.
  `,
});

const membershipCardDesignFlow = ai.defineFlow(
  {
    name: 'membershipCardDesignFlow',
    inputSchema: MembershipCardDesignInputSchema,
    outputSchema: MembershipCardDesignOutputSchema,
  },
  async input => {
    const {media} = await ai.generate({
      model: 'googleai/imagen-4.0-fast-generate-001',
      prompt: input.description,
    });
    if (!media) {
      throw new Error('no media returned');
    }
    return {cardImageDataUri: media.url!};
  }
);
