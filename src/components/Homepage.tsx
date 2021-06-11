import "../css/homepage.css";
import { colors } from "../helpers/colors";
import { AppTheme } from "../helpers/theme";
import { WebsiteStrings } from "../internationalization/strings";
import logoWhite from "../images/logo-white.svg";
import logoBlack from "../images/logo-black.svg";
import githubWhite from "../images/github-white.svg";
import githubBlack from "../images/github-black.svg";
import { settings } from "../globalSettings";
import { CodeBlock, CodeLine } from "./CodeBlock";
import { codeExamples, featuredExamples } from "../examples/examples";
import { CodeExample } from "./CodeExample";

/** 
 * The React properties for the {@link Homepage} component.
 * 
 * @author Tristan J Berto <hello@tristanberto.com> 
 */
interface HomepageProps
{
	/** The {@link App} theme, light or dark. */
	theme: AppTheme;

	/** The complete set of content for the {@link App}. */
	strings: WebsiteStrings;
}
 
/**
 * A Homepage view.
 * 
 * @param props
 *   The React properties.
 * @returns 
 *   The React element.
 * @author Tristan J Berto <hello@tristanberto.com>
 */
export const Homepage = (props: HomepageProps) =>
{
	const {theme, strings} = props;
	const themeLogo = theme === AppTheme.DARK ? logoWhite : logoBlack;
	const fontStyle = theme === AppTheme.DARK
		? { color: colors.WHITE }
		: { color: colors.BLACK };
	const introduction = strings.frontPage.introduction.map((text, index) =>
		<p 
			key={`intro-paragraph-${index}`}
			style={fontStyle}
		> 
			{text} 
		</p>);
	const frontPageExamples = featuredExamples.map((example, index) =>
		<CodeExample
			theme={theme}
			strings={strings}
			heading={example.heading}
			description={example.description}
			codeLines={example.codeLines}
			codeOutput={example.codeOutput}
			key={`code-example-${index}`}
		/>);
	return(
		<div className="homepage view">
			<div className="atf">
				<img src={themeLogo} className="app-logo" alt="logo" />
				<h1 
					style={{...fontStyle, textAlign: "center"}}
				>
					{strings.longName}
				</h1>
			</div>
			<div className="two-column">
				<div>
					<h2 style={fontStyle}>{strings.shortPitch}</h2>
					{introduction}
				</div>
				<div>
					<CodeBlock theme={theme} lines={introCodeLines}/>
				</div>
			</div>
			<GitHub theme={theme} cta={strings.githubCta1}/>
			<h2 style={fontStyle}>{strings.frontPage.examplesLabel}</h2>
			{frontPageExamples}
			<GitHub theme={theme} cta={strings.githubCta2}/>
		</div>
	)
};

/**
 * The React Properties for a {@link GitHub} component.
 * 
 * @author Tristan J Berto <hello@tristanberto.com>
 */
interface GitHubProps
{
	/** The call-to-action to display above the link. */
	cta: string;

	/** The {@link App} theme, light or dark. */
	theme: AppTheme;
}

/**
 * A view for a GitHub link and call-to-action. 
 * 
 * @param props
 *   The React properties. 
 * @returns 
 *   The React element.
 * @author Tristan J Berto <hello@tristanberto.com>
 */
const GitHub = (props: GitHubProps) =>
{
	const {theme, cta} = props;
	const gitHubLogo = theme === AppTheme.DARK
		? githubBlack
		: githubWhite;
	const buttonStyle = theme === AppTheme.DARK
		? { background: colors.WHITE }
		: { background: colors.BLACK };
	const fontStyle = theme === AppTheme.DARK
		? { color: colors.WHITE }
		: { color: colors.BLACK };
	return (
		<div className="wide">
			<h4 style={fontStyle}>{cta}</h4>
			<a 
				href={settings.GITHUB_URL} 
				className="button"
				style={buttonStyle}
			>
				<img 
					src={gitHubLogo} 
					alt="GitHub logo" 
					className="wide-icon"
				/>
			</a>
		</div>
	);
}

/**
 * A temporary code example. TODO: Remove.
 */
const codeExample = codeExamples[0];

/**
 * Temporary code lines used to mock in the intro section. TODO: Remove.
 */
const introCodeLines: CodeLine[] = codeExample !== undefined
	? codeExample.codeLines
	: [];
