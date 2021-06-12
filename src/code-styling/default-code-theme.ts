import { CodeStyleProps, CodeTheme } from "./code-theme";

export const defaultPropsLight: CodeStyleProps = {
	BLOCK: { color: "#C8A223" },
	METHOD_DEFINER: { color: "#379696" },
	METHOD_NAME: { color: "#DD4E35" },
	PARAMETER_NAME: { color: "#D03B83" },
	PARAMETER_USE: { color: "#D03B83" },
	SEND: { color: "#D4D4D4" },
	STATEMENT: { color: "#4C853E" },
	TYPE: { color: "#3CA6D2" }
};

export const defaultPropsDark: CodeStyleProps = {
	BLOCK: { color: "#DAB853" },
	METHOD_DEFINER: { color: "#8AE3DD" },
	METHOD_NAME: { color: "#CE5D48" },
	PARAMETER_NAME: { color: "#D25B94" },
	PARAMETER_USE: { color: "#D25B94" },
	SEND: { color: "#9FAAAD" },
	STATEMENT: { color: "#78B669" },
	TYPE: { color: "#3CA6D2" }
};

export const defaultCodeTheme: CodeTheme = {
	light: defaultPropsLight,
	dark: defaultPropsDark
};
