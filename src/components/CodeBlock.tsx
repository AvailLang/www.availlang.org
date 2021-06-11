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
	/** An array of {@link CodeLine}, each representing a line of example code. */
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
 * @param theme
 *   The app theme.
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
 * Parameters required to display a code line view.
 * 
 * @author Tristan J Berto <hello@tristanberto.com>
 */
export interface CodeLine
{
	/** A collection of code spans with styling data. */
	content: CodeSpan[],

	/** The number of (tab) indents to display for the line. */
	indent: number
}

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
	/** Get the dynamic code style for non-highlighted text. */
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

	/** Get a dynamic highlight color (#1) that depends on the theme. */
	DYNAMIC_HIGHLIGHT_1: (theme: AppTheme) =>
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

	/** Get green colored styling for any theme. */
	GREEN: { color: colors.CODE_GREEN },

	/** Get a blue colored styling for any theme. */
	BLUE: { color: colors.CODE_BLUE },

	/** Get red colored styling for any theme. */
	RED: { color: colors.CODE_RED },

	/** Get magenta colored styling for any theme. */
	MAGENTA: { color: colors.CODE_MAGENTA },
};

/** Either a getter for theme styling or a CSS property set. */
export type StyleOption = ((theme: AppTheme) => CSSProperties) | CSSProperties;

/**
 * Create a {@link CodeSpan}.
 * @param text
 *   The code span text.
 * @param style
 *   The code span style getter, style, or undefined.
 *   'undefined' will default to the base coloring.
 */
export const codeSpan = (text: string, style?: StyleOption) =>
	({
		text,
		// Default to the dynamic base style if none is provided.
		style: style === undefined
			? codeStyle.DYNAMIC_BASE
			// If style is an object, assume it is static CSSProperties.
			: typeof style === "object"
				? () => style
				// Otherwise style is already the correct CodeSpan field type.
				: style
	});

/**
 * Create an array of {@link CodeSpans} from an array of text and style.
 * @param spans
 *   The array of [string, style]. Omit style to use the theme base style.
 */
export const codeSpanArray = (spans: [string, StyleOption?][]) =>
	spans.map(([text, style]) => codeSpan(text, style));

/**
 * Returns a {@link CodeLine}.
 *
 * @param content
 *   The line contents, an array of {@link CodeSpan}.
 * @param indent
 *   The line indent.
 */
export const codeLine =
	(content: CodeSpan[], indent = 0) => ({content, indent});

/**
 * Returns an array of {@link CodeLine code lines} with a consolidated syntax.
 * This is just intended to make code examples more legible in source files.
 *
 * @param lines
 *   An array of [number, spans], where 'number' is the line indent and 'spans'
 *   is an array of [text, style], where 'text' is the text in a span of code,
 *   and 'style' is an optional styling getter/ CSS property set for the span.
 */
export const codeLineArray = (lines: [number, [string, StyleOption?][]][]) =>
	lines.map(([indent, spans]) => ({
		indent,
		content: codeSpanArray(spans)
	}));
