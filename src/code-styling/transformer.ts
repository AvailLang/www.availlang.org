/**
 * Herein lies the functions for taking an Avail styling syntax tree object and
 * flattening it into a flattened array of segmented styling objects.
 */

import { CSSProperties } from "react";
import {
	ClassifierStyleSet,
	CodeStyleProps,
	semanticClassifierMapper,
	themes
} from "./code-theme";

/**
 * The default theme chosen if none specified.
 * @type {CodeStyleProps}
 */
const DEFAULT_THEME: CodeStyleProps = themes.defaultTheme.dark;

/**
 * Occurs when there is a problem with the input data (InputSegmentsTree).
 */
class MalformedInputTreeError extends Error {}

/**
 * The interface that describes a metadata input object.
 */
export interface Metadata
{
	/**
	 * The tag used to look up the {@link ClassifierStyleSet} using
	 * {@link semanticClassifierMapper}.
	 * @type {string}
	 */
	semanticClassifier: string;

	/**
	 * The Avail Module where the `methodName` originates.
	 * @type {string}
	 */
	sourceModule: string;

	/**
	 * The name of the Avail method that the segments array represents.
	 * @type {string}
	 */
	methodName?: string;

	/**
	 * `false` if the method name that the lexeme segments represent are from
	 * actual written code in the `sourceModule` or `true` if the method name
	 * was constructed as a result of code generation (indicates it does not
	 * have a literal representation as a method in code).
	 * @type {boolean}
	 */
	generated: boolean;

	/**
	 * The line number where the `methodName` definition can be located in the
	 * `sourceModule` if `generated is false`. Otherwise.... TODO
	 * @type {number}
	 */
	lineNumber: number;
}

/**
 * This represents the s-expression tree type that is the input from Avail that
 * needs to be flattened for styling.
 *
 * Each tree **must** have the following form:
 *  * Starts with an array of string lexeme segments that represent either:
 *    * a method / macro name split at the underscores
 *    * a literal
 *  * An object, {@link Metadata}, that contains information about the
 *    represented array.
 *  * A non-empty array iff there are more than one strings in the segment array.
 */
type InputSegmentsTree = readonly [Metadata, string[], ...InputSegmentsTree[]];

/**
 * The object that represents the element in the flat array of styled text
 * that is the result of processing the {@link InputSegmentsTree}.
 */
export class OutputSegment
{
	/**
	 * The individual string that will be displayed with the accompanied style
	 * defined by `cssProps`.
	 */
	segment: string;

	/**
	 * The styles that are applied to the displayed `segment`.
	 * @type {React.CSSProperties}
	 */
	cssProps: CSSProperties;

	/**
	 * The name of the Avail method that the displayed `segment` is part of.
	 * @type {string}
	 */
	methodName: string;

	/**
	 * The Avail Module where the `methodName` originates.
	 * @type {string}
	 */
	sourceModule: string;

	/**
	 * `false` if the `methodName` is actual written code in the `sourceModule`
	 * or `true` if the `methodName` was constructed as a result of code
	 * generation (indicates it does not have a literal representation as a
	 * method in code).
	 * @type {boolean}
	 */
	generated: boolean;

	/**
	 * The line number where the `methodName` definition can be located in the
	 * `sourceModule` if `generated is false`. Otherwise.... TODO
	 * @type {number}
	 */
	lineNumber: number;

	/**
	 * The set of ids that represent the OutputSegments related to this
	 * OutputSegment.
	 * @type {Set<string>}
	 */
	idSet: Set<string>;

	/**
	 * Create a new OutputSegment.
	 *
	 * @param {string} segment
	 *   The individual string of characters to be stylized and displayed.
	 * @param {string} methodName
	 *   The name of the Avail method that the displayed `segment` is part of.
	 * @param {React.CSSProperties} cssProps
	 *   The styles to be applied.
	 * @param {Metadata} metadata
	 *   The originating `Metadata` associated with this segment as received in
	 *   the `InputSegmentsTree`.
	 * @param {Set<string>} idSet
	 *   The set of ids that represent the OutputSegments related to this
	 *   OutputSegment.
	 */
	constructor (
		segment: string,
		methodName: string,
		cssProps: CSSProperties,
		metadata: Metadata,
		idSet: Set<string>)
	{
		this.segment = segment;
		this.cssProps = cssProps;
		this.methodName = methodName;
		this.sourceModule = metadata.sourceModule;
		this.generated = metadata.generated;
		this.lineNumber = metadata.lineNumber;
		this.idSet = idSet;
	}

	/**
	 * Merge in the CSS properties.
	 *
	 * @param {React.CSSProperties} parentProps
	 *   The array of parent CSS Properties to merge in.
	 */
	addProps = (parentProps: Array<CSSProperties>) =>
	{
		// The spread operator uses all the keys and values on the left and
		// clobbers any key collisions with the key/values from the right.
		if (parentProps.length > 0)
		{
			let peekLast: CSSProperties = parentProps.splice(-1)[0];
			this.cssProps = {...peekLast, ...this.cssProps};
		}
		parentProps.push(this.cssProps);
	}
}

