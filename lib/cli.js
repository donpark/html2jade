#!/usr/bin/env node
'use strict';


const html2Jade = require('./html2jade');
const commander = require('commander');
const fs = require('fs');
const http = require('http');
const https = require('https');
const url = require('url');
const path = require('path');
const version = require('../package').version;
const CLI = {

    run: function () {

        /**
         * @TODO: Make the folder creation recursive
         */
        if (commander.outdir && !fs.existsSync((path.dirname(commander.outdir)))) {
            fs.mkdirSync(path.dirname(commander.outdir));
        }

        if (!commander.args || !commander.args.length) {
            this.error('Can\'t continue; argument(s) missing.', null, true);
        }

        const urlInputHandler = res => {
            let data = '';
            res.on('data', chunk => {
                data += chunk;
            });
            res.on('end', () => {
                this.convert(data, undefined, commander);
            });
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
                let handler = inputUrl.protocol === 'https:' ? https : http;
                handler.get(arg, urlInputHandler);
            } else {
                let inputPath = this.parsePath(arg);
                if (fs.existsSync(inputPath)) {
                    if ((fs.statSync(inputPath)).isFile()) {
                        let outputDir = commander.outdir ? path.dirname(commander.outdir) : path.dirname(arg);
                        let outputPath = path.join(outputDir, path.basename(inputPath, path.extname(inputPath)) + '.jade');
                        console.log(path.dirname(commander.outdir), outputDir, outputPath);
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
            // Already absolute path
            return arg;
        } else if (arg.length >= 2 && arg.substring(0, 2) === '~/') {
            // Home path
            return path.join(process.env.HOME, arg.substring(2));
        } else {
            // Relative to current path
            return path.join(process.cwd(), arg);
        }
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
    .version(version)
    .option('-d, --double', 'use double quotes for attributes')
    .option('-s, --scalate', 'generate jade syntax compatible with Scalate')
    .option('-t, --tabs', 'use tabs instead of spaces')
    .option('-o, --outdir <dir>', 'path to output generated jade file(s) to', CLI.parsePath)
    .option('-n, --nspaces <n>', 'the number of spaces to indent generated files with', parseInt)
    .option('--donotencode', 'do not html encode characters (useful for templates)')
    .option('--bodyless', 'do not output enveloping html and body tags')
    .option('--numeric', 'use numeric character entities')
    .option('--noattrcomma', 'omit attribute separating commas')
    .option('--noemptypipe', 'omit lines with only pipe (\'|\') printable character')
    .parse(process.argv)

CLI.run();
