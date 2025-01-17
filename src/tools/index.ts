import { generateImageToolDefinition } from "./generateImage";
import { dadJokeToolDefinition } from "./dadJokes";  
import { redditToolDefinition } from "./reddit";

export const tools = [
    generateImageToolDefinition,
    dadJokeToolDefinition,
    redditToolDefinition
]