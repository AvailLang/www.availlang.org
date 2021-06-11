import {ExtendedCodeExampleData} from "../components/CodeExample";
import {e1} from "./e1";
import {e2} from "./e2";
import {e3} from "./e3";

/**
 * An array holding all code examples, including their extended data.
 * 
 * @author Tristan J Berto <hello@tristanberto.com>
 */
export const codeExamples: ExtendedCodeExampleData[] = [ e1, e2, e3 ];

/** An array of code examples to be featured on the homepage. */
export const featuredExamples = 
	codeExamples.filter(example => example.featured);
