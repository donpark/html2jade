#!/usr/bin/env node
'use strict';


const commander = require('commander');
const fs = require('fs');
const html2Jade = require('./html2jade');
const http = require('http');
const https = require('https');
const mkdirp = require('mkdirp');
const url = require('url');
const path = require('path');
const CLI = {

    run: function () {

        if (!commander.args.length) {
            this.error('Can\'t continue; argument(s) missing.', null, true);
        }

        if (commander.outdir && !fs.existsSync((commander.outdir))) {
            try {
                mkdirp.sync(commander.outdir);
            } catch (error) {
                this.error('Directory creation error', error);
            }
        }

        const urlInputHandler = res => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => this.convert(data, undefined, commander));
        };

        for (let i = 0; i < commander.args.length; i++) {
            let arg = commander.args[i];
            let inputUrl = null;

            if (typeof arg === 'string' && !fs.existsSync(arg)) {
                try {
                    inputUrl = url.parse(arg);
                } catch (error) {}
            }

            if (inputUrl && inputUrl.protocol) {
                commander.inputType = 'url';
                (inputUrl.protocol === 'https:' ? https : http).get(arg, urlInputHandler);
            } else {
                let inputPath = this.parsePath(arg);
                if (fs.existsSync(inputPath)) {
                    if ((fs.statSync(inputPath)).isFile()) {
                        let outputDir = commander.outdir ? commander.outdir : path.dirname(arg);
                        let outputPath = path.join(outputDir, path.basename(inputPath, path.extname(inputPath)) + '.jade');
                        let outputStream = fs.createWriteStream(outputPath, {
                            flags: 'w',
                            encoding: 'utf8'
                        });
                        commander.inputType = 'file';
                        this.convert(inputPath, new html2Jade.StreamOutput(outputStream), commander);
                    }
                } else {
                    this.error(`Input file "${arg}" doesn't exist.`);
                }
            }
        }
    },

    parsePath: function (arg) {

        if (typeof arg !== 'string') {
            this.error('Invalid input:', arg);
        } else if (path.resolve('/', arg) === arg) {
            return arg;
        } else if (arg.length >= 2 && arg.substring(0, 2) === '~/') {
            return path.join(process.env.HOME, arg.substring(2));
        }

        return path.join(process.cwd(), arg);
    },

    convert: function (input, output, options) {

        if (!input) {
            return this.error('Invalid input', input);
        }

        try {
            let errors = html2Jade.convert(input, output, options);
            if (errors) {
                this.error('Parser error:', errors);
            }
        } catch (error) {
            this.error(error);
        }
    },

    error: (message, errors = '', showHelp = false) => {

        console.error(`\n  ${message} ${errors || ''}`);
        if (showHelp) {
            commander.help();
        }
    }
};

commander
    .version(require('../package').version)
    .option('-p, --pug', 'generate and output .pug file')
    .option('-d, --double', 'use double quotes for attributes')
    .option('-s, --scalate', 'generate jade syntax compatible with Scalate')
    .option('-t, --tabs', 'use tabs instead of spaces')
    .option('-o, --outdir <dir>', 'path to output generated jade file(s) to')
    .option('-n, --nspaces <n>', 'the number of spaces to indent generated files with', parseInt)
    .option('--donotencode', 'do not html encode characters (useful for templates)')
    .option('--bodyless', 'do not output enveloping html and body tags')
    .option('--numeric', 'use numeric character entities')
    .option('--noattrcomma', 'omit attribute separating commas')
    .option('--noemptypipe', 'omit lines with only pipe (\'|\') printable character')
    .parse(process.argv);

CLI.run();
