import type { AIMessage } from '../types';
import { openai } from './ai';
import {zodFunction} from 'openai/helpers/zod';

export const llm = async ({ messages, tools }: {messages: AIMessage[], tools: any[]}) => {
    const formattedTools = tools.map(zodFunction)
    const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages,
        tools: formattedTools,
        tool_choice: 'auto',
        parallel_tool_calls: false,
    });
    return response.choices[0].message
}