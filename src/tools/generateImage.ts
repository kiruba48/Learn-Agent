import {z} from 'zod';
import type {ToolFn} from "../../types";
import {openai} from "../ai";


export const generateImageToolDefinition = {
    name: 'generate_image',
    description: `use this to generate an image`,
    parameters: z.object({
        prompt: z.string().describe(`prompt for the image, Be sure to consider the user's original message
            when makeing the prompt. If you are unsure how to format the prompt, please ask the user for more information.`),
    }),
}

type Args = z.infer<typeof generateImageToolDefinition.parameters>

export const generateImage: ToolFn<Args> = async ({toolArgs, userMessage}) => {
    const response = await openai.images.generate({
        model: 'dall-e-3', 
        prompt: toolArgs.prompt,
        n: 1,
        size: '1024x1024',
    });
    return response.data[0].url;
}