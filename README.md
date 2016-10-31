# html2jade #
[![Build Status](https://travis-ci.org/donpark/html2jade.png?branch=master)](https://travis-ci.org/donpark/html2jade)

`html2jade` converts HTML into [Jade](https://github.com/visionmedia/jade) format.

This module is now maintained by [@aichholzer](https://github.com/aichholzer)


## Status ##

Mostly usable but sometimes requires fixing up, usually involving conditionals and scripts indentation.

While converting a fairly complicated theme package with ~20 HTML files, I had to hand-edit just twice.

Compatible with Node.js 4.0+ (verified with v4.2.4) but likely **NOT** with Node.js 0.11.x, 0.12.x, and io.js.


## Requirements

`html2jade` version prior to 0.7 support OS X and Linux only.

`html2jade` version 0.7+ should support OS X, Windows, and Linux.

## Install ##

    npm install -g html2jade

## Command-line Usage ##

Outputs to stdout if input is URL

    html2jade http://twitter.com

    html2jade http://twitter.com > twitter.jade

Outputs to file if input is file

    html2jade mywebpage.html # outputs mywebpage.jade
    html2jade public/*.html  # converts all .html files to .jade

Convert HTML from `stdin`

    cat mywebpage.html | html2jade -

To generate [Scalate](http://scalate.fusesource.org/) compatible output:

    html2jade --scalate http://twitter.com
    html2jade --scalate http://twitter.com > twitter.jade
    html2jade --scalate mywebpage.html
    html2jade --scalate public/*.html

### Command-line Options ###

* `-d, --double` - use double quotes for attributes
* `-o, --outdir <dir>` - path to output generated jade file(s) to
* `-n, --nspaces <n>` - the number of spaces to indent generated files with. Default is 2 spaces
* `-t, --tabs` - use tabs instead of spaces
* `--donotencode` - do not html encode characters. This is useful for template files which may contain expressions like {{username}}
* `--bodyless` - do not output enveloping html and body tags
* `--numeric` - use numeric character entities
* `-s, --scalate` - generate [Scalate](http://scalate.fusesource.org/) variant of jade syntax
* `--noattrcomma` - omit attribute separating commas
* `--noemptypipe` - omit lines with only pipe ('|') printable character

## Programmatic Usage (>= 0.0.7)

To convert raw HTML into Jade:

    var html2jade = require('html2jade');
    var html = "<html><body>Hello World</body></html>";
    html2jade.convertHtml(html, {}, function (err, jade) {
      // do your thing
    });

To convert DOM document into Jade (client-side):

    // assumes html2jade.js file has been loaded
    Html2Jade.convertDocument(document, {}, function (err, jade) {
      // do your thing
    });
    
## Converting Mustache/Handlebars Templates

Jade is commonly used to generate HTML with embedded Mustache or Handlebars templates.

Be sure to use version 0.8+ if you use template expressions in element IDs or CSS class names
to avoid generating invalid Jade files.

## Tools using `html2jade` ##

### Web version ###

There is a [web version](http://html2jade.aaron-powell.com/) of `html2jade`,
kindly provided by [@aaronpowell](https://github.com/aaronpowell).

Pascal Garber's [jade2html2jade](https://github.com/JumpLink/jade2html2jade) does roundtrip from jade to HTML and back. [Online demo](http://jumplink.github.io/jade2html2jade/).

### Linux tray app ###

[Miniclip](http://myguidingstar.github.com/miniclip/) is a Linux tray app that quickly converts
HTML to Jade, CSS to Stylus and JS to Coffee from clipboard.

## Testing ##

As of version 0.4, there is a simple unit test that converts HTML files in `test/data` directory
and compare them against Jade files in the same directory. Unit test harness requires `coffee-script`
and `mocha` to be installed globally. Run the tests with command `npm test`.


## Useful forks ##

If you're having issues with `br` line-breaks which apparently Jade has some problems with,
try [@smaudet](https://github.com/smaudet)'s
[`fix-breaklines`](https://github.com/smaudet/html2jade/tree/fix-breaklines) branch.
