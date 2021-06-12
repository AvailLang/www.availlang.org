import { CSSProperties } from "react";
import { defaultCodeTheme } from "./default-code-theme";

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
	 * an Avail code block.
	 */
	BLOCK: CSSProperties;

	/**
	 * The characters and whitespace that signal a method is being defined,
	 * excluding the method name and definition block.
	 */
	METHOD_DEFINER: CSSProperties;

	/**
	 * The name of a method being defined, including quotation marks around the
	 * method name string.
	 */
	METHOD_NAME: CSSProperties;

	/**
	 * The name of a parameter being declared.
	 */
	PARAMETER_NAME: CSSProperties;

	/**
	 * The usage of a parameter.
	 */
	PARAMETER_USE: CSSProperties;

	/**
	 * When a message send is done inside the method declaration block, SEND
	 * elements include the method name elements used, but not its arguments.
	 */
	SEND: CSSProperties;

	/**
	 * The terminator that indicates the immediately-preceding code was a
	 * statement.
	 */
	STATEMENT: CSSProperties;

	/**
	 * The type
	 */
	TYPE: CSSProperties;
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
	defaultTheme: defaultCodeTheme
};
