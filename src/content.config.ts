import { defineCollection, z } from 'astro:content';

const countries = defineCollection({
    loader: async () => {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();

        return data.map((country: any) => ({
            id: country.cca3,
            ...country,
        }));
    },
    schema: z.object({
        id: z.string(),
        cca3: z.string()
    })
});

const notes = defineCollection({
    loader: async () => {
        const response = await fetch("https://api.github.com/repos/datonic/hub/contents/notes");
        const data = await response.json();

        // Filter to only include markdown files
        const markdownFiles = data.filter((file: any) => file.name.endsWith('.md'));

        // Map to a more usable format
        return markdownFiles.map((file: any) => ({
            id: file.name.replace('.md', ''),
            name: file.name,
            path: file.path,
            url: file.html_url,
            download_url: file.download_url,
            size: file.size,
            sha: file.sha
        }));
    },
    schema: z.object({
        id: z.string(),
        name: z.string(),
        path: z.string(),
        url: z.string(),
        download_url: z.string(),
        size: z.number(),
        sha: z.string()
    })
});

export const collections = { countries, notes };
