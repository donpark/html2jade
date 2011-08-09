(function() {
  var Converter, Helper, Output, Parser, publicIdDocTypeNames, systemIdDocTypeNames;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  Parser = (function() {
    function Parser(options) {
      if (options == null) {
        options = {};
      }
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
      var _ref, _ref2;
      if (options == null) {
        options = {};
      }
      this.wrapLength = (_ref = options.wrapLength) != null ? _ref : 80;
      this.scalate = (_ref2 = options.scalate) != null ? _ref2 : false;
      this.attrSep = this.scalate ? ' ' : ', ';
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
          if (nodeName !== 'id' && nodeName !== 'class' && typeof (attr.nodeValue != null)) {
            result.push(attr.nodeName + '=\'' + attr.nodeValue.replace(/'/g, '\\\'') + '\'');
          }
        }
        if (result.length > 0) {
          return '(' + result.join(this.attrSep) + ')';
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
        if (data.length > this.wrapLength || data.match(/\r|\n/)) {
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
        if (!wrap || line.length <= this.wrapLength) {
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
          if (line.length + word.length > this.wrapLength) {
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
  publicIdDocTypeNames = {
    "-//W3C//DTD XHTML 1.0 Transitional//EN": "transitional",
    "-//W3C//DTD XHTML 1.0 Strict//EN": "strict",
    "-//W3C//DTD XHTML 1.0 Frameset//EN": "frameset",
    "-//W3C//DTD XHTML 1.1//EN": "1.1",
    "-//W3C//DTD XHTML Basic 1.1//EN": "basic",
    "-//WAPFORUM//DTD XHTML Mobile 1.2//EN": "mobile"
  };
  systemIdDocTypeNames = {
    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd": "transitional",
    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd": "strict",
    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd": "frameset",
    "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd": "1.1",
    "http://www.w3.org/TR/xhtml-basic/xhtml-basic11.dtd": "basic",
    "http://www.openmobilealliance.org/tech/DTD/xhtml-mobile12.dtd": "mobile"
  };
  Converter = (function() {
    function Converter(options) {
      var _ref, _ref2;
      if (options == null) {
        options = {};
      }
      this.scalate = (_ref = options.scalate) != null ? _ref : false;
      this.helper = (_ref2 = options.helper) != null ? _ref2 : new Helper(options);
    }
    Converter.prototype.document = function(document, output) {
      var docTypeName, doctype, publicId, systemId;
      if (document.doctype != null) {
        doctype = document.doctype;
        docTypeName = void 0;
        publicId = doctype.publicId;
        systemId = doctype.systemId;
        if ((publicId != null) && (publicIdDocTypeNames[publicId] != null)) {
          docTypeName = publicIdDocTypeNames[publicId];
        } else if ((systemId != null) && (systemIdDocTypeNames[systemId] != null)) {
          docTypeName = systemIdDocTypeNames[systemId] != null;
        } else if ((doctype.name != null) && doctype.name.toLowerCase() === 'html') {
          docTypeName = '5';
        }
        if (docTypeName != null) {
          output.writeln('!!! ' + docTypeName);
        }
      }
      return this.element(document.documentElement, output);
    };
    Converter.prototype.element = function(node, output) {
      var firstline, tagAttr, tagHead, tagName, tagText;
      if (!(node != null ? node.tagName : void 0)) {
        return;
      }
      console.log("tag: " + node.tagName);
      tagName = node.tagName.toLowerCase();
      tagHead = this.helper.tagHead(node);
      tagAttr = this.helper.tagAttr(node);
      tagText = this.helper.tagText(node);
      if (tagName === 'script' || tagName === 'style') {
        if (!this.scalate || node.hasAttribute('src')) {
          output.writeln(tagHead + tagAttr);
          return this.helper.writeTextContent(node, output, false, false, false);
        } else {
          output.writeln(tagName === 'script' ? ':javascript' : ':css');
          return this.helper.writeTextContent(node, output, false, false, false);
        }
      } else if (['pre'].indexOf(tagName) !== -1) {
        output.writeln(tagHead + tagAttr + '.');
        output.enter();
        firstline = true;
        this.helper.forEachChild(node, __bind(function(child) {
          var data;
          if (child.nodeType === 3) {
            data = child.data;
            if ((data != null) && data.length > 0) {
              if (firstline) {
                if (data.search(/\r\n|\r|\n/) === 0) {
                  data = data.replace(/\r\n|\r|\n/, '');
                }
                data = '\\n' + data;
                firstline = false;
              }
              data = data.replace(/\t/g, '\\t');
              data = data.replace(/\r\n|\r|\n/g, '\n' + output.indents);
              return output.write(data);
            }
          }
        }, this));
        output.writeln();
        return output.leave();
      } else if (tagText) {
        if (tagText.length > 0 && tagText.charAt(0) === '=') {
          tagText = '\\' + tagText;
        }
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
      console.log("text: " + node.data);
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
      if (data == null) {
        data = '';
      }
      if (indent) {
        return this.stream.write(this.indents + data);
      } else {
        return this.stream.write(data);
      }
    };
    Output.prototype.writeln = function(data, indent) {
      if (indent == null) {
        indent = true;
      }
      if (data == null) {
        data = '';
      }
      if (indent) {
        return this.stream.write(this.indents + data + '\n');
      } else {
        return this.stream.write(data + '\n');
      }
    };
    return Output;
  })();
  exports.Parser = Parser;
  exports.Output = Output;
  exports.Converter = Converter;
  exports.Helper = Helper;
  exports.convert = function(input, output, options) {
    var _ref;
    if (options == null) {
      options = {};
    }
    if ((_ref = options.parser) == null) {
      options.parser = new Parser(options);
    }
    return options.parser.parse(input, function(errors, window) {
      var _ref2;
      if (errors != null ? errors.length : void 0) {
        return errors;
      } else {
        if (output == null) {
          output = new Output(process.stdout);
        }
        if ((_ref2 = options.converter) == null) {
          options.converter = new Converter(options);
        }
        options.converter.document(window.document, output);
        return null;
      }
    });
  };
}).call(this);
