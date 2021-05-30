import { en } from "./en"

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
 * A complete set of translations for the {@link App}.
 * 
 * @author Tristan J Berto <hello@tristanberto.com>
 */
export interface WebsiteStrings
{
	/** A few words describing the site. */
	tagline: string
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
