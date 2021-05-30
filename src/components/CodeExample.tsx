import { CSSProperties, ReactNode } from "react";
import { errors } from "../helpers/errors";
import { AppTheme } from "../helpers/theme";

/**
 * The React properties for a {@link CodeExample} component.
 * 
 * @author Tristan J Berto <hello@tristanberto.com>
 */
interface CodeExampleProps
{
	/** The element's children. */
	children?: ReactNode;

	/** An array of descriptive paragraph text. */
	description: string[];

	/** The code example {@link CodeLine data}. */
	codeLines: CodeLine[];

	/** An array of {@link CodeLine output text} that the code might return. */
	codeOutput: string[];

	/** The {@link App} theme. */
	theme: AppTheme;
}

/**
 * A code example display with a description, code sample, and output.
 * 
 * @param props
 *   The React properties.
 * @returns 
 *   The React element.
 * @author Tristan J Berto <hello@tristanberto.com>
 */
export const CodeExample = (props: CodeExampleProps) =>
{
	const {children, description, codeLines, codeOutput, theme} = props;
	const descriptionParagraphs = description.map((text, index) =>
		<p key={`${index}`}> {text} </p> );
	const outputParagraphs = codeOutput.map((text, index) =>
		<p key={`${index}`}> {text} </p> );
	const descriptionStyle = theme === AppTheme.DARK
		? { /* TODO */ }
		: { /* TODO */ };
	const outputStyle = theme === AppTheme.DARK
		? { /* TODO */ }
		: { /* TODO */ };
	return(
		<div className="code-example">
			<div className="code-display">
				<div className="description" style={descriptionStyle}>
					{descriptionParagraphs}
				</div>
				<CodeBlock lines={codeLines} theme={theme}/>
				<div className="code-output" style={outputStyle}>
					{outputParagraphs.length !== 0 ? outputParagraphs : noOutput}
				</div>
			</div>
			{children}
		</div>
	)
};

/** A paragraph element indicating a code sample with no expected output. */
const noOutput = <p><em>No Output</em></p>;

/**
 * The React properties for a {@link CodeBlock} component.
 * 
 * @author Tristan J Berto <hello@tristanberto.com>
 */
interface CodeBlockProps
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
		getCodeLineView(line, index));
	return(
		<div className="code-block">

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
const getCodeLineView = (line: CodeLine, index: number) =>
{
	const tabs = (count: number) =>
		Array(count).fill("&emsp;").join();
	switch(line.type)
	{
		case "text":
			return (
				<p key={`code-line-${index}`}> {`${tabs(line.indent)}${line.text}`} </p>
			)
		case "code":
			return (
				<p key={`code-line-${index}`}>
					{`${tabs(line.indent)}`}
					{
						line.content.map((codeSpan, index) =>
							<span style={codeSpan.style}> {codeSpan.text} </span>
					)}
				</p>
			)
		default:
			throw errors.UNKNOWN_CODE_LINE();
	}
}

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
	/** The code text. */
	text: string;

	/** CSS styling to apply to the text. */
	style: CSSProperties;
}

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
