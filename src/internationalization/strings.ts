import { en } from "./en";

/**
 * The languages supported by the {@link App}.
 * 
 * @author Tristan J Berto <hello@tristanberto.com>
 */
export enum Language
{
	/** The Engligh language: Freedom Edition. */
	EN = "en"
};

/**
 * Remove leading and trailing whitespace from each line of a string.
 * 
 * @param multiline 
 *   A string, generally only used with multiline template literals.
 * @returns 
 *   The string with new lines and their leading/ trailing space removed.
 * @author Tristan J Berto <hello@tristanberto.com>
 */
export const multiline = (multiline: string) =>
	multiline.replaceAll(/( |\t)*\n( |\t)*/g, " ").trim();

/**
 * A complete set of translations for the {@link App}.
 * 
 * @author Tristan J Berto <hello@tristanberto.com>
 */
export interface WebsiteStrings
{
	/** A few words identifying the site. */
	longName: string;

	/** A one-line value proposition. */
	shortPitch: string;

	/** The text appearing before the first GitHub link. */
	githubCta1: string;

	/** The text appearing before the second GitHub link. */
	githubCta2: string;

	/** The copyright text. */
	copyright: string;

	/** General content appearing only on the front page. */
	frontPage:
	{
		/** Roughly 1-3 paragraphs introducing Avail. */
		introduction: string[];

		/** The heading text for the examples section. */
		examplesLabel: string;
	};

	/** 
	 * Content appearing only around code examples.
	 * 
	 * The code sample text is not included here, but may be added
	 * in the future if the code samples themselves are to support
	 * internationalization. 
	 */
	codeExamples:
	{
		/** The paragrah(s) before the first code example. */
		exampleOneIntroduction: string[];

		/** The paragrah(s) before the second code example. */
		exampleTwoIntroduction: string[];

		/** The paragrah(s) before the third code example. */
		exampleThreeIntroduction: string[];
	};
}

/** 
 * A collection of all sets of translations.
 * This is not used when only one language is supported.
 * 
 * @author Tristan J Berto <hello@tristanberto.com>
 */
export const strings = new Map<Language, WebsiteStrings> ([
	[Language.EN, en]
]);

/** The default application content (Engligh strings). */
export const defaultStrings = en;
