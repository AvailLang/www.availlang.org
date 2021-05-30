import { ReactNode } from "react";
import { CodeBlock } from "./CodeBlock";
import { AppTheme } from "../helpers/theme";
import { CodeExampleData } from "../examples/examples";
import { WebsiteStrings } from "../internationalization/strings";
import { colors } from "../helpers/colors";

/**
 * The React properties for a {@link CodeExample} component.
 * 
 * @author Tristan J Berto <hello@tristanberto.com>
 */
interface CodeExampleProps extends CodeExampleData
{
	/** The element's children. */
	children: ReactNode;

	/** The {@link App} theme. */
	theme: AppTheme;

	/** The website text translations. */
	strings: WebsiteStrings;
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
	const {
		children, 
		description, 
		codeLines, 
		codeOutput, 
		theme, 
		strings
	} = props;
	const descriptionParagraphs = description(strings).map((text, index) =>
		<p key={`${index}`}> {text} </p> );
	const outputParagraphs = codeOutput.map((text, index) =>
		<p key={`${index}`}> {text} </p> );
	const descriptionStyle = theme === AppTheme.DARK
		? { color: colors.WHITE, background: colors.DARK_TEXT_BACKGROUND }
		: { color: colors.BLACK, background: colors.LIGHT_TEXT_BACKGROUND };
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
