import { AppTheme } from "./theme";

// TODO: Link local storage in to the rest of the app.

/**
 * The complete structure of the {@link App App's} local storage values.
 * 
 * @author Tristan J Berto <hello@tristanberto.com> 
 */
export interface LocalStorageData
{
	/** The App's theme, light or dark mode. */
	theme: AppTheme;
	version: number;
}

const currentLocalStorageVersion = 1;

/**
 * Default settings for {@link LocalStorageData}.
 */
const defaultLocalStorageData: LocalStorageData =
{
	theme: AppTheme.DARK,
	version: currentLocalStorageVersion
};

/**
 * A local storage middleman for the {@link App}.
 * 
 * @author Tristan J Berto <hello@tristanberto.com> 
 */
export class LocalStorageInstance
{
	/** The current origin's local storage. */
	private storage = window.localStorage;

	/** The complete set of valid local storage keys. */
	private keys = 
	{
		theme: "theme",
		version: "version"
	};

	/** The complete set of local storage data for the {@link App} */
	private data = defaultLocalStorageData;

	/** 
	 * Construce a new {@link LocalStorage} class.
	 * 
	 * This implementation assumes minimal use of local storage.
	 */
	constructor()
	{
		const version = this.storage.getItem(this.keys.version);
		if (version !== currentLocalStorageVersion.toString())
		{
			this.storage.clear();
			this.storage.setItem(
				this.keys.version, 
				currentLocalStorageVersion.toString()
			);
		}
		const theme = this.storage.getItem(this.keys.theme);
		if (theme === null)
		{
			this.storage.setItem(this.keys.theme, this.data.theme);
		}
		else
		{
			this.data = {...this.data, theme: theme as AppTheme}
		}
	};

	/**
	 * Get the user's preferred theme, or the default theme.
	 * 
	 * @returns
	 *   The theme.
	 */
	getTheme()
	{
		return this.data.theme;
	}

	/**
	 * Set the user's preferred theme.
	 * 
	 * @param newTheme
	 *   The theme.
	 * @param callback
	 *   A callback to invoke after setting the theme.
	 */
	setTheme(newTheme: AppTheme)
	{
		this.storage.setItem(this.keys.theme, newTheme);
		this.data = {...this.data, theme: newTheme};
	}
};
