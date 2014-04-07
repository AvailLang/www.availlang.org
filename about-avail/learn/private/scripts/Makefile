DOT       = dot
MV        = mv
TARGETDIR = ../../../../_images/examples

%.svg: %.gv
	$(DOT) -Tsvg -o $@ $<

SVGS=\
do-until-alternate_with.svg

all compile: $(SVGS)

install: compile
	$(MV) do-until-alternate_with.svg $(TARGETDIR)/guess-the-number

clean:
	@rm -f $(SVGS)
