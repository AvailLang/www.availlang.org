import {ExtendedCodeExampleData} from "../components/CodeExample";
import {WebsiteStrings} from "../internationalization/strings";
import {codeLineArray, codeStyle} from "../components/CodeBlock";

/**
 * The first code {@link ExtendedCodeExampleData code example}.
 */
export const e3: ExtendedCodeExampleData =
{
	queryStringTitle: "natural-language-method-syntax",
	heading: (strings: WebsiteStrings) =>
		strings.codeExamples.exampleThreeHeading,
	description: (strings: WebsiteStrings) =>
		strings.codeExamples.exampleThreeIntroduction,
	featured: true,
	codeLines: codeLineArray([
		// This uses an array-based shorthand to add lines and indents.
		[
			["TODO", codeStyle.TEMP_REMOVE]
		]
	]),
	codeOutput: []
};
