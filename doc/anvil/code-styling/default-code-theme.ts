import { ClassifierStyleSet, CodeStyleProps, CodeTheme } from "./code-theme";

// The file-default color of all light-mode properties.
const baseStyleLight: ClassifierStyleSet = {
	selfProps: { color: "black" }
	// Do not impose child styling
};

// The file-default color of all dark-mode properties.
const baseStyleDark: ClassifierStyleSet = {
	selfProps: { color: "white" }
	// Do not impose child styling
};

// The file-default properties for all light-mode semantic classifiers. Any may
// // be explicitly overridden in the exported object.
const basePropsLight: CodeStyleProps = {
	ATOM_LITERAL: baseStyleLight,
	BLOCK: baseStyleLight,
	BOOLEAN_LITERAL: baseStyleLight,
	CHARACTER_LITERAL: baseStyleLight,
	COMMENT: baseStyleLight,
	CONDITIONAL: baseStyleLight,
	DOCUMENTATION: baseStyleLight,
	DOCUMENTATION_TAG: baseStyleLight,
	ENTRY_POINT: baseStyleLight,
	EXPORT: baseStyleLight,
	GRAMMATICAL_RESTRICTION_DEFINITION: baseStyleLight,
	IMPORT: baseStyleLight,
	LABEL: baseStyleLight,
	LEXER_DEFINITION: baseStyleLight,
	LOCAL_CONSTANT_DEFINITION: baseStyleLight,
	LOCAL_CONSTANT_USE: baseStyleLight,
	LOCAL_VARIABLE_DECLARATION: baseStyleLight,
	LOCAL_VARIABLE_USE: baseStyleLight,
	LOOP: baseStyleLight,
	MACRO_DEFINITION: baseStyleLight,
	MACRO_SEND: baseStyleLight,
	MAP_LITERAL: baseStyleLight,
	METATYPE: baseStyleLight,
	METHOD_DEFINITION: baseStyleLight,
	METHOD_NAME: baseStyleLight,
	METHOD_SEND: baseStyleLight,
	MODULE_CONSTANT_DEFINITION: baseStyleLight,
	MODULE_CONSTANT_USE: baseStyleLight,
	MODULE_HEADER: baseStyleLight,
	MODULE_VARIABLE_DECLARATION: baseStyleLight,
	MODULE_VARIABLE_USE: baseStyleLight,
	NONLOCAL_CONTROL: baseStyleLight,
	NUMERIC_LITERAL: baseStyleLight,
	OBJECT_TYPE_DEFINITION: baseStyleLight,
	PARAMETER_DEFINITION: baseStyleLight,
	PARAMETER_USE: baseStyleLight,
	PHRASE: baseStyleLight,
	PHRASE_TYPE: baseStyleLight,
	PRIMITIVE_BLOCK: baseStyleLight,
	RETURN_VALUE: baseStyleLight,
	SEAL_DEFINITION: baseStyleLight,
	SEMANTIC_RESTRICTION_DEFINITION: baseStyleLight,
	SET_LITERAL: baseStyleLight,
	SPECIAL_OBJECT_DEFINITION: baseStyleLight,
	STATEMENT: baseStyleLight,
	STRING_ESCAPE_SEQUENCE: baseStyleLight,
	STRING_LITERAL: baseStyleLight,
	TUPLE_LITERAL: baseStyleLight,
	TYPE: baseStyleLight,
	VERSION: baseStyleLight
};

