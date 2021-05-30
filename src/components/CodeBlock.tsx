import { CSSProperties } from "react";
import { colors } from "../helpers/colors";
import { errors } from "../helpers/errors";
import { AppTheme } from "../helpers/theme";

/**
 * The React properties for a {@link CodeBlock} component.
 * 
 * @author Tristan J Berto <hello@tristanberto.com>
 */
export interface CodeBlockProps
{
	/** An array of {@link CodeLine output text} that the code might return. */
	lines: CodeLine[];

	/** The {@link App} theme. */
	theme: AppTheme;
}

/**
 * A display for a block of code with different colored spans.
 * 
 * @param props 
 *   The React properties.
 * @returns 
 *   The React element.
 * @author Tristan J Berto <hello@tristanberto.com>
 */
export const CodeBlock = (props: CodeBlockProps) =>
{
	const {lines, theme} = props;
	const lineElements = lines.map((line, index) =>
		getCodeLineView(line, index, theme));
	const backgroundStyle = theme === AppTheme.DARK
		? 
			{ 
				background: colors.DARK_CODE_BACKGROUND, 
				border: `1px solid ${colors.DARK_CODE_BACKGROUND_SECONDARY}` 
			}
		: 
			{ 
				background: colors.LIGHT_CODE_BACKGROUND, 
				border: `1px solid ${colors.LIGHT_CODE_BACKGROUND_SECONDARY}` 
			};
	return(
		<div className="code-block" style={backgroundStyle}>
			{lineElements}
		</div>
	)
};

/**
 * Generate an HTML paragraph element view of an {@link CodeLine}.
 * 
 * @param line
 *   The {@link CodeLine}.
 * @param index 
 *   The index of the line as it appears in an array of lines.
 * @returns
 *   The HTML paragraph element.
 * @author Tristan J Berto <hello@tristanberto.com>
 */
const getCodeLineView = (line: CodeLine, index: number, theme: AppTheme) =>
{
	return (
		<p 
			key={`code-line-${index}`} 
			style={{marginLeft: `${line.indent * 2}em`}}
		>
			{
				line.content.map((codeSpan, index) =>
					<span 
						style={codeSpan.style(theme)}
						key={`code-span-${index}`}
					> 
						{codeSpan.text} 
					</span>
			)}
		</p>
	)
}

/**
 * Parameters of a line of code in a {@link ContentSection}.
 * 
 * @author Tristan J Berto <hello@tristanberto.com>
 */
export interface CodeLine
{
	/** A collection of code spans with styling data. */
	content: CodeSpan[],

	/** The number of (tab) indents to display for the line. */
	indent: number
};

/**
 * Parameters of a span of text within a {@link CodeLine}.
 * 
 * @author Tristan J Berto <hello@tristanberto.com>
 */
export interface CodeSpan
{
	/** The code text. */
	text: string;

	/** CSS styling to apply to the text. */
	style: (theme: AppTheme) => CSSProperties;
}

/**
 * Code style CSS getters for different colors of text.
 * 
 * @author Tristan J Berto <hello@tristanberto.com>
 */
export const codeStyle =
{
	/** Get the dynamic code style for non-hilighted text. */
	DYNAMIC_BASE: (theme: AppTheme) =>
	{
		switch (theme)
		{
			case AppTheme.DARK:
				return { color: colors.DARK_CODE_COLOR };
			case AppTheme.LIGHT:
				return { color: colors.LIGHT_CODE_COLOR };
			default:
				throw errors.UNKNOWN_THEME();
		}
	},

	/** Get a dynamic hilight color (#1) that depends on the theme. */
	DYNAMIC_HILIGHT_1: (theme: AppTheme) =>
	{
		switch (theme)
		{
			case AppTheme.DARK:
				return { color: colors.CODE_YELLOW };
			case AppTheme.LIGHT:
				return { color: colors.CODE_CYAN };
			default:
				throw errors.UNKNOWN_THEME();
		}
	},

	/** Get a dynamic color (#2) hilight that varies by theme. */
	GREEN: { color: colors.CODE_GREEN },

	/** Get a dynamic color (#2) hilight that varies by theme. */
	BLUE: { color: colors.CODE_BLUE },

	/** Get red colored styling for the theme. */
	RED: { color: colors.CODE_RED },

	/** Get magenta colored styling for the theme. */
	MAGENTA: { color: colors.CODE_MAGENTA },
};
