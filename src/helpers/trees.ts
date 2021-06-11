/*
 * trees.ts
 * Copyright © 1993-2021, The Avail Foundation, LLC.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * * Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 * * Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 * * Neither the name of the copyright holder nor the names of the contributors
 *   may be used to endorse or promote products derived from this software
 *   without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * A generic, underspecified tree.
 *
 * @author Todd L Smith <todd@availlang.org>
 */
export interface Tree<T>
{
	/** The children of the tree. */
	childNodes?: Array<T>;
}

/**
 * Traverse the specified trees, in depth-first order, applying the given
 * function to each tree. Trees are visited before their children.
 *
 * @template T
 * @param {Array<T> | undefined} trees
 *   The trees, if any.
 * @param {(T) => void} visit
 *   The function to apply to each tree.
 * @param {T} parent
 *   The parent of the trees, if any.
 */
export const treesDo = <T extends Tree<T>> (
	trees: Array<T> | undefined,
	visit: (tree: T, parent?: T) => void,
	parent?: T) =>
{
	if (trees !== undefined)
	{
		for (const tree of trees)
		{
			visit(tree, parent);
			treesDo(tree.childNodes, visit, tree);
		}
	}
};

/**
 * Traverse the specified trees, in depth-first order, producing a tree that
 * contains only 1) those elements that satisfy the supplied predicate and 2)
 * those ancestors that are required for containment of those elements.
 *
 * @template T
 * @param {Array<T> | undefined} trees
 *   The trees, if any.
 * @param {(T) => boolean} filter
 *   The filter function to apply to each tree.
 * @return {Array<T>}
 *   Those trees that satisfied the predicate.
 */
export const treesFilter = <T extends Tree<T>> (
	trees: Array<T> | undefined,
	filter: (viewNode: T) => boolean): Array<T> =>
{
	if (trees !== undefined)
	{
		const newTrees = [];
		for (const tree of trees)
		{
			const childNodes = treesFilter(tree.childNodes, filter);
			if (childNodes.length > 0 || filter(tree))
			{
				newTrees.push({...tree, childNodes});
			}
		}
		return newTrees;
	}
	return [];
};

/**
 * Traverse the specified trees, in depth-first order, selecting every tree that
 * satisfies the supplied predicate.
 *
 * @template T
 * @param {Array<T> | undefined} trees
 *   The trees, if any.
 * @param {(T) => boolean} filter
 *   The filter function to apply to each tree.
 * @param {Array<T>} matches
 *   The accumulator for the matches. Defaults to an empty array.
 * @return {Array<T>}
 *   Those trees that satisfied the predicate, flattened into a single array.
 */
export const treesFlatFilter = <T extends Tree<T>> (
	trees: Array<T> | undefined,
	filter: (viewNode: T) => boolean,
	matches: Array<T> = []): Array<T> =>
{
	if (trees !== undefined)
	{
		for (const tree of trees)
		{
			if (filter(tree))
			{
				matches.push(tree);
			}
			treesFlatFilter(tree.childNodes, filter, matches);
		}
	}
	return matches;
};

/**
 * Translate an array of {@link Tree}s. Traverse the trees in depth-first order,
 * translating every tree that passes the filter, if provided, or has children.
 * Trees are visited after their children.
 *
 * @template S, D
 * @param {Array<S> | undefined} trees
 *   The `Tree`s.
 * @param {(S, S) => D} translate
 *   How to translate a tree. Is not responsible for translating children.
 * @param {(S) => boolean)} filter
 *   Whether to include a translation of this tree in the output. If
 *   `undefined`, then every tree will be mapped.
 * @param {(S, S) => number} compare
 *   How to compare trees. If `undefined`, then trees will not be presorted.
 * @param {S} parent
 *   The parent of the trees, if any.
 * @returns {Array<D>}
 *   The `Tree`s produced by translation.
 */
export const treesMap =
	<S extends Tree<S>, D extends Tree<D>> (
		trees: Array<S> | undefined,
		translate: (tree: S, parent?: S) => D,
		filter?: (tree: S) => boolean,
		compare?: (a: S, b: S) => number,
		parent?: S): Array<D> =>
	{
		if (trees !== undefined)
		{
			const newTrees: Array<D> = [];
			const orderedTrees = compare !== null
				? [...trees].sort(compare)
				: trees;
			for (const tree of orderedTrees)
			{
				const copy = {...tree};
				const childNodes =
					treesMap(copy.childNodes, translate, filter, compare, copy);
				if (childNodes.length > 0 || filter === undefined || filter(copy))
				{
					const newTree = translate(copy, parent);
					newTree.childNodes = childNodes;
					newTrees.push(newTree);
				}
			}
			return newTrees;
		}
		return [];
	};

/**
 * Map an array of {@link Tree}s into a flat array. Traverse the trees in
 * depth-first order. Trees are visited after their children.
 *
 * @template S, D
 * @param {Array<S> | undefined} trees
 *   The `Tree`s.
 * @param {(S) => D} translate
 *   How to translate a tree. Is not responsible for translating children.
 * @param {(S) => boolean)} filter
 *   Whether to include a translation of this tree in the output. If
 *   `undefined`, then every tree will be mapped.
 * @param {Array<D>} newTrees
 *   The accumulator for the result. Defaults to an empty array.
 * @returns {Array<D>}
 *   The values produced by translation.
 */
