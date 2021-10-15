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
	lines: ReadonlyArray<CodeLine>;

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
				background: colors.CODE_BACKGROUND_DARK,
				border: `1px solid ${colors.CONSOLE_BACKGROUND_DARK}`
			}
		: 
			{ 
				background: colors.CODE_BACKGROUND_LIGHT,
				border: `1px solid ${colors.CONSOLE_BACKGROUND_LIGHT}`
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
	// TODO: deal with theme somewhere
	return (
		<p
			key={`code-line-${index}`}
			style={{whiteSpace: "pre", tabSize: 4}}
		>
			{
				line.map((codeSpan, index) =>
					<span 
						style={
							codeSpan.styles
								.map((style) =>
									typeof style === "object"
										? style
										: style(theme))
								.reduce((acc, style) =>
									({...acc, ...style}))
						}
						key={`code-span-${index}`}
					> 
						{codeSpan.text} 
					</span>
			)}
		</p>
	)
};

/**
 * Parameters required to display a code line view.
 * 
 * @author Tristan J Berto <hello@tristanberto.com>
 */
export type CodeLine = ReadonlyArray<CodeSpan>;

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
	styles: StyleOption[];
}

/**
 * Create a {@link CodeSpan}.
 * @param text
 *   The code span text.
 * @param styles
 *   The code span style getter or style.
 */
export const codeSpan = (text: string, styles: StyleOption[]): CodeSpan =>
	({text, styles});

/**
 * Create an array of {@link CodeSpans} from an array of text and style.
 * @param spans
 *   The array of [string, style].
 */
export const codeSpanArray = (
	spans: ReadonlyArray<[string, ...StyleOption[]]>
): ReadonlyArray<CodeSpan> =>
	spans.map(([text, ...styles]) => codeSpan(text, styles));

/**
 * Returns an array of {@link CodeLine code lines} with a consolidated syntax.
 * This is just intended to make code examples more legible in source files.
 *
 * @param lines
 *   An array of [number, spans], where 'number' is the line indent and 'spans'
 *   is an array of [text, style], where 'text' is the text in a span of code,
 *   and 'style' is a styling getter/ CSS property set for the span.
 */
export const codeLineArray = (
	lines: ReadonlyArray<ReadonlyArray<[string, ...StyleOption[]]>>
): ReadonlyArray<CodeLine> =>
	lines.map(spans => codeSpanArray(spans));

/** Either a getter for theme styling or a CSS property set. */
export type StyleOption = ((theme: AppTheme) => CSSProperties) | CSSProperties;

