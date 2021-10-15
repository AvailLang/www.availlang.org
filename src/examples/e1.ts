import {ExtendedCodeExampleData} from "../components/CodeExample";
import {WebsiteStrings} from "../internationalization/strings";
import {codeLineArray, codeStyle} from "../components/CodeBlock";

/**
 * The first code {@link ExtendedCodeExampleData code example}.
 */
export const e1: ExtendedCodeExampleData =
{
	queryStringTitle: "method-translations-with-aliases",
	heading: (strings: WebsiteStrings) =>
		strings.codeExamples.exampleOneHeading,
	description: (strings: WebsiteStrings) =>
		strings.codeExamples.exampleOneIntroduction,
	featured: true,
	codeLines: codeLineArray([
		[
			["/*", codeStyle.COMMENT]
		],
		[
			[" * Copyright blah blah", codeStyle.COMMENT]
		],
		[
			[" */", codeStyle.COMMENT]
		],
		[
			[" ", codeStyle.TEMP_REMOVE] // TODO: no way to insert empty line without nbsp
		],
		[
			["Module ", codeStyle.MODULE_HEADER],
			["\"Collection Readers\"", codeStyle.MODULE_NAME]
		],
		[
			["Version", codeStyle.MODULE_HEADER]
		],
		[
			["\t\"1.4.0\"", codeStyle.VERSION]
		],
		[
			["Uses", codeStyle.MODULE_HEADER]
		],
		[
			["\t\"Abstract Iterators\"", codeStyle.IMPORT]
		],
		[
			["Names", codeStyle.MODULE_HEADER]
		],
		[
			["\t\"a reader over _\"", codeStyle.EXPORT]
		],
		[
			["Entries", codeStyle.MODULE_HEADER]
		],
		[
			["\t\"`!_\"", codeStyle.ENTRY_POINT]
		],
		[
			["Body", codeStyle.MODULE_HEADER]
		],
		[
			[" ", codeStyle.TEMP_REMOVE] // TODO: no way to insert empty line without nbsp
		],
		[
			["\"collection\"", codeStyle.ATOM_LITERAL],
			[" is a new field atom", codeStyle.METHOD_SEND],
			[";", codeStyle.STATEMENT]
		],
		[
			[" ", codeStyle.TEMP_REMOVE] // TODO: no way to insert empty line without nbsp
		],
		[
			["naturalNumberVariable", codeStyle.MODULE_CONSTANT_USE],
			[" ::= ", codeStyle.MODULE_CONSTANT_DEFINITION],
			["↑natural number", codeStyle.TYPE],
			[";", codeStyle.STATEMENT]
		],
		[
			["moduleVariable", codeStyle.MODULE_VARIABLE_USE],
			[" : ", codeStyle.MODULE_VARIABLE_DECLARATION],
			["{string|", codeStyle.TYPE],
			["1", codeStyle.NUMERIC_LITERAL],
			["..", codeStyle.TYPE],
			["3", codeStyle.NUMERIC_LITERAL],
			["}", codeStyle.TYPE],
			[" := ", codeStyle.MODULE_VARIABLE_DECLARATION],
			["{", codeStyle.SET_LITERAL],
			["\"waah\"", codeStyle.STRING_LITERAL],
			[", ", codeStyle.SET_LITERAL],
			["\"I'm hungry\"", codeStyle.STRING_LITERAL],
			["}", codeStyle.SET_LITERAL],
			[";", codeStyle.STATEMENT]
		],
		[
			[" ", codeStyle.TEMP_REMOVE] // TODO: no way to insert empty line without nbsp
		],
		[
			["// This is a line comment", codeStyle.COMMENT]
		],
		[
			["/** This is a doc block ", codeStyle.DOCUMENTATION],
			["@tag", codeStyle.DOCUMENTATION_TAG],
			[" */", codeStyle.DOCUMENTATION]
		],
		[
			["Method ", codeStyle.METHOD_DEFINITION],
			["\"_plus_\"", codeStyle.METHOD_NAME],
			[" is", codeStyle.METHOD_DEFINITION]
		],
		[
			["[", codeStyle.BLOCK]
		],
		[
			["\t", codeStyle.TEMP_REMOVE],
			["x", codeStyle.PARAMETER_USE],
			[" : ", codeStyle.PARAMETER_DEFINITION],
			["number", codeStyle.TYPE],
			[",", codeStyle.BLOCK]
		],
		[
			["\t", codeStyle.TEMP_REMOVE],
			["y", codeStyle.PARAMETER_USE],
			[" : ", codeStyle.PARAMETER_DEFINITION],
			["number", codeStyle.TYPE]
		],
		[
			["|", codeStyle.BLOCK]
		],
		[
			["\t", codeStyle.TEMP_REMOVE],
			["$labelName", codeStyle.LABEL],
			[" : ", codeStyle.BLOCK],
			["3", codeStyle.NUMERIC_LITERAL],
			["'s type", codeStyle.TYPE],
			["'s type", codeStyle.METATYPE],
			[";", codeStyle.STATEMENT]
		],
		[
			["\t", codeStyle.TEMP_REMOVE],
			["baz", codeStyle.LOCAL_VARIABLE_USE],
			[" : ", codeStyle.LOCAL_VARIABLE_DECLARATION],
			["boolean", codeStyle.TYPE],
			[" := ", codeStyle.LOCAL_VARIABLE_DECLARATION],
			["true", codeStyle.BOOLEAN_LITERAL],
			[";", codeStyle.STATEMENT]
		],
		[
			["\t", codeStyle.TEMP_REMOVE],
			["If ", codeStyle.CONDITIONAL],
			["baz", codeStyle.LOCAL_VARIABLE_USE],
			[" = ", codeStyle.METHOD_SEND],
			["false", codeStyle.TYPE],
			[" then", codeStyle.CONDITIONAL],
		],
		[
			["\t[", codeStyle.BLOCK]
		],
		[
			["\t\t", codeStyle.TEMP_REMOVE],
			["foo", codeStyle.LOCAL_CONSTANT_USE],
			[" ::= ", codeStyle.LOCAL_CONSTANT_DEFINITION],
			["\"", codeStyle.STRING_LITERAL],
			["\\t", codeStyle.STRING_ESCAPE_SEQUENCE],
			["bar\"", codeStyle.STRING_LITERAL],
			[";", codeStyle.STATEMENT]
		],
		[
			["\t\t", codeStyle.TEMP_REMOVE],
			["slashChar", codeStyle.LOCAL_CONSTANT_USE],
			[" ::= ", codeStyle.LOCAL_CONSTANT_DEFINITION],
			["¢/", codeStyle.CHARACTER_LITERAL],
			[";", codeStyle.STATEMENT]
		],
		[
			["\t]", codeStyle.BLOCK],
			[";", codeStyle.STATEMENT]
		],
		[
			["\tunused", codeStyle.LOCAL_CONSTANT_USE],
			[" ::= ", codeStyle.LOCAL_CONSTANT_DEFINITION],
			["map each ", codeStyle.LOOP],
			["char", codeStyle.LOCAL_CONSTANT_USE],
			[" in ", codeStyle.LOOP],
			["\"QWERTY\"", codeStyle.STRING_LITERAL],
			[" through ", codeStyle.LOOP],
			["[", codeStyle.BLOCK],
			["lowercase ", codeStyle.METHOD_SEND],
			["char", codeStyle.LOCAL_CONSTANT_USE],
			["]", codeStyle.BLOCK],
			[";", codeStyle.STATEMENT]
		],
		[
			["\t", codeStyle.TEMP_REMOVE],
			["Exit ", codeStyle.NONLOCAL_CONTROL],
			["$labelName", codeStyle.NONLOCAL_CONTROL, codeStyle.LABEL],
			[" with ", codeStyle.NONLOCAL_CONTROL, codeStyle.NONLOCAL_CONTROL],
			["3", codeStyle.NONLOCAL_CONTROL, codeStyle.NUMERIC_LITERAL],
			[" if ", codeStyle.NONLOCAL_CONTROL, codeStyle.NONLOCAL_CONTROL],
			["true", codeStyle.NONLOCAL_CONTROL, codeStyle.BOOLEAN_LITERAL],
			[";", codeStyle.STATEMENT]
		],
		[
			["\t", codeStyle.TEMP_REMOVE],
			["x ", codeStyle.RETURN_VALUE, codeStyle.PARAMETER_USE],
			["+ ", codeStyle.RETURN_VALUE, codeStyle.METHOD_SEND],
			["y", codeStyle.RETURN_VALUE, codeStyle.PARAMETER_USE]
		],
		[
			["] : ", codeStyle.BLOCK],
			["number", codeStyle.TYPE],
			[";", codeStyle.STATEMENT]
		],
		[
			["Seal method ", codeStyle.SEAL_DEFINITION],
			["\"_plus_\"", codeStyle.METHOD_NAME],
			[" at ", codeStyle.SEAL_DEFINITION],
			["<", codeStyle.TUPLE_LITERAL],
			["any", codeStyle.TYPE],
			[", ", codeStyle.TUPLE_LITERAL],
			["any", codeStyle.TYPE],
			[">", codeStyle.TUPLE_LITERAL],
			[";", codeStyle.STATEMENT]
		],
		[
			[" ", codeStyle.TEMP_REMOVE] // TODO: no way to insert empty line without nbsp
		],
		[
			["Primitive ", codeStyle.METHOD_DEFINITION],
			["\"_[_]\"", codeStyle.METHOD_NAME],
			[" is", codeStyle.METHOD_DEFINITION],
		],
		[
			["[", codeStyle.PRIMITIVE_BLOCK]
		],
		[
			["\t", codeStyle.TEMP_REMOVE],
			["anAtom", codeStyle.PARAMETER_USE],
			[" : ", codeStyle.PARAMETER_DEFINITION],
			["atom", codeStyle.TYPE],
			[",", codeStyle.PRIMITIVE_BLOCK]
		],
		[
			["\t", codeStyle.TEMP_REMOVE],
			["key", codeStyle.PARAMETER_USE],
			[" : ", codeStyle.PARAMETER_DEFINITION],
			["atom", codeStyle.TYPE]
		],
		[
			["|", codeStyle.PRIMITIVE_BLOCK]
		],
		[
			["\t", codeStyle.TEMP_REMOVE],
			["Primitive ", codeStyle.PRIMITIVE_BLOCK],
			["AtomGetProperty ", codeStyle.PRIMITIVE_NAME],
			["(", codeStyle.PRIMITIVE_BLOCK],
			["failureCode", codeStyle.PRIMITIVE_FAILURE_VARIABLE_USE],
			[" : ", codeStyle.PRIMITIVE_BLOCK],
			["{", codeStyle.SET_LITERAL]
		],
		[
			["\t\t", codeStyle.TEMP_REMOVE],
			["no-such-field code", codeStyle.METHOD_SEND],
			["}", codeStyle.SET_LITERAL],
			["ᵀ", codeStyle.TYPE],
			[");", codeStyle.PRIMITIVE_BLOCK]
		],
		[
			["\t", codeStyle.TEMP_REMOVE],
			["Private invoke _fail_primitive with ", codeStyle.NONLOCAL_CONTROL, codeStyle.METHOD_SEND],
			["failureCode", codeStyle.NONLOCAL_CONTROL, codeStyle.PRIMITIVE_FAILURE_VARIABLE_USE]
		],
		[
			["] : ", codeStyle.PRIMITIVE_BLOCK],
			["any", codeStyle.TYPE],
			[";", codeStyle.STATEMENT]
		],
		[
			[" ", codeStyle.TEMP_REMOVE]
		],
		//		Special object "boolean" is special object 2;
		[
			["Special object ", codeStyle.SPECIAL_OBJECT_DEFINITION],
			["\"boolean\"", codeStyle.METHOD_NAME],
			[" is ", codeStyle.SPECIAL_OBJECT_DEFINITION],
			["special object ", codeStyle.METHOD_SEND],
			["2", codeStyle.NUMERIC_LITERAL],
			[";", codeStyle.STATEMENT]
		],
		[
			[" ", codeStyle.TEMP_REMOVE]
		],
		[
			["Private macro ", codeStyle.MACRO_DEFINITION],
			["\"Do_and_;\"", codeStyle.METHOD_NAME],
			[" is", codeStyle.MACRO_DEFINITION],
		],
		[
			["[", codeStyle.BLOCK]
		],
		[
			["\t", codeStyle.TEMP_REMOVE],
			["firstBlock", codeStyle.PARAMETER_USE],
			[" : ", codeStyle.PARAMETER_DEFINITION],
			["block phrase ⇒ ", codeStyle.PHRASE_TYPE],
			["[]→⊤", codeStyle.TYPE],
			[",", codeStyle.BLOCK]
		],
		[
			["\t", codeStyle.TEMP_REMOVE],
			["secondBlock", codeStyle.PARAMETER_USE],
			[" : ", codeStyle.PARAMETER_DEFINITION],
			["block phrase ⇒ ", codeStyle.PHRASE_TYPE],
			["[]→⊤", codeStyle.TYPE]
		],
		[
			["|", codeStyle.BLOCK]
		],
		[
			["\t", codeStyle.TEMP_REMOVE],
			["first", codeStyle.LOCAL_CONSTANT_USE],
			[" ::= ", codeStyle.LOCAL_CONSTANT_DEFINITION],
			["seq «", codeStyle.PHRASE],
			["firstBlock", codeStyle.PARAMETER_USE],
			["'s statements", codeStyle.METHOD_SEND],
			["»", codeStyle.PHRASE],
			[";", codeStyle.STATEMENT]
		],
		[
			["\t", codeStyle.TEMP_REMOVE],
			["second", codeStyle.LOCAL_CONSTANT_USE],
			[" ::= ", codeStyle.LOCAL_CONSTANT_DEFINITION],
			["seq «", codeStyle.PHRASE],
			["secondBlock", codeStyle.PARAMETER_USE],
			["'s statements", codeStyle.METHOD_SEND],
			["»", codeStyle.PHRASE],
			[";", codeStyle.STATEMENT]
		],
		[
			["\t", codeStyle.TEMP_REMOVE],
			["first-of-seq «<", codeStyle.NONLOCAL_CONTROL, codeStyle.PHRASE],
			["first", codeStyle.NONLOCAL_CONTROL, codeStyle.LOCAL_CONSTANT_USE],
			[", ", codeStyle.NONLOCAL_CONTROL, codeStyle.PHRASE],
			["second", codeStyle.NONLOCAL_CONTROL, codeStyle.LOCAL_CONSTANT_USE],
			[">»", codeStyle.NONLOCAL_CONTROL, codeStyle.PHRASE],
		],
		[
			["]", codeStyle.BLOCK],
			[";", codeStyle.STATEMENT]
		],
	]),
	codeOutput: ["Greeting complete."]
};




