import fs from 'fs/promises';
import path from 'path';
import type { PortfolioData, Project, ThemeConfig, Language, LocaleData } from '@/types/portfolio';

// A map to cache data for each language
const dataCache = new Map<Language, LocaleData>();
let cachedTheme: ThemeConfig | null = null;

export async function getThemeConfig(): Promise<ThemeConfig> {
    if (cachedTheme) {
        return cachedTheme;
    }

    const filePath = path.join(process.cwd(), 'public', 'config', 'theme.json');
    try {
        const jsonData = await fs.readFile(filePath, 'utf-8');
        cachedTheme = JSON.parse(jsonData);
        return cachedTheme!;
    } catch (error) {
        console.error("Could not read or parse theme.json", error);
        // Return default theme
        return {
            colors: {
                primary: { "500": "#2196f3" },
                secondary: { "500": "#9c27b0" },
                accent: { "500": "#009688" },
                neutral: { "500": "#9e9e9e" }
            },
            typography: {
                fontFamily: {
                    sans: ["Inter", "system-ui", "sans-serif"],
                    headline: ["Poppins", "system-ui", "sans-serif"]
                }
            },
            spacing: {},
            shadows: {},
            borderRadius: {}
        };
    }
}

export async function getLocaleData(locale: Language = 'en'): Promise<LocaleData> {
    if (dataCache.has(locale)) {
        return dataCache.get(locale)!;
    }

    const filePath = path.join(process.cwd(), 'public', 'locales', `${locale}.json`);
    try {
        const jsonData = await fs.readFile(filePath, 'utf-8');
        const data = JSON.parse(jsonData);
        dataCache.set(locale, data);
        return data;
    } catch (error) {
        console.error(`Could not read or parse ${locale}.json`, error);
        // Fallback to English
        if (locale !== 'en') {
            return getLocaleData('en');
        }
        // Return empty structure if even English fails
        return {
            displayName: "English",
            navigation: {},
            personal: {},
            about: {},
            sections: {},
            footer: {}
        } as unknown as LocaleData;
    }
}

export async function getPortfolioData(lang: Language = 'en'): Promise<PortfolioData> {
    const localeData = await getLocaleData(lang);
    const theme = await getThemeConfig();
    return {
        ...localeData,
        theme
    };
}

export async function getProjectBySlug(slug: string, lang: Language = 'en'): Promise<Project | undefined> {
    const data = await getLocaleData(lang);
    return data.projects?.find((p) => p.slug === slug);
}

export async function getAllProjectSlugs(lang: Language = 'en'): Promise<{ slug: string }[]> {
    const data = await getLocaleData(lang);
    return data.projects?.map((p) => ({ slug: p.slug })) || [];
}

export async function getAvailableLocales(): Promise<string[]> {
    try {
        const localesDir = path.join(process.cwd(), 'public', 'locales');
        const files = await fs.readdir(localesDir);
        return files
            .filter(file => file.endsWith('.json'))
            .map(file => file.replace('.json', ''));
    } catch (error) {
        console.error("Could not read locales directory", error);
        return ['en'];
    }
}
