# chessviz

A chess visualization training tool.

## Dev setup

Running `npm install` from this directory should get type annotations and
auto-imports working for the libraries we're using, but no build step should be
necessary.

Run `python3 -m http.server` from the root of this project to get a local HTTP
server that you can use to preview (at localhost:8000 by default).
(Unfortunately, opening stuff as file://... gets you stymied by CORS
restrictions on loading scripts from a local HTML file.)