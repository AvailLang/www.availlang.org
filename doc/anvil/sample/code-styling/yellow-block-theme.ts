import {
	defaultPropsDark,
	defaultPropsLight
} from "../../src/code-styling/default-code-theme";
import { CodeStyleProps, CodeTheme } from "../../src/code-styling/code-theme";

// The theme properties for light mode.
const myPropsLight: CodeStyleProps = {
	// Everything starts as default,
	...defaultPropsLight,
	// but blocks get a yellow background that forces into children.
	BLOCK: {
		selfProps: {
			color: "#C8A223",
			background: "rgba(200,162,35,0.11)"
		},
		childProps: {
			background: "rgba(200,162,35,0.11)"
		}
	}
};

// The theme properties for dark mode.
const myPropsDark: CodeStyleProps = {
	// Everything starts as default,
	...defaultPropsDark,
	// but blocks get a yellow background that forces into children.
	BLOCK: {
		selfProps: {
			color: "#DAB853",
			background: "rgba(200,184,83,0.11)"
		},
		childProps: {
			background: "rgba(200,184,83,0.11)"
		}
	}
};

export const yellowBlockTheme: CodeTheme = {
	light: myPropsLight,
	dark: myPropsDark
};
