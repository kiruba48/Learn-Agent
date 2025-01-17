import {z} from 'zod';
import type {ToolFn} from "../../types";
import fetch from "node-fetch";

export const redditToolDefinition = {
    name: 'reddit',
    description: `use this to get a latest reddit post`,
    parameters: z.object({}),
}

type Args = z.infer<typeof redditToolDefinition.parameters>

export const getRedditPost: ToolFn<Args> = async () => {
    try {
        const response = await fetch('https://www.reddit.com/r/AskMen/.json', {
            headers: {
                'Accept': 'application/json',
            },
        });

        const data = await response.json();

        const relevantData = data.data.children.map((child: any) => {
            if (!child?.data) {
                return null;
            }
            return {
                title: child.data.title,
                link: child.data.url,
                subreddit: child.data.subreddit_name_prefixed,
                author: child.data.author,
                upvotes: child.data.ups,
            };
        }).filter(Boolean);

        if (relevantData.length === 0) {
            throw new Error('No valid posts found');
        }

        return JSON.stringify(relevantData, null, 2);
    } catch (error) {
        return `Error fetching Reddit posts: ${error instanceof Error ? error.message : 'Unknown error'}`;
    }
}
