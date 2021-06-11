import {ExtendedCodeExampleData} from "../components/CodeExample";
import {WebsiteStrings} from "../internationalization/strings";
import {codeLineArray, codeStyle} from "../components/CodeBlock";

/**
 * The first code {@link ExtendedCodeExampleData code example}.
 */
export const e1: ExtendedCodeExampleData =
{
	queryStringTitle: "method-translations-with-aliases",
	heading: (strings: WebsiteStrings) =>
		strings.codeExamples.exampleOneHeading,
	description: (strings: WebsiteStrings) =>
		strings.codeExamples.exampleOneIntroduction,
	featured: true,
	codeLines: codeLineArray([
		// This uses an array-based shorthand to add lines and indents.
		[0, [
				["Some ", codeStyle.BLUE],
				["code"],
				["() ", codeStyle.GREEN],
				["and ", codeStyle.DYNAMIC_HIGHLIGHT_1],
				["more ", codeStyle.RED],
				["stuff", codeStyle.MAGENTA],
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
		]],
		// Filling extra line at the end for layout demo.
		...Array(18).fill([0, [
				["more"],
		]]),
	]),
	codeOutput: ["Greeting complete."]
};




