CODE STYLING
=====================================================================

This directory contains the sample input and output JSON example files for 
receiving Avail syntax styling information as an 
[S-expression](https://en.wikipedia.org/wiki/S-expression) and flattening it
into a form that is usable by the code styling UI.

`sample_code_style_input.json` represents the styling information as an 
S-expression that is sent from Avail.

`sample_code_style_output.json` represents the processed styling information 
that
has been flattened into a single array that can be used by the UI's styling
framework.

The sample files represent the styling of the following block of Avail code:

```
1  Method "_plus_" is
2  [
3     x : number,
4     y : number
5  |
6     x + y
7  ];
```

The transformation from the input to the output involves a depth-first 
traversal of the S-expression tree. Each quoted string that is a single 
element, *lexeme*, in the tree (nested JSON array) must be parsed into the 
individual elements, *segments*, that appear in JSON objects alongside the
segment's metadata. 

The following is an example of one of the *lexemes* taken
from `sample_code_style_output.json`. 

```
"_+_"
```

The following is an example of one of these objects taken 
from `sample_code_style_output.json`. It represents the `+` token taken from 
line 6 of the block of Avail code above (*the above lexeme*):

```json5
{
    "segment": "+ ",
    "semanticClassifier": "#send",
    "methodName": "_+_",
    "sourceModule": "more/numbers",
    "generated": false,
    "lineNumber": 123
}
```

## Processing

The segments of a lexeme are processed in order.  When an underscore (`_`) is
encountered, the next child of the current tree node is processed to produce
output in place of the underscore.

Each lexeme may include escaped characters. The escaping character is a 
backslash, `\ `. Any escaped character should be treated as an ordinary
character, suppressing any special interpretation it might otherwise have.
Characters that may be escaped are:

 * `\ `
 * `"`
 * `_`
 * `«`
 * `»`
 * `‡`

Note that in the JSON source itself, the quoted lexeme must use *two*
backslashes to escape the above characters. The first backslash is to keep JSON
from treating the second backslash as an escape within a JSON string, and the
second one indicates that the lexeme should treat the next character literally.

### Whitespace

JSON allows `\n` and `\t` to occur in its strings (i.e., within a quoted string,
a single backslash followed by an `n` or `t`). These represent the newline
(`u+000A`) and tab (`u+0009`) characters, respectively.

In order to be able to style, or even transform, source code whitespace for the
client (such as transforming space characters to interpuncts, tabs to arrows,
etc.), all whitespace in the source must also be represented in a segment
string.

In order to specify that certain verbatim spacing MUST be styled as part of a
lexeme, that spacing MUST be included in the lexeme string in the input.
However, only spaces that follow a literal character can be represented this
way. Spaces that follow parameter underscores (or separate repeated underscores)
cannot be represented this way because the parser will attach them to the
parameter.

The styling of spaces actually encountered will be specified by the nearest
ancestor's `spacingClassifier`, or the default style if no ancestor has one.

### String Literals
String literals must have special styling applied depending on how it is 
used. Each String must be broken up into lexemes, sub character ranges, 
grouped by their applied style (*semanticClassifier*).

#### Basic String
Any String literal that is not a method name must allow for two different 
semantic  classifiers to be applied depending on the character sub ranges:
 1. **Control Characters** - Anything preceded by a `\` such as `\n`, `\t`, 
    or the standard manner in which Avail splits strings over multiple 
    lines `|\`.
 1. **Common Characters** - These are all the non-special characters that 
    include the opening and closing `"`.

#### Method Name
Any String literal that is a method name must allow for three different semantic
classifiers to be applied depending on the character sub ranges: the two 
provided in *Basic String* as well as: 
are 
styled in the sam
1. **Metacharacters** - All of the characters listed in the enumeration,
   `Metacharacter` in `MessageSplitter.kt`.
   
![Alt text](img/string-style.jpg?raw=true "String Style")

### Repetitions

Special handling of Avail repetitions is not possible, due to the possibility of
varying space character uses in each repeated instance. Instead, Avail must emit
the fully-expanded lexeme with the specific space characters used at each
"repeat" site.

For example, when a method name looks like this:
```
"«_→_‡,»"
```
but is intended to represent the contents of the following map:
```
y ::= { 1 →"one", 2 → "two",3 →   "three"};
```
then the expanded lexeme would be:
```
"_→_, _→ _,_→   _"
```
