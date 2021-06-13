import { CSSProperties } from "react";
import { defaultCodeTheme } from "./default-code-theme";
import { yellowBlockTheme } from "../../sample/code-styling/yellow-block-theme";

/**
 * A classifier style set instance specifies the CSS properties to be used when
 * styling the characters belonging to its semantic classifier (`selfProps`) and
 * optionally specifies the CSS properties to be applied to each child element
 * (`childProps`) when the child's semantic classifier does not specifically
 * override that property with a different value.
 */
export interface ClassifierStyleSet
{
	/**
	 * The properties that should be applied to the characters and whitespace
	 * specific to this classifier, but not any of its children.
	 */
	selfProps: CSSProperties;

	/**
	 * Optionally, the properties that should be applied to the characters and
	 * whitespace specific to each child, recursively. If a child specifies its
	 * own `selfProps` that fully mask the parent's `childProps`, the effect of
	 * the parent's `childProps` is invisible for this child only. If it does
	 * not also fully mask the parent's `childProps` with a `childProps` of its
	 * own, the unmasked ancestor style elements will continue to propagate.
	 */
	childProps?: CSSProperties;
}

/**
 * A code style properties instance specifies the CSS properties for each
 * semantic classifier used to describe a lexical element of an Avail program.
 * When the source code is displayed, these properties are applied to all of the
 * printed characters belonging to that element, including the characters,
 * punctuation, and whitespace.
 */
export interface CodeStyleProps
{
	/**
	 * The characters and whitespace that define the boundaries and sections of
	 * an Avail code block. Note that Avail block delimiters ([ and ]) are not
	 * usually part of an enveloping expression; this contrasts with other
	 * programming languages that require parentheses around an `if` condition
	 * and/or braces around the `then` block. In these languages, the
	 * delimiters are part of the expression itself. In Avail, certain contexts
	 * may accept either a single compact expression or an entire delimited
	 * block to evaluate to a single value, so the delimiters are always
	 * interpreted as part of the contents, and not part of the context.
	 */
	BLOCK: ClassifierStyleSet;

	/**
	 * The characters and whitespace that signal a method is being defined,
	 * excluding the method name and definition block.
	 */
	METHOD_DEFINITION: ClassifierStyleSet;

	/**
	 * The code establishing a method name, or identifying the structure of a
	 * method call within a string literal used as part of a method name (i.e.
	 * method name metacharacters). In Avail code, methods may be named using
	 * any string- or atom-valued expression. In practice, it would make little
	 * sense to style an expression or block used to calculate a method name in
	 * a special way just because it is used inline in a method definition, so
	 * for the purposes of styling, only string literals, atom literals, atom
	 * creation sends that embed a string literal, and uses of single string or
	 * atom variables or constants will be classified this way. When a lexical
	 * element is classified as a METHOD_NAME, that style is applied to all
	 * characters that are outside the string literal literal AND all method
	 * name metacharacters that are inside the string literal, including the
	 * meta-escape-character ` but not the characters being escaped.
	 */
	METHOD_NAME: ClassifierStyleSet;

	/**
	 * The name of a parameter being declared. Does not include its type or
	 * value.
	 */
	PARAMETER_DEFINITION: ClassifierStyleSet;

	/**
	 * The usage of a parameter.
	 */
	PARAMETER_USE: ClassifierStyleSet;

	/**
	 * The elements of a method name that indicate that method is being called,
	 * but not any arguments being passed.
	 */
	METHOD_SEND: ClassifierStyleSet;

	/**
	 * The terminator that indicates the immediately-preceding code was a
	 * statement.
	 */
	STATEMENT: ClassifierStyleSet;

	/**
	 * The type of something being declared.
	 */
	TYPE: ClassifierStyleSet;

	/**
	 * The header keywords that appear in the header of a module.
	 */
	MODULE_HEADER: ClassifierStyleSet;

	/**
	 * The module version.
	 */
	VERSION: ClassifierStyleSet;

	/**
	 * The import section in a module.
	 */
	IMPORT: ClassifierStyleSet;

	/**
	 * The export section in a module.
	 */
	EXPORT: ClassifierStyleSet;

	/**
	 * The entry points section in a module.
	 */
	ENTRY_POINT: ClassifierStyleSet;

	/**
	 * Line and block comments, including delimiters.
	 */
	COMMENT: ClassifierStyleSet;

	/**
	 * Documentation blocks, including delimiters and documentation tag
	 * contents.
	 */
	DOCUMENTATION: ClassifierStyleSet;

	/**
	 * Tags used inside documentation blocks, but not their contents.
	 */
	DOCUMENTATION_TAG: ClassifierStyleSet;

	/**
	 * The name of a module-level constant being defined. Does not include its
	 * type or value.
	 */
	MODULE_CONSTANT_DEFINITION: ClassifierStyleSet;

	/**
	 * The name of a module-level variable being declared. Does not include its
	 * type or value (if any value is being assigned).
	 */
	MODULE_VARIABLE_DECLARATION: ClassifierStyleSet;

	/**
	 * The name of a locally-scoped constant being defined. Does not include its
	 * type or value.
	 */
	LOCAL_CONSTANT_DEFINITION: ClassifierStyleSet;

