/** All possible errors the app could encounter. */
export const errors = 
{
	/** The app found an unknown dispatch action. */
	UNKNOWN_ACTION: () =>
		new Error("Unknown app action."),

	/** The app found an unknown console log type. */
	UNKNOWN_LOG_LEVEL: () => 
		new Error("Unknown log level."),

	/** The app found an unknown code line type. */
	UNKNOWN_CODE_LINE: () =>
		new Error("Unknown code line type."),

	/** The app found an unknown theme identifier. */
	UNKNOWN_THEME: () =>
		new Error("Unknown theme identifier.")
};
