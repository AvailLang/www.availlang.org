import React, { useEffect, useReducer } from "react";
import sun from "../images/sun-fold.svg";
import moon from "../images/moon-fold.svg";
import "../css/properties.css";
import "../css/reset.css";
import "../css/app.css";
import { AppTheme } from "../helpers/theme";
import { errors } from "../helpers/errors";
import { log, LogLevel, Warning } from "../helpers/logs";
import { colors } from "../helpers/colors";
import { defaultStrings, WebsiteStrings } from "../internationalization/strings";
import { LocalStorageInstance } from "../helpers/storage";
import { Homepage } from "./Homepage";
import backgroundLight from "../images/background-light.svg";
import backgroundDark from "../images/background-dark.svg";
import { getAnalyticsId } from "../helpers/environment";

/**
 * The complete state of the ${@link App}.
 * 
 * @author Tristan J Berto <hello@tristanberto.com>
 */
interface AppState
{
	/** 'true' iff the application has already initialized. */
	initialized: boolean;

	/** The complete set of content for the {@link App}. */
	strings: WebsiteStrings;

	/** Local storage management. */
	localStorage: LocalStorageInstance;

	/** The {@link App} theme, light or dark. */
	theme: AppTheme;
}

/**
 * The initial state of the ${@link App}.
 * 
 * @author Tristan J Berto <hello@tristanberto.com>
 */
const initialState = (): AppState =>
{
	const localStorage = new LocalStorageInstance();
	return {
		initialized: false,
		strings: defaultStrings,
		localStorage,
		theme: localStorage.getTheme()
	}
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
	const [state, dispatch] = useReducer(reducer, initialState());
	const {strings} = state;
	const toggleTheme = () => dispatch({type: "setTheme"});
	const toggleThemeIcon = state.theme === AppTheme.DARK ? sun : moon;
	const backgroundBase =
	{
		backgroundRepeat: "no-repeat",
		backgroundPosition: "0 150px"
	};
	const backgroundStyle = state.theme === AppTheme.DARK
		? 
			{
				...backgroundBase,
				backgroundColor: colors.BLACK,
				backgroundImage: `url(${backgroundDark})`,
			}
		: 
			{
				...backgroundBase,
				backgroundColor: colors.WHITE,
				backgroundImage: `url(${backgroundLight})`,
			};
	const fontStyle = state.theme === AppTheme.DARK
		? { color: colors.WHITE }
		: { color: colors.BLACK };
	const footerBackgroundStyle = state.theme === AppTheme.DARK
		? { background:  colors.LIGHT_TEXT_BACKGROUND }
		: { background:  colors.DARK_TEXT_BACKGROUND };
	useEffect(() =>
	{
		// Set the document title on re-render in case translation is needed.
		document.title = strings.longName;

		// Initialization is manually flagged to control re-running.
		if (state.initialized === true)
		{
			return;
		}
		dispatch({type: "initialize"});

		// Google Analytics initial log.
		const analyticsId = getAnalyticsId();
		// @ts-ignore-nextline
		if (window.gtag === undefined 
			|| analyticsId === undefined 
			|| analyticsId === "")
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
				analyticsId,
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
			<Homepage theme={state.theme} strings={strings}/>
			<div className="main-footer" style={footerBackgroundStyle}>
				<p className="legal-text" style={fontStyle}>
					&copy; {strings.copyright}
				</p>
			</div>
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
	/** Flag the {@link App} as having initialized. */
	type: "initialize"
}
|
{
	/** Set the {@link App} theme, light or dark. */
	type: "setTheme",

	/** The new theme or 'undefined' to toggle. */
	theme?: AppTheme
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
		case "initialize":
			return {...state, initialized: true};
		case "setTheme":
			return setTheme(state, action.theme);
		default:
			throw errors.UNKNOWN_ACTION();
	}
};

const setTheme = (state: AppState, theme?: AppTheme): AppState =>
{
	const currentTheme = state.theme;
	state.localStorage.setTheme(
		theme !== undefined ? theme :
			currentTheme === AppTheme.DARK
				? AppTheme.LIGHT
				: AppTheme.DARK);
	return { ...state, theme: state.localStorage.getTheme() };
};

export default App;

