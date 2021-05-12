DOT       = dot
MV        = mv
TARGETDIR = ../../../../../images/type-system/

%.svg: %.gv
	$(DOT) -Tsvg -o $@ $<

SVGS=\
type-system-overview.svg \
type-system-type-focus.svg \
type-system-character-focus.svg \
type-system-boolean-focus.svg \
type-system-number-focus.svg \
type-system-extended-integer-focus.svg \
type-system-tuple-focus.svg \
type-system-string-focus.svg \
type-system-set-focus.svg \
type-system-map-focus.svg \
type-system-token-focus.svg \
type-system-phrase-focus.svg

all compile: $(SVGS)

install: compile
	$(MV) $(SVGS) $(TARGETDIR)

clean:
	@rm -f $(SVGS)
