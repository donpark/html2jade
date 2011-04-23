(function() {
  var FS, Log, Path, URL, argv, html2jade, log, normalize;
  FS = require('fs');
  Path = require('path');
  URL = require('url');
  Log = require('log');
  log = new Log(Log.INFO);
  html2jade = require('./html2jade');
  normalize = function(arg) {
    if (arg != null) {
      try {
        arg = URL.parse(arg);
      } catch (err) {
        if (arg[0] === '~') {
          arg = Path.join(process.env['HOME'], arg);
        } else if (arg[0] !== '/') {
          arg = Path.join(process.cwd(), arg);
        }
      }
      return arg;
    } else {
      return null;
    }
  };
  argv = require('optimist').argv;
  argv._.map(function(arg) {
    var errors, input;
    input = normalize(arg);
    if (input != null) {
      errors = html2jade.convert(arg);
      if (errors != null ? errors.length : void 0) {
        return log.error(errors);
      }
    } else {
      return log.error('invalid input: ' + arg);
    }
  });
}).call(this);
