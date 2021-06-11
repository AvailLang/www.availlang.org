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
    "style": "#send",
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

JSON allows `\n` and `\t` to occur in its strings (i.e., within a quoted string,
a single backslash followed by an `n` or `t`). These represent the newline
(`u+000A`) and tab (`u+0009`) characters, respectively. These characters are
processed specially by the S-expression transformer.

When processing of a node begins, the current indent level is recorded as the
`node-start indent`. When an `\n` is encountered in the lexeme, a new output
line is started, automatically indented to the node-start indent level, and
the current indent level is reset to the node-start indent.

When a run of `\t` characters are encountered, the indent level is set to the
node-start index plus the number of `\t` characters. A new line is then started
(no `\n` is needed for this), which starts at the new current indent level.
Child nodes processed while this tab is active will capture this new indent
level as their node-start indent. A subsequent `\n` or run of `\t` characters
will reset the level relative to the current node's node-start indent.



### Repetitions

Special handling of Avail repetitions is required. A repetition in Avail can be
identified as a sequence of characters surrounded by guillemets, `« … »` with an
optional double dagger (`‡`) inside the guillemets. Omitting the double dagger
is equivalent to including it just before the close-guillemet. Guillemet lexemes
must both start with an open guillemet `«` and end with a close guillemet `»`:
no other characters can come before or after the guillemets. An example of a
repetition is:
```
"«_:_‡and»"
```
The number of child lexemes that follows the guillemet lexeme must come in
multiples of the underscores to the left of the double dagger (`‡`). In the
provided example, because there are two underscores to the left of the double
dagger there must be exactly two child lexemes for each repetition. If the
lexeme had instead been `"«_:_:_‡and»"`, there would need to be exactly three
child lexemes for each repetition.

All the characters to the right of the double dagger (`‡`) must appear as 
*segments* between each repetition present in the processed output. The 
segment should appear `n-1` times, where `n` is the number of repetitions 
present.

The following is an example of an Avail map literal: 
```
y ::= { 1 → "one", 2 → "two", 3 → "three"};
```
It uses repetitions in its method signature. This is deconstructed for 
styling: the input from Avail is represented by 
`sample_repetition_code_style_input.json`, the processed output is 
represented by `sample_repetition_code_style_output.json`.

In the atypical case that there are underscores *after* the double dagger, we
expect the child nodes to correspond with underscores to the left of the double
dagger (if any), followed by the underscores to the right of the double dagger,
followed by underscores to the left again, etc., ending with the underscores on
the *left* of the double dagger (since the right portion only occurs *between*
iterations). If there are `L` underscores to the left of the double dagger, and
`R` underscores to the right of the double dagger, the only valid counts of
children are L + n * (R + L), where n ≥ 0.
