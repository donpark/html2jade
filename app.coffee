# coffee . ~/dev/assets/themes/infocus/infocus_html/golden/index.html

FS = require('fs')
Path = require('path')
URL = require('url')

Log = require('log')
log = new Log(Log.INFO)

html2jade = require('./html2jade')

normalize = (arg) ->
    if arg?
        try
            arg = URL.parse(arg)
        catch err
            if arg[0] is '~'
                arg = Path.join(process.env['HOME'], arg)
            else if arg[0] isnt '/'
                arg = Path.join(process.cwd(), arg)
        arg
    else
        null

argv = require('optimist').argv
argv._.map (arg) ->
    input = normalize(arg)
    if input?
        errors = html2jade.convert arg
        if errors?.length
            log.error errors
    else
        log.error 'invalid input: ' + arg