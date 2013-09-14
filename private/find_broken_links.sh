#!/bin/bash

wget --spider -o /tmp/avail_broken_links.log -e robots=off -r -p http://avail.local
