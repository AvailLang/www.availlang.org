import React, { useEffect, useReducer } from "react";
import logoWhite from "../images/logo-white.svg";
import logoBlack from "../images/logo-black.svg";
import sun from "../images/sun-fold.svg";
import moon from "../images/moon-fold.svg";
import '../css/app.css';
import { AppTheme } from "../helpers/theme";
import { errors } from "../helpers/errors";
import { settings } from "../globalSettings";
import { log, LogLevel, Warning } from "../helpers/logs";
import { colors } from "../helpers/colors";
import { defaultStrings, WebsiteStrings } from "../internationalization/strings";

// TODO:
//  Link in local storage (15)
//  Link in code examples and page content (60)
//  Style code exmamples and page content (90)
//  Add Github link (15)
//  Add contact info (15)
//  Add copyright and footer (15)
//  Add background image? (60)
//  Add routing and example instance view (60)
//  Add share links with URL and mail (30)
//  Add mobile scroll to top button (30)
//  Finish readme (30)

/**
 * The complete state of the ${@link App}.
 * 
 * @author Tristan J Berto <hello@tristanberto.com>
 */
interface AppState
{
	/** 'true' iff the application has already initialized. */
	initialized: boolean;

	/** The current {@link AppTheme theme}. */
	theme: AppTheme;

	/** The complete set of content for the {@link App}. */
	strings: WebsiteStrings;
}

/**
 * The initial state of the ${@link App}.
 * 
 * @author Tristan J Berto <hello@tristanberto.com>
 */
const initialState: AppState =
{
	initialized: false,
	theme: AppTheme.DARK,
	strings: defaultStrings
};

/**
 * The entry point for the website.
 * 
 * @returns
 *   The React element.
 * @author Tristan J Berto <hello@tristanberto.com>
 */
const App = () =>
{
	const [state, dispatch] = useReducer(reducer, initialState);
	const toggleTheme = () => dispatch({type: "setTheme"});
	const toggleThemeIcon = state.theme === AppTheme.DARK ? sun : moon;
	const backgroundStyle = state.theme === AppTheme.DARK
		? { background: colors.BLACK }
		: { background: colors.WHITE };
	const themeLogo = state.theme === AppTheme.DARK ? logoWhite : logoBlack;
	const fontStyle = state.theme === AppTheme.DARK
		? { color: colors.WHITE }
		: { color: colors.BLACK };
	const {strings} = state;
	// Google Analytics initial log.
	useEffect(() =>
	{
		// Initialization is manually flagged to control re-running.
		if (state.initialized === true)
		{
			return;
		}
		dispatch({type: "initialize"});
		// @ts-ignore-nextline
		if (window.gtag === undefined || settings.GOOGLE_ANALYTICS_ID === undefined)
		{
			log(Warning.ANALYTICS_NOT_CONFIGURED, LogLevel.WARN);
			return;
		}
		try
		{
			const path = new URL(document.documentURI).pathname;
			// @ts-ignore-nextline
			window.gtag(
				"config",
				settings.GOOGLE_ANALYTICS_ID,
				{ page_path: path }
			)
		}
		catch
		{
			log(Warning.INVALID_URL_PATH, LogLevel.ERROR);
		}
	});
	return (
		<div 
			className="app"
			style={backgroundStyle}
		>
			<img 
				src={toggleThemeIcon} 
				className="toggle-theme clickable" 
				alt="toggle dark mode"
				onClick={toggleTheme}
				style={{ position: "absolute", top: 0, right: 0 }}
			/>
			{/* ATF */}
			<img src={themeLogo} className="app-logo" alt="logo" />
			<h1 style={fontStyle}>{strings.tagline}</h1>
			{/* Tagline */}
			{/* Text, Github and example */}
			{/* Content/ code examples */}
			{/* Footer */}
		</div>
	);
};

/**
 * The possible state manipulation actions for the {@link App}.
 * 
 * @author Tristan J Berto <hello@tristanberto.com>
 */
type AppAction =
{
	/** Set the light or dark theme. */
	type: "setTheme",

	/** The {@link AppTheme theme} or 'undefined' to toggle. */
	theme?: AppTheme
}
|
{
	/** Flag the {@link App} as having initialized. */
	type: "initialize"
};

/**
 * The React dispatch for the {@link App}.
 * 
 * @param state {AppState}
 *   The initial state.
 * @param action {AppAction}
 *   The {@link AppAction action}.
 * @returns {AppState}
 *   The new state.
 * @author Tristan J Berto <hello@tristanberto.com>
 */
const reducer = (state: AppState, action: AppAction): AppState =>
{
	switch(action.type)
	{
		case "setTheme":
			return setTheme(state, action.theme);
		case "initialize":
			return {...state, initialized: true};
		default:
			throw errors.UNKNOWN_ACTION();
	}
};

/**
 * Set the {@link App} {@link AppTheme theme}.
 * 
 * @param state
 *   The initial state.
 * @param theme
 *   The new theme or 'undefined' to toggle.
 * @returns
 *   The new state.
 * @author Tristan J Berto <hello@tristanberto.com>
 */
const setTheme = (state: AppState, theme?: AppTheme): AppState =>
({
	...state, 
	theme: theme !== undefined 
		? theme 
		: state.theme === AppTheme.DARK 
			? AppTheme.LIGHT 
			: AppTheme.DARK
});

export default App;