interface CodeStyle
{
	TEMP_REMOVE: StyleOption,
	COMMENT: StyleOption,
	DOCUMENTATION: StyleOption,
	DOCUMENTATION_TAG: StyleOption,
	BLOCK: StyleOption,
	CONDITIONAL: StyleOption,
	LOOP: StyleOption,
	LABEL: StyleOption,
	NONLOCAL_CONTROL: StyleOption,
	MODULE_HEADER: StyleOption,
	MODULE_NAME: StyleOption,
	ENTRY_POINT: StyleOption,
	EXPORT: StyleOption,
	IMPORT: StyleOption,
	SEAL_DEFINITION: StyleOption,
	VERSION: StyleOption,
	PRIMITIVE_BLOCK: StyleOption,
	PRIMITIVE_NAME: StyleOption,
	SPECIAL_OBJECT_DEFINITION: StyleOption,
	METHOD_DEFINITION: StyleOption,
	GRAMMATICAL_RESTRICTION_DEFINITION: StyleOption,
	SEMANTIC_RESTRICTION_DEFINITION: StyleOption,
	LEXER_DEFINITION: StyleOption,
	MACRO_DEFINITION: StyleOption,
	METHOD_NAME: StyleOption,
	MACRO_SEND: StyleOption,
	METHOD_SEND: StyleOption,
	MODULE_CONSTANT_DEFINITION: StyleOption,
	PARAMETER_DEFINITION: StyleOption,
	LOCAL_CONSTANT_DEFINITION: StyleOption,
	MODULE_CONSTANT_USE: StyleOption,
	PARAMETER_USE: StyleOption,
	PRIMITIVE_FAILURE_VARIABLE_USE: StyleOption,
	LOCAL_CONSTANT_USE: StyleOption,
	MODULE_VARIABLE_DECLARATION: StyleOption,
	LOCAL_VARIABLE_DECLARATION: StyleOption,
	MODULE_VARIABLE_USE: StyleOption,
	LOCAL_VARIABLE_USE: StyleOption,
	TYPE: StyleOption,
	METATYPE: StyleOption,
	OBJECT_TYPE_DEFINITION: StyleOption,
	ATOM_LITERAL: StyleOption,
	BOOLEAN_LITERAL: StyleOption,
	CHARACTER_LITERAL: StyleOption,
	MAP_LITERAL: StyleOption,
	NUMERIC_LITERAL: StyleOption,
	SET_LITERAL: StyleOption,
	STRING_LITERAL: StyleOption,
	TUPLE_LITERAL: StyleOption,
	STRING_ESCAPE_SEQUENCE: StyleOption,
	STATEMENT: StyleOption,
	PHRASE: StyleOption,
	PHRASE_TYPE: StyleOption,
	RETURN_VALUE: StyleOption
}

