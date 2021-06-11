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
		[0, [
			["Some code"],
			["() ", codeStyle.GREEN],
			["and "],
			["more ", codeStyle.RED],
			["stuff"],
			["{}", codeStyle.DYNAMIC_HIGHLIGHT_1]
		]],
		[1, [
			["Some ", codeStyle.BLUE],
			["code"],
			["() ", codeStyle.GREEN],
			["and ", codeStyle.DYNAMIC_HIGHLIGHT_1],
			["more ", codeStyle.RED],
			["stuff", codeStyle.MAGENTA],
			["{}", codeStyle.DYNAMIC_HIGHLIGHT_1]
		]],
		[0, [
			["Some ", codeStyle.BLUE],
			["code"],
			["() ", codeStyle.GREEN],
			["and ", codeStyle.DYNAMIC_HIGHLIGHT_1],
			["more ", codeStyle.RED],
			["stuff", codeStyle.MAGENTA],
			["{}", codeStyle.DYNAMIC_HIGHLIGHT_1]
		]]
	]),
	codeOutput: []
};