/**
 * An counter used to create element ids.
 */
class IdCounter
{
	/**
	 * The next counter value.
	 * @type {number}
	 */
	counter: number = 0;

	/**
	 * Provide the next id string.
	 * @returns {string}
	 */
	next = (): string =>
	{
		return "m" + (this.counter++);
	}
}

/**
 * The global IdCounter.
 * @type {IdCounter}
 */
const ID_COUNTER: IdCounter = new IdCounter();

/**
 * Map an array of {@link InputSegmentsTree}s into a flat array. Traverse the
 * trees in depth-first order. Trees are visited after their children.
 *
 * @template S, D
 * @param {InputSegmentsTree[]} trees
 *   The the S-expression tree.
 * @param {CodeStyleProps} theme
 *   The theme to use to style the {@link OutputSegment}s.
 * @param {string[]} methodNameStack
 *   The stack of method names that are used to populate the flattened array
 *   with {@link OutputSegment}s.
 * @param {CSSProperties[]} cssPropsStack
 *   The stack of CSSProperties that represent the style applied to each
 *   {@link OutputSegment}.
 */
export const inputSegmentsTreeTransformer = function* (
	trees: InputSegmentsTree,
	theme: CodeStyleProps = DEFAULT_THEME,
	methodNameStack: string[] = [],
	cssPropsStack: CSSProperties[] = [{}]
): Generator<OutputSegment, void>
{
	if (trees.length < 2)
	{
		throw new MalformedInputTreeError(
			"Expected receive a tree that had at least a string lexeme and a"
			+ " `Metadata`, but received a tree of size: " + trees.length);
	}

	// Grab the array of segments and the metadata that must be present at the
	// top of any tree.
	const [metadata, segments, ...children] = trees;
	const idSet = new Set<string>();

	if (segments.length === 0)
	{
		throw new MalformedInputTreeError(
			"Expected a non-empty segments array, but array was empty: "
				+ metadata);
	}

	// Acquire the appropriate ClassifierStyleSet that defines how this segment
	// should be styled.
	let classifierStyleSet : ClassifierStyleSet =
		semanticClassifierMapper(metadata.semanticClassifier, theme);

	let peekLast: CSSProperties = cssPropsStack.splice(-1)[0];
	let stackCssProps = {...peekLast, ...classifierStyleSet.childProps ?? {}};
	let cssProps = {...peekLast, ...classifierStyleSet.selfProps};

	// The method name must be extracted from the metadata if the metadata
	// is a MethodSpecificMetadata. If it is not, an inherited method name
	// must be taken from the top of the methodNameStack
	let methodName =
		metadata.methodName ?? methodNameStack.splice(-1)[0];

	if (segments.length === 1)
	{
		// We have reached a leaf in the tree and expect this to be the bottom
		// of this branch.
		if (children.length !== 0)
		{
			throw new MalformedInputTreeError(
				`Expected no children for ${segments} (with metadata: `
				+ `${metadata}), but received: ${children}`);
		}
		idSet.add(ID_COUNTER.next());
		// The final yield that marks the end of the recursion into this branch
		// of the tree.
		yield new OutputSegment(
			segments[0], methodName, cssProps, metadata, idSet);
	}
	else
	{
		if (children.length !== segments.length - 1)
		{
			throw new MalformedInputTreeError(
				`Expected to receive a ${segments.length - 1} `
				+ `InputSegmentsTree[] children but received: `
				+ children.length);
		}

		// The undo actions for any local effects that we've had on the
		// management stacks.
		const undoLocalEffects = [];

		// A copy of cssProps must be added for each segment in the segments
		// to make it available to its children.
		cssPropsStack.push(stackCssProps);
		undoLocalEffects.push(() => cssPropsStack.pop());

		// Establish how the method name is retrieved. Either it is inherited or
		// we must extract it from the metadata and pop it when this branch has
		// been processed.
		if (metadata.methodName !== undefined)
		{
			undoLocalEffects.push(() => methodNameStack.pop());
		}

		// Process each segment and the following subtree in segments. The last
		// segment does not have a subtree and will be processed after.
		for (let i = 0; i < segments.length - 2; i++)
		{
			idSet.add(ID_COUNTER.next());
			yield new OutputSegment(
				segments[i],
				methodName,
				cssProps,
				metadata,
				idSet);
			yield* inputSegmentsTreeTransformer(
				children[i],
				theme,
				methodNameStack,
				cssPropsStack);
		}
		idSet.add(ID_COUNTER.next());
		// End the recursion from this branch by yielding the final styled
		// OutputSegment.
		yield new OutputSegment(
			segments.splice(-1)[0],
			methodName,
			cssProps,
			metadata,
			idSet);

		/// Undo all local effects.
		undoLocalEffects.forEach(undo => undo());
	}
};