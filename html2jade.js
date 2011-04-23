(function() {
  var Converter, Helper, Output, Parser;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  Parser = (function() {
    function Parser() {
      this.jsdom = require('jsdom');
    }
    Parser.prototype.parse = function(arg, cb) {
      if (arg != null) {
        return this.jsdom.env(arg, function(errors, window) {
          if (errors != null ? errors.length : void 0) {
            return cb(errors);
          } else {
            return cb(null, window);
          }
        });
      } else {
        return cb('null file');
      }
    };
    return Parser;
  })();
  Helper = (function() {
    function Helper(options) {
      var _base, _ref, _ref2;
      this.options = options;
      (_ref = this.options) != null ? _ref : this.options = {};
      (_ref2 = (_base = this.options).wrapLength) != null ? _ref2 : _base.wrapLength = 80;
    }
    Helper.prototype.tagHead = function(node) {
      var classes, result;
      result = node.tagName !== 'DIV' ? node.tagName.toLowerCase() : '';
      if (node.id) {
        result += '#' + node.id;
      }
      if (node.hasAttribute('class')) {
        classes = node.getAttribute('class').split(/\s+/).filter(function(item) {
          return (item != null) && item.trim().length > 0;
        });
        result += '.' + classes.join('.');
      }
      if (result.length === 0) {
        result = 'div';
      }
      return result;
    };
    Helper.prototype.tagAttr = function(node) {
      var attr, attrs, nodeName, result, _i, _len;
      attrs = node.attributes;
      if (attrs.length === 0) {
        return '';
      } else {
        result = [];
        for (_i = 0, _len = attrs.length; _i < _len; _i++) {
          attr = attrs[_i];
          nodeName = attr.nodeName;
          if (nodeName !== 'id' && nodeName !== 'class' && attr.nodeValue) {
            result.push(attr.nodeName + '=\'' + attr.nodeValue.replace(/'/g, '\\\'') + '\'');
          }
        }
        if (result.length > 0) {
          return '(' + result.join(', ') + ')';
        } else {
          return '';
        }
      }
    };
    Helper.prototype.tagText = function(node) {
      var data, _ref;
      if (((_ref = node.firstChild) != null ? _ref.nodeType : void 0) !== 3) {
        return null;
      } else if (node.firstChild !== node.lastChild) {
        return null;
      } else {
        data = node.firstChild.data;
        if (data.length > this.options.wrapLength || data.match(/\r|\n/)) {
          return null;
        } else {
          return data;
        }
      }
    };
    Helper.prototype.forEachChild = function(parent, cb) {
      var child, _results;
      if (parent) {
        child = parent.firstChild;
        _results = [];
        while (child) {
          cb(child);
          _results.push(child = child.nextSibling);
        }
        return _results;
      }
    };
    Helper.prototype.writeTextContent = function(node, output, pipe, trim, wrap) {
      if (pipe == null) {
        pipe = true;
      }
      if (trim == null) {
        trim = true;
      }
      if (wrap == null) {
        wrap = true;
      }
      output.enter();
      this.forEachChild(node, __bind(function(child) {
        return this.writeText(child, output, pipe, trim, wrap);
      }, this));
      return output.leave();
    };
    Helper.prototype.writeText = function(node, output, pipe, trim, wrap) {
      var data, lines;
      if (pipe == null) {
        pipe = true;
      }
      if (trim == null) {
        trim = true;
      }
      if (wrap == null) {
        wrap = true;
      }
      if (node.nodeType === 3) {
        data = node.data || '';
        if (data.length > 0) {
          lines = data.split(/\r|\n/);
          return lines.forEach(__bind(function(line) {
            return this.writeTextLine(line, output, pipe, trim, wrap);
          }, this));
        }
      }
    };
    Helper.prototype.writeTextLine = function(line, output, pipe, trim, wrap) {
      var lines, prefix;
      if (pipe == null) {
        pipe = true;
      }
      if (trim == null) {
        trim = true;
      }
      if (wrap == null) {
        wrap = true;
      }
      prefix = pipe ? '| ' : '';
      if (trim) {
        line = line ? line.trim() : '';
      }
      if (line && line.length > 0) {
        if (!wrap || line.length <= this.options.wrapLength) {
          return output.writeln(prefix + line);
        } else {
          lines = this.breakLine(line);
          if (lines.length === 1) {
            return output.writeln(prefix + line);
          } else {
            return lines.forEach(__bind(function(line) {
              return this.writeTextLine(line, output, pipe, trim, wrap);
            }, this));
          }
        }
      }
    };
    Helper.prototype.breakLine = function(line) {
      var lines, word, words;
      if (line && line.length > 0) {
        lines = [];
        words = line.split(/\s+/);
        line = '';
        while (words.length) {
          word = words.shift();
          if (line.length + word.length > this.options.wrapLength) {
            lines.push(line);
            line = word;
          } else if (line.length) {
            line += ' ' + word;
          } else {
            line = word;
          }
        }
        if (line.length) {
          lines.push(line);
        }
        return lines;
      } else {
        return [];
      }
    };
    return Helper;
  })();
  Converter = (function() {
    function Converter(options) {
      var _base, _ref, _ref2;
      this.options = options;
      (_ref = this.options) != null ? _ref : this.options = {};
      this.helper = (_ref2 = (_base = this.options).helper) != null ? _ref2 : _base.helper = new Helper();
    }
    Converter.prototype.document = function(document, output) {
      return this.element(document.documentElement, output);
    };
    Converter.prototype.element = function(node, output) {
      var tagAttr, tagHead, tagName, tagText;
      tagName = node.tagName;
      tagHead = this.helper.tagHead(node);
      tagAttr = this.helper.tagAttr(node);
      tagText = this.helper.tagText(node);
      if (['SCRIPT', 'STYLE', 'PRE'].indexOf(tagName) !== -1) {
        output.writeln(tagHead + tagAttr);
        return this.helper.writeTextContent(node, output, false, false, false);
      } else if (tagText) {
        return output.writeln(tagHead + tagAttr + ' ' + tagText);
      } else {
        output.writeln(tagHead + tagAttr);
        return this.children(node, output);
      }
    };
    Converter.prototype.children = function(parent, output) {
      output.enter();
      this.helper.forEachChild(parent, __bind(function(child) {
        var nodeType;
        nodeType = child.nodeType;
        if (nodeType === 1) {
          return this.element(child, output);
        } else if (nodeType === 3) {
          return this.text(child, output);
        } else if (nodeType === 8) {
          return this.comment(child, output);
        } else {
          return output.writeln('*** nodeType: ' + nodeType);
        }
      }, this));
      return output.leave();
    };
    Converter.prototype.text = function(node, output) {
      node.normalize();
      return this.helper.writeText(node, output);
    };
    Converter.prototype.comment = function(node, output) {
      var condition;
      condition = node.data.match(/\s*\[(if\s+[^\]]+)\]/);
      if (condition) {
        output.writeln('/' + condition[1]);
        return this.conditional(node, output);
      } else {
        return output.writeln('//' + node.data);
      }
    };
    Converter.prototype.conditional = function(node, output) {
      var data, parser;
      data = node._text;
      data = data.replace(/\s*\[if\s+[^\]]+\]>\s*/, '');
      data = data.replace('<![endif]', '');
      output.enter();
      parser = new Parser();
      parser.parse(data, __bind(function(errors, window) {
        return this.children(window.document.body, output);
      }, this));
      return output.leave();
    };
    return Converter;
  })();
  Output = (function() {
    function Output(stream) {
      this.stream = stream;
      this.indents = '';
    }
    Output.prototype.enter = function() {
      return this.indents += '  ';
    };
    Output.prototype.leave = function() {
      return this.indents = this.indents.substring(2);
    };
    Output.prototype.write = function(data, indent) {
      if (indent == null) {
        indent = true;
      }
      data != null ? data : data = '';
      if (indent) {
        data = this.indents + data;
      }
      return this.stream.write(data);
    };
    Output.prototype.writeln = function(data, indent) {
      if (indent == null) {
        indent = true;
      }
      data != null ? data : data = '';
      if (indent) {
        data = this.indents + data;
      }
      return this.stream.write(data + '\n');
    };
    return Output;
  })();
  exports.Parser = Parser;
  exports.Output = Output;
  exports.Converter = Converter;
  exports.Helper = Helper;
  exports.convert = function(input, parser, converter, output) {
    parser != null ? parser : parser = new Parser();
    return parser.parse(input, function(errors, window) {
      if (errors != null ? errors.length : void 0) {
        return errors;
      } else {
        converter != null ? converter : converter = new Converter();
        output != null ? output : output = new Output(process.stdout);
        converter.document(window.document, output);
        return null;
      }
    });
  };
}).call(this);
