import { settings } from "../globalSettings"
import { errors } from "./errors";

/**
 * @author Tristan J Berto <hello@tristanberto.com>
 */
export enum LogLevel
{
	INFO,
	WARN,
	ERROR
}

/**
 * 
 * @param log 
 * @param level
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
 * @author Tristan J Berto <hello@tristanberto.com>
 */
export enum Warning
{
	ANALYTICS_NOT_CONFIGURED = "Google Analytics is not configured."
}