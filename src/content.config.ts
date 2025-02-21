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

export const collections = { countries };
