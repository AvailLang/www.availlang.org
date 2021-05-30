/**
 * Get the env setting for the Google Analytics property id.
 * 
 * @returns 
 *   The env setting or 'undefined'
 * @author Tristan J Berto <hello@tristanberto.com>
 */
export const getAnalyticsId = () =>
	process.env.REACT_APP_GOOGLE_ANALYTICS_ID;
