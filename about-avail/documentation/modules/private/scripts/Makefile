DOT       = dot
CP        = cp
MV        = mv
TARGETDIR = ../../../../../images/modules/

%.svg: %.gv
	$(DOT) -Tsvg -o $@ $<

SVGS=\
feature-visibility.svg \
module-life-cycle.svg \
module-resolution.svg \
name-resolution.svg \
upstream-downstream.svg

all compile: $(SVGS)

install: compile
	$(MV) $(SVGS) $(TARGETDIR)
	$(CP) canonical-name.svg $(TARGETDIR)
	$(CP) check-pragma.svg $(TARGETDIR)
	$(CP) custom-import-rules-list.svg $(TARGETDIR)
	$(CP) import-specification.svg $(TARGETDIR)
	$(CP) method-pragma.svg $(TARGETDIR)
	$(CP) module-renames-file.svg $(TARGETDIR)
	$(CP) module-root-path.svg $(TARGETDIR)
	$(CP) module-root-specification.svg $(TARGETDIR)
	$(CP) module-roots-path.svg $(TARGETDIR)
	$(CP) stringify-pragma.svg $(TARGETDIR)
	$(CP) version-list.svg $(TARGETDIR)

clean:
	@rm -f $(SVGS)
