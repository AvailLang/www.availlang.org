DOT       = dot
CP        = cp
MV        = mv
TARGETDIR = ../../../../../_images/modules/

%.svg: %.gv
	$(DOT) -Tsvg -o $@ $<

SVGS=\
upstream-downstream.svg

all compile: $(SVGS)

install: compile
	$(MV) $(SVGS) $(TARGETDIR)
	$(CP) import-specification.svg $(TARGETDIR)
	$(CP) version-list.svg $(TARGETDIR)
	$(CP) custom-import-rules-list.svg $(TARGETDIR)
	$(CP) check-pragma.svg $(TARGETDIR)
	$(CP) method-pragma.svg $(TARGETDIR)
	$(CP) stringify-pragma.svg $(TARGETDIR)
	$(CP) module-roots-path.svg $(TARGETDIR)
	$(CP) module-root-specification.svg $(TARGETDIR)
	$(CP) module-root-path.svg $(TARGETDIR)
	$(CP) canonical-name.svg $(TARGETDIR)
	$(CP) module-renames-file.svg $(TARGETDIR)

clean:
	@rm -f $(SVGS)
