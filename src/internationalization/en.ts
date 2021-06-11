import { thisYear } from "../helpers/datetime";
import { WebsiteStrings } from "./strings";

/** English text content. */
export const en: WebsiteStrings =
{
	longName: "The Avail Programming Language.",
	shortPitch: "One language encompassing all others.",
	githubCta1: "Get the latest on GitHub",
	githubCta2: "Learn more or get in touch on GitHub",
	copyright: `${thisYear()} The Avail Foundation LLC. All
		rights reserved.`,
	frontPage:
	{
		introduction:
		[
			`Avail is a multi-paradigmatic general purpose programming 
			language whose feature set emphasizes support for articulate programming.
			Avail is an open-source project that comprises a language
			virtual machine and a standard library. Both are released under the
			3-clause BSD license.`,
			`Traditional programming languages provide only small
			context-free grammars and low-level values. They are therefore well suited
			for solving software engineering problems, but poorly suited for solving 
			problems of other kinds. This is unfortunate, because the overwhelming 
			majority of programs target some other domain. The vocabulary and concepts 
			of bits, bytes, loops, arrays, and floating point numbers are extremely 
			poorly suited for tackling everyday problems in chemistry, banking, 
			insurance, pharmacology, linguistics, and a thousand other fields.`,
		],
		examplesLabel: "Avail in Action"
	},
	codeExamples:
	{
		exampleOneHeading: "A Field of Dreams",
		exampleOneIntroduction: 
		[
			`The articulate programming paradigm espoused by Avail is not
			about writing programs in natural language. I cannot be more explicit about
			this: programs should not be written using natural language. I ask the
			court, who on earth wants to write code like this?`
		],
		exampleTwoHeading: "More Types of Things",
		exampleTwoIntroduction:
		[
			`This example has clearly been taken to its absurd, ham-fisted
			extreme, and there are certainly less horrible ways to implement the
			quadratic formula using natural language. But every solution that uses
			natural language is going to have a similar bouquet of horribleness,
			because natural language is exceptionally poorly suited to mathematical
			discourse. There is a huge mismatch between the problem domain and the
			solution domain. Natural language is the wrong language for the job.`,
			`With a few more planned updates to our compiler, like macros
			(methods that run on phrases to produce phrases), we could actually write
			something like the silliness above. But a real Avail implementation would
			look more like this:`
		],
		exampleThreeHeading: "And Another Thing",
		exampleThreeIntroduction:
		[
			`It just so happens that articulate programming often employs
			pidgins of natural language, because there are very many contexts in which
			it is actually quite useful. Consider the following official Avail example,
			which implements a short choosable path story based on the British sci-fi
			comedy franchise, Red Dwarf:`
		]
	}
};
