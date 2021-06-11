import {ExtendedCodeExampleData} from "../components/CodeExample";
import {WebsiteStrings} from "../internationalization/strings";
import {codeLineArray, codeStyle} from "../components/CodeBlock";

/**
 * The first code {@link ExtendedCodeExampleData code example}.
 */
export const e2: ExtendedCodeExampleData =
{
	queryStringTitle: "legacy-code-interoperability",
	heading: (strings: WebsiteStrings) =>
		strings.codeExamples.exampleTwoHeading,
	description: (strings: WebsiteStrings) =>
		strings.codeExamples.exampleTwoIntroduction,
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
		]]
	]),
	codeOutput: ["Wow, very wow."]
};
