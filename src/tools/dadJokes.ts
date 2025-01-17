import {z} from 'zod';
import type {ToolFn} from "../../types";
import fetch from "node-fetch";

interface DadJokeResponse {
    id: string;
    joke: string;
    status: number;
}

export const dadJokeToolDefinition = {
    name: 'dad_joke',
    description: `use this to get a dad joke`,
    parameters: z.object({}),
}

type Args = z.infer<typeof dadJokeToolDefinition.parameters>

export const getDadJoke: ToolFn<Args> = async () => {
    const response = await fetch('https://icanhazdadjoke.com/', {
        headers: {
            'Accept': 'application/json',
        },
    })
    const data = await response.json() as DadJokeResponse;
    return data.joke;
}