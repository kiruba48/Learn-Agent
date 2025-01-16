import type OpenAI from 'openai'

const getWeather = async (): Promise<string> => {
    return new Promise<string>((resolve) => 
        setTimeout(() => resolve('hot, 90deg'), 1000)
    )
}

export const runTool = async (toolCall: OpenAI.Chat.ChatCompletionMessageToolCall, userMessage: string) => {
    const functionArgs = {
        toolArgs: JSON.parse(toolCall.function.arguments) || {},
        userMessage
    }

    switch (toolCall.function.name) {
        case 'get_weather':
            return await getWeather()
        default:
            throw new Error(`Unknown function: ${toolCall.function.name}`)
    }
}