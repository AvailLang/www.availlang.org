import { ReactNode } from "react";
import {CodeBlock, CodeLine} from "./CodeBlock";
import { AppTheme } from "../helpers/theme";
import { WebsiteStrings } from "../internationalization/strings";
import { colors } from "../helpers/colors";

/**
 * The core data required to display an example of Avail code.
 *
 * @author Tristan J Berto <hello@tristanberto.com>
 */
export interface CodeExampleData
{
	/**	A title or heading for the example.*/
	heading: (strings: WebsiteStrings) => string;

	/** An array of descriptive paragraph text. */
	description: (strings: WebsiteStrings) => string[];

	/** The code example {@link CodeLine data}. */
	codeLines: CodeLine[];

	/** An array of {@link CodeLine output text} that the code might return. */
	codeOutput: string[];
}

/**
 * An extension of {@link CodeExampleData} that includes extended content
 * beyond what is displayed on the main page. This is intended for instance
 * pages for each example that might hold more explanation.
 *
 * @author Tristan J Berto <hello@tristanberto.com>
 */
export interface ExtendedCodeExampleData extends CodeExampleData
{
	/** 'true' iff the example is to be featured on the homepage.  */
	featured: boolean;

	/**
	 * A unique identifier for this example that will not change.
	 *
	 * This value will be used in the URI for this specific example:
	 * `https://availlang.org/examples?title=the-value-of-this-field`
	 *
	 * Changing it in the future may throw off some search engine results, so it's
	 * best not to change it for the life of the example.
	 *
	 * TODO: This is not currently used.
	 */
	queryStringTitle: string;

	/**
	 * Additional explanation, figures, etc. not displayed on the homepage.
	 *
	 * TODO: This is not currently used.
	 */
	longExplanation?: ReactNode;
}

/**
 * The React properties for a {@link CodeExample} component.
 * 
 * @author Tristan J Berto <hello@tristanberto.com>
 */
interface CodeExampleProps extends CodeExampleData
{
	/** The element's children. */
	children?: ReactNode;

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
		heading,
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
		? 
			{ 
				color: colors.WHITE, 
				background: colors.DARK_TEXT_BACKGROUND 
			}
		: 
			{ 
				color: colors.BLACK, 
				background: colors.LIGHT_TEXT_BACKGROUND 
			};
	const outputStyle = theme === AppTheme.DARK
		? 
			{ 
				color: colors.WHITE, 
				background: colors.DARK_CODE_BACKGROUND_SECONDARY 
			}
		: 
			{ 
				color: colors.BLACK, 
				background: colors.LIGHT_CODE_BACKGROUND_SECONDARY 
			};
	return(
		<div className="code-example">
			<div className="code-display">
				<div className="description" style={descriptionStyle}>
					<h4>{heading(strings)}</h4>
					{descriptionParagraphs}
				</div>
				<div className="code-and-output">
					<CodeBlock lines={codeLines} theme={theme}/>
					<div className="code-output" style={outputStyle}>
						{
							outputParagraphs.length !== 0 
								? outputParagraphs 
								: noOutput
						}
					</div>
				</div>
			</div>
			{children}
		</div>
	)
};

/** A paragraph element indicating a code sample with no expected output. */
const noOutput = <p style={{opacity: .6}}><em>No Output</em></p>;
