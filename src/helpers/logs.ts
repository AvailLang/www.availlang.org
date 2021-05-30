import { settings } from "../globalSettings"
import { errors } from "./errors";

/**
 * The effective possible types of Javascript console log methods.
 * Console.log and Console.info are consolidated as {@link LogLevel.INFO}
 * since most browsers do not differentiate between those legacy types.
 * 
 * @author Tristan J Berto <hello@tristanberto.com>
 */
export enum LogLevel
{
	/** An informational or notification log. */
	INFO,

	/** A warning log. Generally appears yellow. */
	WARN,

	/** An error log. Generally appears red. */
	ERROR
}

/**
 * Log to the Javascript console, if enabled.
 * 
 * @param log 
 *   The message to log.
 * @param level
 *   The {@link LogLevel type} of log to use.
 * @author Tristan J Berto <hello@tristanberto.com>
 */
export const log = (log: string, level: LogLevel = LogLevel.INFO) =>
{
	if (settings.LOG_TO_CONSOLE === true)
	{
		switch(level)
		{
			case LogLevel.INFO:
				console.log(log);
				break;
			case LogLevel.WARN:
				console.warn(log);
				break;
			case LogLevel.ERROR:
				console.error(log);
				break;
			default:
				throw errors.UNKNOWN_LOG_LEVEL();
		}
	}
}

/**
 * A collection of console warnings the {@link App} might issue.
 * 
 * @author Tristan J Berto <hello@tristanberto.com>
 */
export enum Warning
{
	/** The Google Analytics property ID and/or window method isn't set. */
	ANALYTICS_NOT_CONFIGURED = "Google Analytics is not configured.",

	/** A call to parse the document URI failed. */
	INVALID_URL_PATH = "The URL path could not be parsed.",

	/** Error during local storage theme cast. */
	LOCAL_STORAGE_THEME_FAILED = "Failed to use theme from local storage.",

	/** Unnecessary (inefficient) string permutation. */
	UNNECESSARY_MULTILINE_PARSE = "Trimming multiline string with no lines."
};