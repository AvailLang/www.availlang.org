DOT       = dot
CP        = cp
MV        = mv
TARGETDIR = ../../../../_images/examples

%.svg: %.gv
	$(DOT) -Tsvg -o $@ $<

SVGS=\
do-until-alternate_with.svg \
until-do.svg

all compile: $(SVGS)

install: compile
	$(MV) do-until-alternate_with.svg $(TARGETDIR)/guess-the-number
	$(CP) tuple-constructor.svg $(TARGETDIR)/hilbert-hotel
	$(MV) until-do.svg $(TARGETDIR)/fibonacci

clean:
	@rm -f $(SVGS)