// The file-default properties for all dark-mode semantic classifiers. Any may
// be explicitly overridden in the exported object.
const basePropsDark: CodeStyleProps = {
	ATOM_LITERAL: baseStyleDark,
	BLOCK: baseStyleDark,
	BOOLEAN_LITERAL: baseStyleDark,
	CHARACTER_LITERAL: baseStyleDark,
	COMMENT: baseStyleDark,
	CONDITIONAL: baseStyleDark,
	DOCUMENTATION: baseStyleDark,
	DOCUMENTATION_TAG: baseStyleDark,
	ENTRY_POINT: baseStyleDark,
	EXPORT: baseStyleDark,
	GRAMMATICAL_RESTRICTION_DEFINITION: baseStyleDark,
	IMPORT: baseStyleDark,
	LABEL: baseStyleDark,
	LEXER_DEFINITION: baseStyleDark,
	LOCAL_CONSTANT_DEFINITION: baseStyleDark,
	LOCAL_CONSTANT_USE: baseStyleDark,
	LOCAL_VARIABLE_DECLARATION: baseStyleDark,
	LOCAL_VARIABLE_USE: baseStyleDark,
	LOOP: baseStyleDark,
	MACRO_DEFINITION: baseStyleDark,
	MACRO_SEND: baseStyleDark,
	MAP_LITERAL: baseStyleDark,
	METATYPE: baseStyleDark,
	METHOD_DEFINITION: baseStyleDark,
	METHOD_NAME: baseStyleDark,
	METHOD_SEND: baseStyleDark,
	MODULE_CONSTANT_DEFINITION: baseStyleDark,
	MODULE_CONSTANT_USE: baseStyleDark,
	MODULE_HEADER: baseStyleDark,
	MODULE_VARIABLE_DECLARATION: baseStyleDark,
	MODULE_VARIABLE_USE: baseStyleDark,
	NONLOCAL_CONTROL: baseStyleDark,
	NUMERIC_LITERAL: baseStyleDark,
	OBJECT_TYPE_DEFINITION: baseStyleDark,
	PARAMETER_DEFINITION: baseStyleDark,
	PARAMETER_USE: baseStyleDark,
	PHRASE: baseStyleDark,
	PHRASE_TYPE: baseStyleDark,
	PRIMITIVE_BLOCK: baseStyleDark,
	RETURN_VALUE: baseStyleDark,
	SEAL_DEFINITION: baseStyleDark,
	SEMANTIC_RESTRICTION_DEFINITION: baseStyleDark,
	SET_LITERAL: baseStyleDark,
	SPECIAL_OBJECT_DEFINITION: baseStyleDark,
	STATEMENT: baseStyleDark,
	STRING_ESCAPE_SEQUENCE: baseStyleDark,
	STRING_LITERAL: baseStyleDark,
	TUPLE_LITERAL: baseStyleDark,
	TYPE: baseStyleDark,
	VERSION: baseStyleDark
};

// The theme properties for light mode.
export const defaultPropsLight: CodeStyleProps = {

	// Everything starts with black text,
	...basePropsLight,

	// then specific classifiers have different style overrides.
	BLOCK: { selfProps: { color: "#C8A223" }},

	METHOD_DEFINITION: { selfProps: { color: "#379696" }},

	METHOD_NAME: { selfProps: { color: "#DD4E35" }},

	MODULE_CONSTANT_DEFINITION: { selfProps: { color: "#D03B83" }},
	PARAMETER_DEFINITION: { selfProps: { color: "#D03B83" }},
	LOCAL_CONSTANT_DEFINITION: { selfProps: { color: "#D03B83" }},
	MODULE_CONSTANT_USE: { selfProps: { color: "#D03B83" }},
	PARAMETER_USE: { selfProps: { color: "#D03B83" }},
	LOCAL_CONSTANT_USE: { selfProps: { color: "#D03B83" }},

	MODULE_VARIABLE_DECLARATION: { selfProps: { color: "#D03B83" }},
	LOCAL_VARIABLE_DECLARATION: { selfProps: { color: "#D03B83" }},
	MODULE_VARIABLE_USE: { selfProps: { color: "#D03B83" }},
	LOCAL_VARIABLE_USE: { selfProps: { color: "#D03B83" }},

	MACRO_SEND: { selfProps: { color: "#D4D4D4" }},
	METHOD_SEND: { selfProps: { color: "#D4D4D4" }},

	STATEMENT: { selfProps: { color: "#4C853E" }},

	TYPE: { selfProps: { color: "#3CA6D2" }}
};

// The theme properties for dark mode.
export const defaultPropsDark: CodeStyleProps = {

	// Everything starts with white text,
	...basePropsDark,

	// then specific classifiers have different style overrides.
	BLOCK: { selfProps: { color: "#DAB853" }},

	METHOD_DEFINITION: { selfProps: { color: "#8AE3DD" }},

	METHOD_NAME: { selfProps: { color: "#CE5D48" }},

	MODULE_CONSTANT_DEFINITION: { selfProps: { color: "#D25B94" }},
	PARAMETER_DEFINITION: { selfProps: { color: "#D25B94" }},
	LOCAL_CONSTANT_DEFINITION: { selfProps: { color: "#D25B94" }},
	MODULE_CONSTANT_USE: { selfProps: { color: "#D25B94" }},
	PARAMETER_USE: { selfProps: { color: "#D25B94" }},
	LOCAL_CONSTANT_USE: { selfProps: { color: "#D25B94" }},

	MODULE_VARIABLE_DECLARATION: { selfProps: { color: "#D25B94" }},
	LOCAL_VARIABLE_DECLARATION: { selfProps: { color: "#D25B94" }},
	MODULE_VARIABLE_USE: { selfProps: { color: "#D25B94" }},
	LOCAL_VARIABLE_USE: { selfProps: { color: "#D25B94" }},

	MACRO_SEND: { selfProps: { color: "#9FAAAD" }},
	METHOD_SEND: { selfProps: { color: "#9FAAAD" }},

	STATEMENT: { selfProps: { color: "#78B669" }},

	TYPE: { selfProps: { color: "#3CA6D2" }}
};

export const defaultCodeTheme: CodeTheme = {
	light: defaultPropsLight,
	dark: defaultPropsDark
};