export const treesFlatMap =
	<S extends Tree<S>, D> (
		trees: Array<S> | undefined,
		translate: (tree: S) => D,
		filter?: (tree: S) => boolean,
		newTrees: Array<D> = []): Array<D> =>
	{
		if (trees !== undefined)
		{
			for (const tree of trees)
			{
				const copy = {...tree};
				const childNodes =
					treesFlatMap(copy.childNodes, translate, filter, newTrees);
				if (childNodes.length > 0 || filter === undefined || filter(copy))
				{
					newTrees.push(translate(copy));
				}
			}
			return newTrees;
		}
		return [];
	};

/**
 * Translate an existing array of {@link Tree}s using new structure and data.
 * Traverse the trees simultaneously in depth-first order, translating every
 * merged tree that passes the filter, if provided, or has children. Trees are
 * visited after their children.
 *
 * @template S, D
 * @param {Array<S> | undefined} oldTrees
 *   The old `Tree`s.
 * @param {Array<S> | undefined} newTrees
 *   The new `Tree`s.
 * @param {(S, S) => number} compare
 *   How to compare the keys of two trees. Must produce a signum.
 * @param {(S) => D} translate
 *   How to translate a merged tree. Is not responsible for translating
 *   children.
 * @param {(S, S) => S} merge
 *   How to reconcile two trees that are equivalent by key. Does not
 *   have access to children. If `undefined`, the merged
 *   tree will be the result of layering the new tree onto the old tree.
 * @param {(S) => boolean)} filter
 *   Whether to include a merged tree in the output. If `undefined`, then every
 *   merged tree will be included.
 * @param {(S) => void} retire
 *   How to retire an old tree, if necessary. If `defined`, then no retirement
 *   will occur.
 * @param {boolean} sort
 *   `true` iff presorting of trees is desired.
 * @returns {Array<D>}
 *   The `Tree`s produced by translation.
 */
export const treesUpdate =
	<S extends Tree<S>, D extends Tree<D>> (
		oldTrees: Array<S> | undefined,
		newTrees: Array<S> | undefined,
		compare: (a: S, b: S) => number,
		translate: (tree: S) => D,
		merge?: (oldTree: S, newTree: S) => S,
		filter?: (tree: S) => boolean,
		retire?: (oldTree: S) => void,
		sort?: boolean): Array<D> =>
	{
		// If no old trees were supplied, then just translate the new trees.
		if (oldTrees === undefined)
		{
			return treesMap(newTrees, translate, filter, compare);
		}
		// If no new trees were supplied, then retire the old trees. Answer an empty
		// array.
		if (newTrees === undefined)
		{
			if (retire !== undefined)
			{
				treesDo(oldTrees, retire);
			}
			return [];
		}
		// Sort the trees if requested.
		const [oldSourceTrees, newSourceTrees] = sort === true
			? [[...oldTrees].sort(compare), [...newTrees].sort(compare)]
			: [oldTrees, newTrees];
		// Iterate through both trees simultaneously.
		const resultTrees: Array<D> = [];
		for (
			let i = 0, j = 0;
			i < oldSourceTrees.length && j < newSourceTrees.length; )
		{
			const oldTree = {...oldSourceTrees[i]};
			const newTree = {...newSourceTrees[j]};
			const signum = compare(oldTree, newTree);
			// If the tree nodes are equivalent under key comparison, then merge
			// and translate them. Old versions of merged trees are not retired.
			if (signum === 0)
			{
				const mergedTree = merge !== undefined
					? merge(oldTree, newTree)
					: {...oldTree, ...newTree};
				const childNodes = treesUpdate(
					oldTree.childNodes,
					newTree.childNodes,
					compare,
					translate,
					merge,
					filter,
					retire,
					sort);
				if (childNodes.length > 0
					|| filter === undefined
					|| filter(mergedTree))
				{
					const resultTree = translate(mergedTree);
					resultTree.childNodes = childNodes;
					resultTrees.push(resultTree);
				}
				// Advance both indices.
				i++;
				j++;
			}
				// If an old tree is not present in the new collection of trees, then
			// retire it.
			else if (signum < 0)
			{
				if (retire !== undefined)
				{
					treesDo([oldTree], retire);
				}
				// Advance only the index into the old trees.
				i++;
			}
				// If a new tree is present that was not in the collection of old trees,
			// then translate it.
			else // signum > 0
			{
				const childNodes = treesMap(
					newTree.childNodes,
					translate,
					filter,
					compare,
					newTree);
				if (childNodes.length > 0
					|| filter === undefined
					|| filter(newTree))
				{
					const resultTree = translate(newTree);
					resultTrees.push(resultTree);
				}
				// Advance only the index into the new trees.
				j++;
			}
		}
		return resultTrees;
	};
