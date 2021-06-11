import { AppTheme } from "./theme";

/**
 * The complete structure of the {@link App App's} local storage values.
 * 
 * @author Tristan J Berto <hello@tristanberto.com> 
 */
export interface LocalStorageData
{
	/** The App's theme, light or dark mode. */
	theme: AppTheme;
	version?: number;
}

/**
 * Default settings for {@link LocalStorageData}.
 */
const defaultLocalStorageData: LocalStorageData =
{
	theme: AppTheme.DARK
};

/**
 * A local storage middleman for the {@link App}.
 * 
 * @author Tristan J Berto <hello@tristanberto.com> 
 */
export class LocalStorageInstance
{
	/** The current storage protocol version. */
	public static readonly protocolVersion = 1;

	/** The current origin's local storage. */
	private storage = window.localStorage;

	/** The complete set of valid local storage keys. */
	private static readonly keys =
	{
		theme: "theme",
		version: "version"
	};

	/** The complete set of local storage data for the {@link App} */
	private data = defaultLocalStorageData;

	/** 
	 * Construct a new {@link LocalStorageInstance} class.
	 * 
	 * This implementation assumes minimal use of local storage.
	 */
	constructor()
	{
		const keys = LocalStorageInstance.keys;
		const protocol = LocalStorageInstance.protocolVersion.toString();
		const foundVersion = this.storage.getItem(keys.version);
		if (foundVersion === null || foundVersion !== protocol)
		{
			this.storage.clear();
			this.storage.setItem(keys.version, protocol);
		}
		const theme = this.storage.getItem(keys.theme);
		switch (theme)
		{
			case null:
				this.storage.setItem(keys.theme, this.data.theme);
				break;
			case AppTheme.DARK:
			case AppTheme.LIGHT:
				this.data = {...this.data, theme: theme}
				break;
			default:
				this.storage.clear();
				this.storage.setItem(keys.version, protocol);
				this.storage.setItem(keys.theme, defaultLocalStorageData.theme);
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
	};

	/**
	 * Set the user's preferred theme.
	 * 
	 * @param newTheme
	 *   The theme.
	 */
	setTheme(newTheme: AppTheme)
	{
		this.storage.setItem(LocalStorageInstance.keys.theme, newTheme);
		this.data = {...this.data, theme: newTheme};
	};
}
