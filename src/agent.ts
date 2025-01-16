import type { AIMessage } from "../types"
import { llm } from "./llm"
import { addMessages, getMessages, saveToolResponse } from "./memory"
import { runTool } from "./toolRunner"
import { logMessage, showLoader } from "./ui"


export const agent = async ({ userMessage, tools }: {userMessage: string, tools: any[]}) => {
    await addMessages([{
        role: 'user',
        content: userMessage
    }])

    const loader = showLoader('🤔')

    while(true) {
        const history = await getMessages()

        const response = await llm({
            messages: history,
            tools
        })

        await addMessages([response])

        if(response.content) {
            loader.stop()
            logMessage(response)
            return getMessages();
        }

        if(response.tool_calls) {
            // If it is parallel_tool_calls, run all tools:
            // const toolResponses = await Promise.all(
            //     response.tool_calls.map(toolCall => runTool(toolCall, userMessage))
            // )
            const toolCall = response.tool_calls[0]
            logMessage(response)
            loader.update(`executing: ${toolCall.function.name}`)
            // If it is not parallel_tool_calls, run the first tool:
            const toolResponse = await runTool(toolCall, userMessage)
    
            await saveToolResponse(toolCall.id, toolResponse)
            loader.update(`executed: ${toolCall.function.name}`)
        }
    }
}