export const codeStyle: CodeStyle =
{
	// TODO: Remove this when there are no more placeholder filler examples
	// using it.
	TEMP_REMOVE: (theme: AppTheme): CSSProperties =>
	{
		switch (theme)
		{
			case AppTheme.DARK:
				return { color: colors.BASE_CODE_DARK };
			case AppTheme.LIGHT:
				return { color: colors.BASE_CODE_LIGHT };
			default:
				throw errors.UNKNOWN_THEME();
		}
	},

	/*
	Conventions:
	- Module-scoped item names are italic; more narrow scope remains straight.
	- Mutable item names are underlined; immutable item names are not.
	 */

	// Comments, documentation, doc tags, method sends, macro sends, and
	// statement [terminators] are in grayscale.
	COMMENT: (theme: AppTheme): CSSProperties =>
	{
		switch (theme)
		{
			case AppTheme.DARK:
				return { color: colors.WEAK_GRAY_DARK };
			case AppTheme.LIGHT:
				return { color: colors.WEAK_GRAY_LIGHT };
			default:
				throw errors.UNKNOWN_THEME();
		}
	},
	DOCUMENTATION: (theme: AppTheme): CSSProperties =>
	{
		switch (theme)
		{
			case AppTheme.DARK:
				return { color: colors.STRONG_GRAY_DARK };
			case AppTheme.LIGHT:
				return { color: colors.STRONG_GRAY_LIGHT };
			default:
				throw errors.UNKNOWN_THEME();
		}
	},
	DOCUMENTATION_TAG: (theme: AppTheme): CSSProperties =>
	{
		switch (theme)
		{
			case AppTheme.DARK:
				return {
					color: colors.STRONG_GRAY_DARK,
					fontWeight: "bold"
				};
			case AppTheme.LIGHT:
				return {
					color: colors.STRONG_GRAY_LIGHT,
					fontWeight: "bold"
				};
			default:
				throw errors.UNKNOWN_THEME();
		}
	},
	MACRO_SEND: (theme: AppTheme): CSSProperties =>
	{
		switch (theme)
		{
			case AppTheme.DARK:
				return { color: colors.BASE_CODE_DARK };
			case AppTheme.LIGHT:
				return { color: colors.BASE_CODE_LIGHT };
			default:
				throw errors.UNKNOWN_THEME();
		}
	},
	METHOD_SEND: (theme: AppTheme): CSSProperties =>
	{
		switch (theme)
		{
			case AppTheme.DARK:
				return { color: colors.BASE_CODE_DARK };
			case AppTheme.LIGHT:
				return { color: colors.BASE_CODE_LIGHT };
			default:
				throw errors.UNKNOWN_THEME();
		}
	},
	STATEMENT: (theme: AppTheme): CSSProperties =>
	{
		switch (theme)
		{
			case AppTheme.DARK:
				return { color: colors.BASE_CODE_DARK, fontWeight: "bold" };
			case AppTheme.LIGHT:
				return { color: colors.BASE_CODE_LIGHT, fontWeight: "bold" };
			default:
				throw errors.UNKNOWN_THEME();
		}
	},

	// Block delimiters and expressions that control whether blocks are entered
	// or exited, and return value expressions, are in the yellow category.
	BLOCK: (theme: AppTheme): CSSProperties =>
	{
		switch (theme)
		{
			case AppTheme.DARK:
				return { color: colors.MUSTARD_DARK };
			case AppTheme.LIGHT:
				return { color: colors.MUSTARD_LIGHT };
			default:
				throw errors.UNKNOWN_THEME();
		}
	},
	CONDITIONAL: (theme: AppTheme): CSSProperties =>
	{
		switch (theme)
		{
			case AppTheme.DARK:
				return { color: colors.MUSTARD_DARK };
			case AppTheme.LIGHT:
				return { color: colors.MUSTARD_LIGHT };
			default:
				throw errors.UNKNOWN_THEME();
		}
	},
	LOOP: (theme: AppTheme): CSSProperties =>
	{
		switch (theme)
		{
			case AppTheme.DARK:
				return { color: colors.MUSTARD_DARK };
			case AppTheme.LIGHT:
				return { color: colors.MUSTARD_LIGHT };
			default:
				throw errors.UNKNOWN_THEME();
		}
	},
	LABEL: (theme: AppTheme): CSSProperties =>
	{
		switch (theme)
		{
			case AppTheme.DARK:
				return {
					color: colors.MUSTARD_DARK,
					backgroundColor: colors.TRANSPARENT_MUSTARD_DARK
				};
			case AppTheme.LIGHT:
				return {
					color: colors.MUSTARD_LIGHT,
					backgroundColor: colors.TRANSPARENT_MUSTARD_LIGHT
				};
			default:
				throw errors.UNKNOWN_THEME();
		}
	},
	NONLOCAL_CONTROL: (theme: AppTheme): CSSProperties =>
	{
		switch (theme)
		{
			case AppTheme.DARK:
				return {
					color: colors.MUSTARD_DARK,
					backgroundColor: colors.TRANSPARENT_MUSTARD_DARK
				};
			case AppTheme.LIGHT:
				return {
					color: colors.MUSTARD_LIGHT,
					backgroundColor: colors.TRANSPARENT_MUSTARD_LIGHT
				};
			default:
				throw errors.UNKNOWN_THEME();
		}
	},
	RETURN_VALUE: (theme: AppTheme): CSSProperties =>
	{
		switch (theme)
		{
			case AppTheme.DARK:
				return {
					color: colors.MUSTARD_DARK,
					backgroundColor: colors.TRANSPARENT_MUSTARD_DARK
				};
			case AppTheme.LIGHT:
				return {
					color: colors.MUSTARD_LIGHT,
					backgroundColor: colors.TRANSPARENT_MUSTARD_LIGHT
				};
			default:
				throw errors.UNKNOWN_THEME();
		}
	},

	// Keywords for definitions and string names in the module header are in the
	// red category.
	MODULE_HEADER: (theme: AppTheme): CSSProperties =>
	{
		switch (theme)
		{
			case AppTheme.DARK:
				return { color: colors.TRANSPARENT_ROSE_DARK };
			case AppTheme.LIGHT:
				return { color: colors.TRANSPARENT_ROSE_LIGHT };
			default:
				throw errors.UNKNOWN_THEME();
		}
	},
	MODULE_NAME: (theme: AppTheme): CSSProperties =>
	{
		switch (theme)
		{
			case AppTheme.DARK:
				return { color: colors.ROSE_DARK };
			case AppTheme.LIGHT:
				return { color: colors.ROSE_LIGHT };
			default:
				throw errors.UNKNOWN_THEME();
		}
	},
	ENTRY_POINT: (theme: AppTheme): CSSProperties =>
	{
		switch (theme)
		{
			case AppTheme.DARK:
				return { color: colors.ROSE_DARK };
			case AppTheme.LIGHT:
				return { color: colors.ROSE_LIGHT };
			default:
				throw errors.UNKNOWN_THEME();
		}
	},
	EXPORT: (theme: AppTheme): CSSProperties =>
	{
		switch (theme)
		{
			case AppTheme.DARK:
				return { color: colors.ROSE_DARK };
			case AppTheme.LIGHT:
				return { color: colors.ROSE_LIGHT };
			default:
				throw errors.UNKNOWN_THEME();
		}
	},
	IMPORT: (theme: AppTheme): CSSProperties =>
	{
		switch (theme)
		{
			case AppTheme.DARK:
				return { color: colors.ROSE_DARK };
			case AppTheme.LIGHT:
				return { color: colors.ROSE_LIGHT };
			default:
				throw errors.UNKNOWN_THEME();
		}
	},
	SEAL_DEFINITION: (theme: AppTheme): CSSProperties =>
	{
		switch (theme)
		{
			case AppTheme.DARK:
				return { color: colors.ROSE_DARK };
			case AppTheme.LIGHT:
				return { color: colors.ROSE_LIGHT };
			default:
				throw errors.UNKNOWN_THEME();
		}
	},
	VERSION: (theme: AppTheme): CSSProperties =>
	{
		switch (theme)
		{
			case AppTheme.DARK:
				return { color: colors.ROSE_DARK };
			case AppTheme.LIGHT:
				return { color: colors.ROSE_LIGHT };
			default:
				throw errors.UNKNOWN_THEME();
		}
	},
	PRIMITIVE_BLOCK: (theme: AppTheme): CSSProperties =>
	{
		switch (theme)
		{
			case AppTheme.DARK:
				return { color: colors.ROSE_DARK };
			case AppTheme.LIGHT:
				return { color: colors.ROSE_LIGHT };
			default:
				throw errors.UNKNOWN_THEME();
		}
	},
	PRIMITIVE_NAME: (theme: AppTheme): CSSProperties =>
	{
		switch (theme)
		{
			case AppTheme.DARK:
				return { color: colors.ROSE_DARK, fontWeight: "bold" };
			case AppTheme.LIGHT:
				return { color: colors.ROSE_LIGHT, fontWeight: "bold" };
			default:
				throw errors.UNKNOWN_THEME();
		}
	},
	SPECIAL_OBJECT_DEFINITION: (theme: AppTheme): CSSProperties =>
	{
		switch (theme)
		{
			case AppTheme.DARK:
				return { color: colors.ROSE_DARK };
			case AppTheme.LIGHT:
				return { color: colors.ROSE_LIGHT };
			default:
				throw errors.UNKNOWN_THEME();
		}
	},
	METHOD_DEFINITION: (theme: AppTheme): CSSProperties =>
	{
		switch (theme)
		{
			case AppTheme.DARK:
				return { color: colors.ROSE_DARK };
			case AppTheme.LIGHT:
				return { color: colors.ROSE_LIGHT };
			default:
				throw errors.UNKNOWN_THEME();
		}
	},
	GRAMMATICAL_RESTRICTION_DEFINITION: (theme: AppTheme): CSSProperties =>
	{
		switch (theme)
		{
			case AppTheme.DARK:
				return { color: colors.ROSE_DARK };
			case AppTheme.LIGHT:
				return { color: colors.ROSE_LIGHT };
			default:
				throw errors.UNKNOWN_THEME();
		}
	},
	SEMANTIC_RESTRICTION_DEFINITION: (theme: AppTheme): CSSProperties =>
	{
		switch (theme)
		{
			case AppTheme.DARK:
				return { color: colors.ROSE_DARK };
			case AppTheme.LIGHT:
				return { color: colors.ROSE_LIGHT };
			default:
				throw errors.UNKNOWN_THEME();
		}
	},
	LEXER_DEFINITION: (theme: AppTheme): CSSProperties =>
	{
		switch (theme)
		{
			case AppTheme.DARK:
				return { color: colors.ROSE_DARK };
			case AppTheme.LIGHT:
				return { color: colors.ROSE_LIGHT };
			default:
				throw errors.UNKNOWN_THEME();
		}
	},
	MACRO_DEFINITION: (theme: AppTheme): CSSProperties =>
	{
		switch (theme)
		{
			case AppTheme.DARK:
				return { color: colors.ROSE_DARK };
			case AppTheme.LIGHT:
				return { color: colors.ROSE_LIGHT };
			default:
				throw errors.UNKNOWN_THEME();
		}
	},

	// Method name definitions are in the orange category.
	METHOD_NAME: (theme: AppTheme): CSSProperties =>
	{
		switch (theme)
		{
			case AppTheme.DARK:
				return { color: colors.MANGO_DARK };
			case AppTheme.LIGHT:
				return { color: colors.MANGO_LIGHT };
			default:
				throw errors.UNKNOWN_THEME();
		}
	},

	// Value/object name definitions and sends are in the pink category.
	MODULE_CONSTANT_DEFINITION: (theme: AppTheme): CSSProperties =>
	{
		switch (theme)
		{
			case AppTheme.DARK:
				return { color: colors.TRANSPARENT_MAGENTA_DARK, fontWeight: "bold" };
			case AppTheme.LIGHT:
				return { color: colors.TRANSPARENT_MAGENTA_LIGHT, fontWeight: "bold" };
			default:
				throw errors.UNKNOWN_THEME();
		}
	},
	PARAMETER_DEFINITION: (theme: AppTheme): CSSProperties =>
	{
		switch (theme)
		{
			case AppTheme.DARK:
				return { color: colors.TRANSPARENT_MAGENTA_DARK, fontWeight: "bold" };
			case AppTheme.LIGHT:
				return { color: colors.TRANSPARENT_MAGENTA_LIGHT, fontWeight: "bold" };
			default:
				throw errors.UNKNOWN_THEME();
		}
	},
	LOCAL_CONSTANT_DEFINITION: (theme: AppTheme): CSSProperties =>
	{
		switch (theme)
		{
			case AppTheme.DARK:
				return { color: colors.TRANSPARENT_MAGENTA_DARK, fontWeight: "bold" };
			case AppTheme.LIGHT:
				return { color: colors.TRANSPARENT_MAGENTA_LIGHT, fontWeight: "bold" };
			default:
				throw errors.UNKNOWN_THEME();
		}
	},
	MODULE_CONSTANT_USE: (theme: AppTheme): CSSProperties =>
	{
		switch (theme)
		{
			case AppTheme.DARK:
				return { color: colors.MAGENTA_DARK, fontStyle: "italic" };
			case AppTheme.LIGHT:
				return { color: colors.MAGENTA_LIGHT, fontStyle: "italic" };
			default:
				throw errors.UNKNOWN_THEME();
		}
	},
	PARAMETER_USE: (theme: AppTheme): CSSProperties =>
	{
		switch (theme)
		{
			case AppTheme.DARK:
				return { color: colors.MAGENTA_DARK };
			case AppTheme.LIGHT:
				return { color: colors.MAGENTA_LIGHT };
			default:
				throw errors.UNKNOWN_THEME();
		}
	},
	PRIMITIVE_FAILURE_VARIABLE_USE: (theme: AppTheme): CSSProperties =>
	{
		switch (theme)
		{
			case AppTheme.DARK:
				return { color: colors.MAGENTA_DARK };
			case AppTheme.LIGHT:
				return { color: colors.MAGENTA_LIGHT };
			default:
				throw errors.UNKNOWN_THEME();
		}
	},
	LOCAL_CONSTANT_USE: (theme: AppTheme): CSSProperties =>
	{
		switch (theme)
		{
			case AppTheme.DARK:
				return { color: colors.MAGENTA_DARK };
			case AppTheme.LIGHT:
				return { color: colors.MAGENTA_LIGHT };
			default:
				throw errors.UNKNOWN_THEME();
		}
	},
	MODULE_VARIABLE_DECLARATION: (theme: AppTheme): CSSProperties =>
	{
		switch (theme)
		{
			case AppTheme.DARK:
				return { color: colors.TRANSPARENT_MAGENTA_DARK, fontWeight: "bold" };
			case AppTheme.LIGHT:
				return { color: colors.TRANSPARENT_MAGENTA_LIGHT, fontWeight: "bold" };
			default:
				throw errors.UNKNOWN_THEME();
		}
	},
	LOCAL_VARIABLE_DECLARATION: (theme: AppTheme): CSSProperties =>
	{
		switch (theme)
		{
			case AppTheme.DARK:
				return { color: colors.TRANSPARENT_MAGENTA_DARK, fontWeight: "bold" };
			case AppTheme.LIGHT:
				return { color: colors.TRANSPARENT_MAGENTA_LIGHT, fontWeight: "bold" };
			default:
				throw errors.UNKNOWN_THEME();
		}
	},
	MODULE_VARIABLE_USE: (theme: AppTheme): CSSProperties =>
	{
		switch (theme)
		{
			case AppTheme.DARK:
				return {
					color: colors.MAGENTA_DARK,
					fontStyle: "italic",
					textDecorationLine: "underline"
				};
			case AppTheme.LIGHT:
				return {
					color: colors.MAGENTA_LIGHT,
					fontStyle: "italic",
					textDecorationLine: "underline"
				};
			default:
				throw errors.UNKNOWN_THEME();
		}
	},
	LOCAL_VARIABLE_USE: (theme: AppTheme): CSSProperties =>
	{
		switch (theme)
		{
			case AppTheme.DARK:
				return {
					color: colors.MAGENTA_DARK,
					textDecorationLine: "underline"
				};
			case AppTheme.LIGHT:
				return {
					color: colors.MAGENTA_LIGHT,
					textDecorationLine: "underline"
				};
			default:
				throw errors.UNKNOWN_THEME();
		}
	},

	// Type names and definitions are in the blue category
	TYPE: (theme: AppTheme): CSSProperties =>
	{
		switch (theme)
		{
			case AppTheme.DARK:
				return { color: colors.BLUE_DARK };
			case AppTheme.LIGHT:
				return { color: colors.BLUE_LIGHT };
			default:
				throw errors.UNKNOWN_THEME();
		}
	},
	METATYPE: (theme: AppTheme): CSSProperties =>
	{
		switch (theme)
		{
			case AppTheme.DARK:
				return { color: colors.BLUE_DARK, fontStyle: "italic" };
			case AppTheme.LIGHT:
				return { color: colors.BLUE_LIGHT, fontStyle: "italic" };
			default:
				throw errors.UNKNOWN_THEME();
		}
	},
	OBJECT_TYPE_DEFINITION: (theme: AppTheme): CSSProperties =>
	{
		switch (theme)
		{
			case AppTheme.DARK:
				return { color: colors.BLUE_DARK };
			case AppTheme.LIGHT:
				return { color: colors.BLUE_LIGHT };
			default:
				throw errors.UNKNOWN_THEME();
		}
	},

	// Literal contents, delimiters, and escape sequences are in the green
	// category.
	ATOM_LITERAL: (theme: AppTheme): CSSProperties =>
	{
		switch (theme)
		{
			case AppTheme.DARK:
				return { color: colors.GREEN_DARK };
			case AppTheme.LIGHT:
				return { color: colors.GREEN_LIGHT };
			default:
				throw errors.UNKNOWN_THEME();
		}
	},
	BOOLEAN_LITERAL: (theme: AppTheme): CSSProperties =>
	{
		switch (theme)
		{
			case AppTheme.DARK:
				return { color: colors.GREEN_DARK };
			case AppTheme.LIGHT:
				return { color: colors.GREEN_LIGHT };
			default:
				throw errors.UNKNOWN_THEME();
		}
	},
	CHARACTER_LITERAL: (theme: AppTheme): CSSProperties =>
	{
		switch (theme)
		{
			case AppTheme.DARK:
				return { color: colors.GREEN_DARK };
			case AppTheme.LIGHT:
				return { color: colors.GREEN_LIGHT };
			default:
				throw errors.UNKNOWN_THEME();
		}
	},
	MAP_LITERAL: (theme: AppTheme): CSSProperties =>
	{
		switch (theme)
		{
			case AppTheme.DARK:
				return { color: colors.GREEN_DARK };
			case AppTheme.LIGHT:
				return { color: colors.GREEN_LIGHT };
			default:
				throw errors.UNKNOWN_THEME();
		}
	},
	NUMERIC_LITERAL: (theme: AppTheme): CSSProperties =>
	{
		switch (theme)
		{
			case AppTheme.DARK:
				return { color: colors.GREEN_DARK };
			case AppTheme.LIGHT:
				return { color: colors.GREEN_LIGHT };
			default:
				throw errors.UNKNOWN_THEME();
		}
	},
	SET_LITERAL: (theme: AppTheme): CSSProperties =>
	{
		switch (theme)
		{
			case AppTheme.DARK:
				return { color: colors.GREEN_DARK };
			case AppTheme.LIGHT:
				return { color: colors.GREEN_LIGHT };
			default:
				throw errors.UNKNOWN_THEME();
		}
	},
	STRING_LITERAL: (theme: AppTheme): CSSProperties =>
	{
		switch (theme)
		{
			case AppTheme.DARK:
				return { color: colors.GREEN_DARK };
			case AppTheme.LIGHT:
				return { color: colors.GREEN_LIGHT };
			default:
				throw errors.UNKNOWN_THEME();
		}
	},
	TUPLE_LITERAL: (theme: AppTheme): CSSProperties =>
	{
		switch (theme)
		{
			case AppTheme.DARK:
				return { color: colors.GREEN_DARK };
			case AppTheme.LIGHT:
				return { color: colors.GREEN_LIGHT };
			default:
				throw errors.UNKNOWN_THEME();
		}
	},
	STRING_ESCAPE_SEQUENCE: (theme: AppTheme): CSSProperties =>
	{
		switch (theme)
		{
			case AppTheme.DARK:
				return { color: colors.TRANSPARENT_GREEN_DARK };
			case AppTheme.LIGHT:
				return { color: colors.TRANSPARENT_GREEN_LIGHT };
			default:
				throw errors.UNKNOWN_THEME();
		}
	},

	// Phrase-related text is in the purple category.
	PHRASE: (theme: AppTheme): CSSProperties =>
	{
		switch (theme)
		{
			case AppTheme.DARK:
				return { color: colors.LILAC_DARK };
			case AppTheme.LIGHT:
				return { color: colors.LILAC_LIGHT };
			default:
				throw errors.UNKNOWN_THEME();
		}
	},
	PHRASE_TYPE: (theme: AppTheme): CSSProperties =>
	{
		switch (theme)
		{
			case AppTheme.DARK:
				return { color: colors.LILAC_DARK, fontStyle: "italic" };
			case AppTheme.LIGHT:
				return { color: colors.LILAC_LIGHT, fontStyle: "italic" };
			default:
				throw errors.UNKNOWN_THEME();
		}
	}
};
