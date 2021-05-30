import { ReactNode } from "react";
import { CodeLine, codeStyle } from "../components/CodeBlock";
import { WebsiteStrings } from "../internationalization/strings";

/**
 * The core data required to display an example of Avail code.
 * 
 * @author Tristan J Berto <hello@tristanberto.com>
 */
export interface CodeExampleData
{
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

	/** Additional content to display on a dedicated example instance view. */
	longExplanation?: ReactNode;
}

/**
 * An array holding all code examples, including their extended data.
 * 
 * @author Tristan J Berto <hello@tristanberto.com>
 */
export const codeExamples: ExtendedCodeExampleData[] =
[
	{
		description: (strings: WebsiteStrings) =>
			strings.codeExamples.exampleOneIntroduction,
		featured: true,
		codeLines: 
		[
			{
				content:
				[
					{
						text: "some ",
						style: () => codeStyle.BLUE
					},
					{
						text: "code",
						style: codeStyle.DYNAMIC_BASE
					},
					{
						text: "() ",
						style: () => codeStyle.GREEN
					},
					{
						text: "and ",
						style: codeStyle.DYNAMIC_HIGHLIGHT_1
					},
					{
						text: "more ",
						style: () => codeStyle.RED
					},
					{
						text: "stuff",
						style: () => codeStyle.MAGENTA
					},
					{
						text: "{}",
						style: codeStyle.DYNAMIC_HIGHLIGHT_1
					}
				],
				indent: 0
			},
			{
				content:
				[
					{
						text: "some ",
						style: () => codeStyle.BLUE
					},
					{
						text: "code",
						style: codeStyle.DYNAMIC_BASE
					},
					{
						text: "() ",
						style: () => codeStyle.GREEN
					},
					{
						text: "and ",
						style: codeStyle.DYNAMIC_HIGHLIGHT_1
					},
					{
						text: "more ",
						style: () => codeStyle.RED
					},
					{
						text: "stuff",
						style: () => codeStyle.MAGENTA
					},
					{
						text: "{}",
						style: codeStyle.DYNAMIC_HIGHLIGHT_1
					}
				],
				indent: 1
			},
			{
				content:
				[
					{
						text: "some ",
						style: () => codeStyle.BLUE
					},
					{
						text: "code",
						style: codeStyle.DYNAMIC_BASE
					},
					{
						text: "() ",
						style: () => codeStyle.GREEN
					},
					{
						text: "and ",
						style: codeStyle.DYNAMIC_HIGHLIGHT_1
					},
					{
						text: "more ",
						style: () => codeStyle.RED
					},
					{
						text: "stuff",
						style: () => codeStyle.MAGENTA
					},
					{
						text: "{}",
						style: codeStyle.DYNAMIC_HIGHLIGHT_1
					}
				],
				indent: 0
			},
			{
				content: [{text: "more", style: codeStyle.DYNAMIC_BASE}],
				indent: 0
			},
			{
				content: [{text: "more", style: codeStyle.DYNAMIC_BASE}],
				indent: 0
			},
			{
				content: [{text: "more", style: codeStyle.DYNAMIC_BASE}],
				indent: 0
			},
			{
				content: [{text: "more", style: codeStyle.DYNAMIC_BASE}],
				indent: 0
			},
			{
				content: [{text: "more", style: codeStyle.DYNAMIC_BASE}],
				indent: 0
			},
			{
				content: [{text: "more", style: codeStyle.DYNAMIC_BASE}],
				indent: 0
			},
			{
				content: [{text: "more", style: codeStyle.DYNAMIC_BASE}],
				indent: 0
			},
			{
				content: [{text: "more", style: codeStyle.DYNAMIC_BASE}],
				indent: 0
			},
			{
				content: [{text: "more", style: codeStyle.DYNAMIC_BASE}],
				indent: 0
			},
			{
				content: [{text: "more", style: codeStyle.DYNAMIC_BASE}],
				indent: 0
			},
			{
				content: [{text: "more", style: codeStyle.DYNAMIC_BASE}],
				indent: 0
			},
			{
				content: [{text: "more", style: codeStyle.DYNAMIC_BASE}],
				indent: 0
			},
			{
				content: [{text: "more", style: codeStyle.DYNAMIC_BASE}],
				indent: 0
			},
			{
				content: [{text: "more", style: codeStyle.DYNAMIC_BASE}],
				indent: 0
			},
			{
				content: [{text: "more", style: codeStyle.DYNAMIC_BASE}],
				indent: 0
			},
			{
				content: [{text: "more", style: codeStyle.DYNAMIC_BASE}],
				indent: 0
			}
		],
		codeOutput: ["Greeting complete."]		
	},
	{
		description: (strings: WebsiteStrings) =>
			strings.codeExamples.exampleTwoIntroduction,
		featured: true,
		codeLines: 
		[
			{
				content:
				[
					{
						text: "some ",
						style: () => codeStyle.BLUE
					},
					{
						text: "code",
						style: codeStyle.DYNAMIC_BASE
					},
					{
						text: "() ",
						style: () => codeStyle.GREEN
					},
					{
						text: "and ",
						style: codeStyle.DYNAMIC_HIGHLIGHT_1
					},
					{
						text: "more ",
						style: () => codeStyle.RED
					},
					{
						text: "stuff",
						style: () => codeStyle.MAGENTA
					},
					{
						text: "{}",
						style: codeStyle.DYNAMIC_HIGHLIGHT_1
					}
				],
				indent: 0
			},
			{
				content:
				[
					{
						text: "some ",
						style: () => codeStyle.BLUE
					},
					{
						text: "code",
						style: codeStyle.DYNAMIC_BASE
					},
					{
						text: "() ",
						style: () => codeStyle.GREEN
					},
					{
						text: "and ",
						style: codeStyle.DYNAMIC_HIGHLIGHT_1
					},
					{
						text: "more ",
						style: () => codeStyle.RED
					},
					{
						text: "stuff",
						style: () => codeStyle.MAGENTA
					},
					{
						text: "{}",
						style: codeStyle.DYNAMIC_HIGHLIGHT_1
					}
				],
				indent: 1
			},
			{
				content:
				[
					{
						text: "some ",
						style: () => codeStyle.BLUE
					},
					{
						text: "code",
						style: codeStyle.DYNAMIC_BASE
					},
					{
						text: "() ",
						style: () => codeStyle.GREEN
					},
					{
						text: "and ",
						style: codeStyle.DYNAMIC_HIGHLIGHT_1
					},
					{
						text: "more ",
						style: () => codeStyle.RED
					},
					{
						text: "stuff",
						style: () => codeStyle.MAGENTA
					},
					{
						text: "{}",
						style: codeStyle.DYNAMIC_HIGHLIGHT_1
					}
				],
				indent: 0
			}
		],
		codeOutput: ["Wow, very wow."]		
	},
	{
		description: (strings: WebsiteStrings) => 
			strings.codeExamples.exampleThreeIntroduction,
		featured: true,
		codeLines: 
		[
			{
				content:
				[
					{
						text: "some ",
						style: () => codeStyle.BLUE
					},
					{
						text: "code",
						style: codeStyle.DYNAMIC_BASE
					},
					{
						text: "() ",
						style: () => codeStyle.GREEN
					},
					{
						text: "and ",
						style: codeStyle.DYNAMIC_HIGHLIGHT_1
					},
					{
						text: "more ",
						style: () => codeStyle.RED
					},
					{
						text: "stuff",
						style: () => codeStyle.MAGENTA
					},
					{
						text: "{}",
						style: codeStyle.DYNAMIC_HIGHLIGHT_1
					}
				],
				indent: 0
			},
			{
				content:
				[
					{
						text: "some ",
						style: () => codeStyle.BLUE
					},
					{
						text: "code",
						style: codeStyle.DYNAMIC_BASE
					},
					{
						text: "() ",
						style: () => codeStyle.GREEN
					},
					{
						text: "and ",
						style: codeStyle.DYNAMIC_HIGHLIGHT_1
					},
					{
						text: "more ",
						style: () => codeStyle.RED
					},
					{
						text: "stuff",
						style: () => codeStyle.MAGENTA
					},
					{
						text: "{}",
						style: codeStyle.DYNAMIC_HIGHLIGHT_1
					}
				],
				indent: 1
			},
			{
				content:
				[
					{
						text: "some ",
						style: () => codeStyle.BLUE
					},
					{
						text: "code",
						style: codeStyle.DYNAMIC_BASE
					},
					{
						text: "() ",
						style: () => codeStyle.GREEN
					},
					{
						text: "and ",
						style: codeStyle.DYNAMIC_HIGHLIGHT_1
					},
					{
						text: "more ",
						style: () => codeStyle.RED
					},
					{
						text: "stuff",
						style: () => codeStyle.MAGENTA
					},
					{
						text: "{}",
						style: codeStyle.DYNAMIC_HIGHLIGHT_1
					}
				],
				indent: 0
			}
		],
		codeOutput: []
	}
];

/** An array of code examples to be featured on the homepage. */
export const featuredExamples = 
	codeExamples.filter(example => example.featured);