	/**
	 * The name of a locally-scoped variable being declared. Does not include
	 * its type or value (if any value is being assigned).
	 */
	LOCAL_VARIABLE_DECLARATION: ClassifierStyleSet;

	/**
	 * The use of a module-level constant.
	 */
	MODULE_CONSTANT_USE: ClassifierStyleSet;

	/**
	 * The use of a module-level variable.
	 */
	MODULE_VARIABLE_USE: ClassifierStyleSet;

	/**
	 * The use of a local constant.
	 */
	LOCAL_CONSTANT_USE: ClassifierStyleSet;

	/**
	 * The use of a local variable.
	 */
	LOCAL_VARIABLE_USE: ClassifierStyleSet;

	/**
	 * A string literal, including quotation marks around it. Does not include
	 * escape sequences.
	 */
	STRING_LITERAL: ClassifierStyleSet;

	/**
	 * A string escape sequence, including both the escape character \ and the
	 * character(s) that follow it that are being escaped. ALL escape sequences
	 * are styled similarly, even \\ and \", which serve to mark the escape
	 * character \ and the delimiter " as actual characters within the string.
	 */
	STRING_ESCAPE_SEQUENCE: ClassifierStyleSet;

	/**
	 * A numeric literal, including digits, punctuation, and numeric control
	 * characters that indicate base or format (such as 0x, f, e, etc.).
	 */
	NUMERIC_LITERAL: ClassifierStyleSet;

	/**
	 * A boolean literal `true` or `false`.
	 */
	BOOLEAN_LITERAL: ClassifierStyleSet;

	/**
	 * The punctuation characters used to define a tuple, but not the names or
	 * literal values of its elements.
	 */
	TUPLE_LITERAL: ClassifierStyleSet;

	/**
	 * The punctuation characters used to define a set, but not the names or
	 * literal values of its elements.
	 */
	SET_LITERAL: ClassifierStyleSet;

	/**
	 * The punctuation characters used to define a map, but not the names or
	 * literal values of its keys or values.
	 */
	MAP_LITERAL: ClassifierStyleSet;

	/**
	 * A character literal, including delimiters.
	 */
	CHARACTER_LITERAL: ClassifierStyleSet;

	/**
	 * TODO
	 */
	ATOM_LITERAL: ClassifierStyleSet;

	/**
	 * The "keywords" indicating a conditional expression, but not its boolean
	 * expressions or block delimiters.
	 */
	CONDITIONAL: ClassifierStyleSet;

	/**
	 * The "keywords" indicating a loop expression, but not its boolean
	 * expressions or block delimiters.
	 */
	LOOP: ClassifierStyleSet;

	/**
	 * The label that identifies a continuation, but not block delimiters.
	 */
	LABEL: ClassifierStyleSet;

	/**
	 * The characters and whitespace that signal a lexer is being defined,
	 * excluding the lexer name and definition block.
	 */
	LEXER_DEFINITION: ClassifierStyleSet;

	/**
	 * The characters and whitespace that signal a macro is being defined,
	 * excluding the macro name and definition block.
	 */
	MACRO_DEFINITION: ClassifierStyleSet;

	/**
	 * The elements of a macro name that indicate that macro is being called,
	 * but not any arguments being passed.
	 */
	MACRO_SEND: ClassifierStyleSet;

	/**
	 * The characters and whitespace that signal a semantic restriction is being
	 * defined for a method, excluding the method name and definition block.
	 */
	SEMANTIC_RESTRICTION_DEFINITION: ClassifierStyleSet;

	/**
	 * The characters and whitespace that signal a grammatical restriction is
	 * being defined for a method or macro, excluding the name and definition
	 * block.
	 */
	GRAMMATICAL_RESTRICTION_DEFINITION: ClassifierStyleSet;

	/**
	 * The characters and whitespace that signal a seal is being placed,
	 * excluding the method name and signature types that the seal envelops.
	 */
	SEAL_DEFINITION: ClassifierStyleSet;

	// TODO
	OBJECT_TYPE_DEFINITION: ClassifierStyleSet;

	// TODO
	METATYPE: ClassifierStyleSet;

	// TODO
	PHRASE: ClassifierStyleSet;

	// TODO
	PHRASE_TYPE: ClassifierStyleSet;

	// TODO
	RETURN_VALUE: ClassifierStyleSet;

	// TODO
	NONLOCAL_CONTROL: ClassifierStyleSet; // (for Restart, Exit, etc.)

	// TODO
	PRIMITIVE_BLOCK: ClassifierStyleSet;

	// TODO
	SPECIAL_OBJECT_DEFINITION: ClassifierStyleSet;
}

/**
 * A code theme instance specifies the CodeStyleProps instances that are to be
 * used when code is viewed in light and dark mode.
 */
export interface CodeTheme
{
	light: CodeStyleProps;
	dark: CodeStyleProps;
}

export enum CodeThemeModeSelector
{
	light = "light",
	dark = "dark"
}

/**
 * All known themes should be added to this object.
 */
export const themes = {
	defaultTheme: defaultCodeTheme,
	sample1: yellowBlockTheme
};
