
class Parser
    constructor: ->
        @jsdom = require('jsdom')

    parse: (arg, cb) ->
        if arg?
            @jsdom.env arg, (errors, window) ->
                if errors?.length
                    cb(errors)
                else
                    cb(null, window)
        else
            cb('null file')

class Helper
    constructor: (@options) ->
        @options ?= {}
        @options.wrapLength ?= 80
    
    tagHead: (node) ->
        result = if node.tagName isnt 'DIV' then node.tagName.toLowerCase() else ''
        if node.id
            result += '#' + node.id
        if node.hasAttribute('class')
            classes = node.getAttribute('class').split(/\s+/).filter (item) ->
                item? and item.trim().length > 0
            result += '.' + classes.join('.')
        result = 'div' if result.length is 0
        result
        
    tagAttr: (node) ->
        attrs = node.attributes
        if attrs.length is 0
            ''
        else
            result = []
            for attr in attrs
                nodeName = attr.nodeName
                if nodeName isnt 'id' and nodeName isnt 'class' and attr.nodeValue
                    result.push attr.nodeName + '=\'' + attr.nodeValue.replace(/'/g, '\\\'') + '\''
            if result.length > 0
                '(' + result.join(', ') + ')'
            else
                ''

    tagText: (node) ->
        if node.firstChild?.nodeType isnt 3
            null
        else if node.firstChild isnt node.lastChild
            null
        else
            data = node.firstChild.data
            if data.length > @options.wrapLength or data.match(/\r|\n/)
                null
            else
                data
    
    forEachChild: (parent, cb) ->
        if parent
            child = parent.firstChild
            while child
                cb(child)
                child = child.nextSibling
        
    writeTextContent: (node, output, pipe = true, trim = true, wrap = true) ->
        output.enter()
        this.forEachChild node, (child) =>
            this.writeText child, output, pipe, trim, wrap
        output.leave()

    writeText: (node, output, pipe = true, trim = true, wrap = true) ->
        if node.nodeType is 3
            data = node.data or ''
            if data.length > 0
                lines = data.split(/\r|\n/)
                lines.forEach (line) =>
                    this.writeTextLine line, output, pipe, trim, wrap
                            
    writeTextLine: (line, output, pipe = true, trim = true, wrap = true) ->
        prefix = if pipe then '| ' else ''
        if trim
            line = if line then line.trim() else ''
        if line and line.length > 0
            if not wrap or line.length <= @options.wrapLength
                output.writeln prefix + line
            else
                lines = this.breakLine line
                if lines.length is 1
                    output.writeln prefix + line
                else
                    lines.forEach (line) =>
                        this.writeTextLine line, output, pipe, trim, wrap
    
    breakLine: (line) ->
        if line and line.length > 0
            lines = []
            words = line.split(/\s+/)
            line = ''
            while words.length
                word = words.shift()
                if line.length + word.length > @options.wrapLength
                    lines.push line
                    line = word
                else if line.length
                    line += ' ' + word
                else
                    line = word
            if line.length
                lines.push line
            lines
        else
            []


publicIdDocTypeNames =
    "-//W3C//DTD XHTML 1.0 Transitional//EN":   "transitional"
    "-//W3C//DTD XHTML 1.0 Strict//EN":         "strict"
    "-//W3C//DTD XHTML 1.0 Frameset//EN":       "frameset"
    "-//W3C//DTD XHTML 1.1//EN":                "1.1"
    "-//W3C//DTD XHTML Basic 1.1//EN":          "basic"
    "-//WAPFORUM//DTD XHTML Mobile 1.2//EN":    "mobile"
    
systemIdDocTypeNames =
    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd":          "transitional"
    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd":                "strict"
    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd":              "frameset"
    "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd":                     "1.1"
    "http://www.w3.org/TR/xhtml-basic/xhtml-basic11.dtd":               "basic"
    "http://www.openmobilealliance.org/tech/DTD/xhtml-mobile12.dtd":    "mobile"
    
        
class Converter
    constructor: (@options) ->
        @options ?= {}
        @helper = @options.helper ?= new Helper()
        
    document: (document, output) ->
        if document.doctype?
            doctype = document.doctype
            docTypeName = undefined
            publicId = doctype.publicId
            systemId = doctype.systemId
            if publicId? and publicIdDocTypeNames[publicId]?
                docTypeName = publicIdDocTypeNames[publicId]
            else if systemId? and systemIdDocTypeNames[systemId]?
                docTypeName = systemIdDocTypeNames[systemId]?
            else if doctype.name? and doctype.name.toLowerCase() is 'html'
                docTypeName = '5'
            if docTypeName?
                output.writeln '!!! ' + docTypeName

        this.element document.documentElement, output

    element: (node, output) ->
        tagName = node.tagName
        tagHead = @helper.tagHead node
        tagAttr = @helper.tagAttr node
        tagText = @helper.tagText node
        if ['SCRIPT', 'STYLE', 'PRE'].indexOf(tagName) isnt -1
            output.writeln tagHead + tagAttr
            @helper.writeTextContent node, output, false, false, false
        else if tagText
            output.writeln tagHead + tagAttr + ' ' + tagText
        else
            output.writeln tagHead + tagAttr
            this.children node, output
        
        #if tagName is 'SCRIPT'
        
    children: (parent, output) ->
        output.enter()
        @helper.forEachChild parent, (child) =>
            nodeType = child.nodeType
            if nodeType is 1 # element
                this.element child, output
            else if nodeType is 3 # text
                this.text child, output
            else if nodeType is 8 # comment
                this.comment child, output
            else
                output.writeln '*** nodeType: ' + nodeType
        output.leave()
            
    text: (node, output) ->
        node.normalize()
        @helper.writeText node, output
    
    comment: (node, output) ->
        condition = node.data.match /\s*\[(if\s+[^\]]+)\]/
        if condition
            output.writeln '/' + condition[1]
            this.conditional node, output
        else
            output.writeln '//' + node.data
            
    conditional: (node, output) ->
        #console.log('******* ' + require('util').inspect(node))
        data = node._text #.replace(node.data, '').replace('<![endif]', '')
        #console.log(require('util').inspect(data))
        data = data.replace(/\s*\[if\s+[^\]]+\]>\s*/, '')
        data = data.replace('<![endif]', '')
        output.enter()
        parser = new Parser()
        parser.parse data, (errors, window) =>
            this.children window.document.body, output
        output.leave()

class Output
    constructor: (@stream) ->
        @indents = ''

    enter: -> @indents += '  '
    leave: -> @indents = @indents.substring(2)

    write: (data, indent = true) ->
        data ?= ''
        data = @indents + data if indent
        @stream.write data

    writeln: (data, indent = true) ->
        data ?= ''
        data = @indents + data if indent
        @stream.write data + '\n'


exports.Parser = Parser
exports.Output = Output
exports.Converter = Converter
exports.Helper = Helper
exports.convert = (input, parser, converter, output) ->
    parser ?= new Parser()
    parser.parse input, (errors, window) ->
        if errors?.length
            errors
        else
            converter ?= new Converter()
            output ?= new Output(process.stdout)
            converter.document window.document, output
            null

        
