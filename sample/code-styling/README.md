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

Within each lexeme there may be underscores, `_`,. These underscores 
represent a node in the tree that must be traversed (*depth-first*). Each 
segment in the processed output either terminates at an underscore replacing 
the underscore with a space ` ` character, or it terminates at the end of the
lexeme.

Each lexeme may include escaped characters. The escaping character is a 
backslash, `\\`. Any escaped character should be ignored. Characters that may 
be escaped are:

 * `\` - `\\` should treat the immediately next character as not being ignored.
 * `"` - The lexeme contains a string, the contents of which should be ignored.
 * `_` - An escaped underscore should not be treated as a node in the tree.

### Repetitions

Special handling of Avail repetitions is required. A repetition in Avail can be
identified as a sequence of characters surrounded by guillemets, `« … »` with a 
double dagger inside the guillemets, `‡`. Guillemet lexemes must both start with
an open guillemet `«` and end with a close guillemet `»`: no other characters 
can come before or after the guillemets. An example of a repetition is:
```
"«_:_‡,|,»"
```
The number of child lexemes that follows the guillemet lexeme must come in 
multiples of the underscores to the left of the double dagger (`‡`). In the 
provided example, because there are two underscores to the left of the 
double dagger there must be exactly two child lexemes for each repetition. 
If the lexeme had been `"«_:_:_‡,|,»"`, there would need to be exactly three 
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
