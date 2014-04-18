DOT       = dot
MV        = mv
TARGETDIR = ../../../../../_images/modules/

%.svg: %.gv
	$(DOT) -Tsvg -o $@ $<

SVGS=\
upstream-downstream.svg

all compile: $(SVGS)

install: compile
	$(MV) $(SVGS) $(TARGETDIR)

clean:
	@rm -f $(SVGS)
