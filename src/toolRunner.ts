import type OpenAI from 'openai'
import {generateImage, generateImageToolDefinition} from "./tools/generateImage";
import {getDadJoke, dadJokeToolDefinition} from "./tools/dadJokes";
import {getRedditPost, redditToolDefinition} from "./tools/reddit";

export const runTool = async (toolCall: OpenAI.Chat.ChatCompletionMessageToolCall, userMessage: string) => {
    const functionArgs = {
        toolArgs: JSON.parse(toolCall.function.arguments) || {},
        userMessage
    }

    switch (toolCall.function.name) {
        case generateImageToolDefinition.name:
            return await generateImage(functionArgs)
        case dadJokeToolDefinition.name:
            return await getDadJoke(functionArgs)
        case redditToolDefinition.name:
            return await getRedditPost(functionArgs)
        default:
            throw new Error(`Unknown function: ${toolCall.function.name}`)
    }
}