#! /bin/bash
set -e

plugin=$(basename "$PWD")
plugin_uppercase=$(echo "$plugin" | awk '{first=toupper(substr($0,1,1)); rest=substr($0,2); print first rest}')
echo $plugin_uppercase

cp -R ../backdrop/examples/ examples
cd examples
for dir in backdrop-*; do mv "$dir" "${dir/backdrop-/$plugin-}"; done
cd ..
find examples -type f -exec sh -c 'tmpfile=$(mktemp); sed "s/backdrop/$1/g" "$0" > "$tmpfile" && mv "$tmpfile" "$0"' {} $plugin \;
find examples -type f -exec sh -c 'tmpfile=$(mktemp); sed "s/Backdrop/$1/g" "$0" > "$tmpfile" && mv "$tmpfile" "$0"' {} $plugin_uppercase \;
mv examples/$plugin examples/$plugin-init

rm builders/$plugin-apache.js

