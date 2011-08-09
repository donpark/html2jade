# html2jade #

`html2jade` converts HTML into [Jade](https://github.com/visionmedia/jade) format.

## Install ##

    npm install html2jade

## Usage ##

Outputs to stdout if input is URL

    html2jade http://twitter.com
    
    html2jade http://twitter.com > twitter.jade
    
Outputs to file if input is file
    
    html2jade mywebpage.html # outputs mywebpage.jade
    html2jade public/*.html  # converts all .html files to .jade
    
To generate [Scalate](http://scalate.fusesource.org/) compatible output:

    html2jade --scalate http://twitter.com
    html2jade --scalate http://twitter.com > twitter.jade
    html2jade --scalate mywebpage.html
    html2jade --scalate public/*.html

## Status ##

Mostly usable but sometimes requires fixing up, usually involving conditionals and scripts indentation.

While converting a fairly complicated theme package with ~20 HTML files, I had to hand-edit just twice.