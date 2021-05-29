import { CSSProperties } from "react";
import { AppTheme } from "./helpers/theme";

/**
 * The possible types of data in {@link homePageContent} sections.
 * 
 * @author Tristan J Berto <hello@tristanberto.com>
 */
type ContentSection =
{
	type: "textSection",
	content: string[]
}
|
{
	type: "codeSection",
	content: CodeLine[]
};

/**
 * Parameters of a line of code in a {@link ContentSection}.
 * 
 * @author Tristan J Berto <hello@tristanberto.com>
 */
type CodeLine =
{
	type: "text",
	text: string,
	indent: number
}
|
{
	type: "code",
	content: CodeSpan[],
	indent: number
};

/**
 * Parameters of a span of text within a {@link CodeLine}.
 * 
 * @author Tristan J Berto <hello@tristanberto.com>
 */
interface CodeSpan
{
	text: string;
	style: CSSProperties;
}

/**
 * Content to be displayed in the below-the-fold section of the {@link App}
 * homepage.
 * 
 * @author Tristan J Berto <hello@tristanberto.com>
 */
export const homePageContent: ContentSection[] = 
[
	// TODO
];

/**
 * Code style CSS getters for different colors of text.
 * 
 * @author Tristan J Berto <hello@tristanberto.com>
 */
export const codeStyle =
{
	/** Get yellow colored styling for the theme. */
	YELLOWISH: (theme: AppTheme) =>
	{
		// TODO
	},

	/** Get red colored styling for the theme. */
	REDDISH: (theme: AppTheme) =>
	{
		// TODO
	},

	/** Get blue colored styling for the theme. */
	BLUISH: (theme: AppTheme) =>
	{
		// TODO
	},

	/** Get green colored styling for the theme. */
	GREENISH: (theme: AppTheme) =>
	{
		// TODO
	}
};
