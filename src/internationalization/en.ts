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
			`Avail is specialized for creating other programming languages. With
			its universal parser, rich algebraic type lattice, deep reflective
			faculties, and JVM interoperability, Avail excels at creating and
			even *becoming* another language.`,
			`Avail comes equipped with an extensive standard library that
			establishes a large foundational grammar and vocabulary, comfortably
			mixing elements of natural language and mathematical formalism, but
			the bootstrap language has no fixed keywords or operators, allowing
			it to be fully localized for any language or locale.`,
			`Avail is generally used as a standalone programming language, but
			the Avail VM is easily embedded into a JVM host application, and
			provides an extensive FFI for bidirectional coordination with such a
			host.`
		],
		examplesLabel: "Avail in Action"
	},
	codeExamples:
	{
		exampleOneHeading: "A Field of Dreams",
		exampleOneIntroduction: 
		[
			`The articulate programming paradigm espoused by Avail is not about
			writing programs in natural language. I cannot be more explicit
			about this: programs should not be written using natural language. I
			ask the court, who on earth wants to write code like this?`
		],
		exampleTwoHeading: "More Types of Things",
		exampleTwoIntroduction:
		[
			`This example has clearly been taken to its absurd, ham-fisted
			extreme, and there are certainly less horrible ways to implement the
			quadratic formula using natural language. But every solution that
			uses natural language is going to have a similar bouquet of
			horribleness, because natural language is exceptionally poorly
			suited to mathematical discourse. There is a huge mismatch between
			the problem domain and the solution domain. Natural language is the
			wrong language for the job.`,
			`With a few more planned updates to our compiler, like macros
			(methods that run on phrases to produce phrases), we could actually
			write something like the silliness above. But a real Avail
			implementation would look more like this:`
		],
		exampleThreeHeading: "And Another Thing",
		exampleThreeIntroduction:
		[
			`It just so happens that articulate programming often employs
			pidgins of natural language, because there are very many contexts in
			which it is actually quite useful. Consider the following official
			Avail example, which implements a short choosable path story based
			on the British sci-fi comedy franchise, Red Dwarf:`
		]
	}
};
