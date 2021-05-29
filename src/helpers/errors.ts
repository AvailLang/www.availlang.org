/** All possible errors the app could encounter. */
export const errors = 
{
	/** The app found an unknown dispatch action. */
	UNKNOWN_ACTION: () =>
		new Error("Unknown app action."),
	UNKNOWN_LOG_LEVEL: () => 
		new Error("Unknown log level.")
};
