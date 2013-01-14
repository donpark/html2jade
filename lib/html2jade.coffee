scope = exports ? this.Html2Jade ?= {}

class Parser
  constructor: (options = {}) ->
    @jsdom = require('jsdom')

  parse: (arg, cb) ->
    if not arg
      cb('null file')
    else
      @jsdom.env arg, cb

class Writer
  constructor: (options = {}) ->
    @wrapLength = options.wrapLength ? 80
    @scalate = options.scalate ? false
    @attrSep =if @scalate then ' ' else ', '
    if options.double
      @attrQuote = '"'
      @nonAttrQuote = "'"
    else
      @attrQuote = "'"
      @nonAttrQuote = '"'
  tagHead: (node) ->
    result = if node.tagName isnt 'DIV' then node.tagName.toLowerCase() else ''
    if node.id
      result += "##{node.id}"
    if node.hasAttribute('class') and node.getAttribute('class').length > 0
      classes = node.getAttribute('class').split(/\s+/).filter (item) ->
        item? and item.trim().length > 0
      result += '.' + classes.join('.')
    result = 'div' if result.length is 0
    result

  tagAttr: (node, indents = '') ->
    attrs = node.attributes
    if not attrs or attrs.length is 0
      ''
    else
      result = []
      for attr in attrs
        if attr and nodeName = attr.nodeName
          if nodeName isnt 'id' and nodeName isnt 'class' and typeof attr.nodeValue?
            attrValue = attr.nodeValue
            attrValue = attrValue.replace(new RegExp(@attrQuote, 'g'), @nonAttrQuote)
            attrValue = attrValue.replace(/(\r|\n)\s*/g, "\\$1#{indents}")
            result.push attr.nodeName + "=" + @attrQuote + attrValue + @attrQuote
      if result.length > 0
        "(#{result.join(@attrSep)})"
      else
        ''

  tagText: (node) ->
    if node.firstChild?.nodeType isnt 3
      null
    else if node.firstChild isnt node.lastChild
      null
    else
      data = node.firstChild.data
      if data.length > @wrapLength or data.match(/\r|\n/)
        null
      else
        data

  forEachChild: (parent, cb) ->
    if parent
      child = parent.firstChild
      while child
        cb(child)
        child = child.nextSibling

  writeTextContent: (node, output, pipe = true, trim = true, wrap = true, escapeBackslash = false) ->
    output.enter()
    @forEachChild node, (child) =>
      @writeText child, output, pipe, trim, wrap, escapeBackslash
    output.leave()


  writeText: (node, output, pipe = true, trim = true, wrap = true, escapeBackslash = false) ->
    if node.nodeType is 3
      data = node.data or ''
      if data.length > 0
        lines = data.split(/\r|\n/)
        lines.forEach (line) =>
          @writeTextLine line, output, pipe, trim, wrap, escapeBackslash

  writeTextLine: (line, output, pipe = true, trim = true, wrap = true, escapeBackslash = false) ->
    prefix = if pipe then '| ' else ''
    if trim
      line = if line then line.trim() else ''
    if line and line.length > 0
      # escape backslash
      line = line.replace("\\", "\\\\") if escapeBackslash
      if not wrap or line.length <= @wrapLength
        output.writeln prefix + line
      else
        lines = @breakLine line
        if lines.length is 1
          output.writeln prefix + line
        else
          lines.forEach (line) =>
            @writeTextLine line, output, pipe, trim, wrap

  breakLine: (line) ->
    return [] if not line or line.length is 0
    return [ line ] if line.search /\s+/ is -1
    lines = []
    words = line.split(/\s+/)
    line = ''
    while words.length
      word = words.shift()
      if line.length + word.length > @wrapLength
        lines.push line
        line = word
      else if line.length
        line += ' ' + word
      else
        line = word
    if line.length
      lines.push line
    lines


publicIdDocTypeNames =
  "-//W3C//DTD XHTML 1.0 Transitional//EN": "transitional"
  "-//W3C//DTD XHTML 1.0 Strict//EN":     "strict"
  "-//W3C//DTD XHTML 1.0 Frameset//EN":   "frameset"
  "-//W3C//DTD XHTML 1.1//EN":        "1.1"
  "-//W3C//DTD XHTML Basic 1.1//EN":      "basic"
  "-//WAPFORUM//DTD XHTML Mobile 1.2//EN":  "mobile"

systemIdDocTypeNames =
  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd":      "transitional"
  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd":        "strict"
  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd":        "frameset"
  "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd":           "1.1"
  "http://www.w3.org/TR/xhtml-basic/xhtml-basic11.dtd":       "basic"
  "http://www.openmobilealliance.org/tech/DTD/xhtml-mobile12.dtd":  "mobile"

class Converter
  constructor: (options = {}) ->
    @scalate = options.scalate ? false
    @writer = options.writer ? new Writer(options)

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

    if document.documentElement
      @children document, output, false
    else
      # documentElement is missing.
      # not sure why but this happens with jsdom when document has no body
      # HACK: generate manually
      htmlEls = document.getElementsByTagName 'html'
      @element htmlEls[0], output if htmlEls.length > 0

  element: (node, output) ->
    return if not node?.tagName
    # console.log "tag: #{node.tagName}"
    tagName = node.tagName.toLowerCase()
    tagHead = @writer.tagHead node
    tagAttr = @writer.tagAttr node, output.indents
    tagText = @writer.tagText node
    if tagName is 'script' or tagName is 'style'
      if node.hasAttribute('src')
        output.writeln tagHead + tagAttr
        @writer.writeTextContent node, output, false, false, false
      else if tagName is 'script'
        @script node, output, tagHead, tagAttr
      else if tagName is 'style'
        @style node, output, tagHead, tagAttr
    else if tagName is 'conditional'
      output.writeln '//' + node.getAttribute('condition')
      @children node, output
    else if ['pre'].indexOf(tagName) isnt -1
      # HACK: workaround jade's wonky PRE handling
      output.writeln tagHead + tagAttr + '.'
      output.enter()
      firstline = true
      @writer.forEachChild node, (child) =>
        if child.nodeType is 3
          data = child.data
          if data? and data.length > 0
            if firstline
              # suckup starting linefeed if any
              if data.search(/\r\n|\r|\n/) is 0
                data = data.replace(/\r\n|\r|\n/, '')
              data = '\\n' + data
              firstline = false
            data = data.replace /\t/g, '\\t'
            data = data.replace /\r\n|\r|\n/g, '\n' + output.indents
            output.write data
      output.writeln()
      output.leave()
    else if tagText
      if tagText.length > 0 and tagText.charAt(0) is '='
        tagText = '\\' + tagText
      output.writeln tagHead + tagAttr + ' ' + tagText
    else
      output.writeln tagHead + tagAttr
      @children node, output

  children: (parent, output, indent = true) ->
    output.enter() if indent
    @writer.forEachChild parent, (child) =>
      nodeType = child.nodeType
      if nodeType is 1 # element
        @element child, output
      else if nodeType is 3 # text
        if parent._nodeName is 'code'
          @text child, output, false, true, true
        else
          @text child, output
      else if nodeType is 8 # comment
        @comment child, output
    output.leave() if indent

  text: (node, output, pipe, trim, wrap) ->
    # console.log "text: #{node.data}"
    node.normalize()
    @writer.writeText node, output, pipe, trim, wrap

  comment: (node, output) ->
    condition = node.data.match /\s*\[(if\s+[^\]]+)\]/
    if not condition
      data = node.data or ''
      if data.length is 0 or data.search(/\r|\n/) is -1
        output.writeln "// #{data.trim()}"
      else
        output.writeln '//'
        output.enter()
        lines = data.split(/\r|\n/)
        lines.forEach (line) =>
          @writer.writeTextLine line, output, false, false, false
        output.leave()
    else
      @conditional node, condition[1], output

  conditional: (node, condition, output) ->
    # HACK: previous versions formally parsed content of conditional comments
    # which didn't work client-side and was also implicitly dependent on
    # parser operation being synchronous.
    #
    # Replacement hack converts conditional comments into element type 'conditional'
    # and relies on HTML DOM's innerHTML to parse textual content into DOM.
    innerHTML = node.textContent.trim().replace(/\s*\[if\s+[^\]]+\]>\s*/, '').replace('<![endif]', '')
    # special-case handling of common conditional HTML element rick
    if innerHTML.indexOf("<!") is 0
      condition = " [#{condition}] <!"
      innerHTML = null
    conditionalElem = node.ownerDocument.createElement('conditional')
    conditionalElem.setAttribute('condition', condition)
    conditionalElem.innerHTML = innerHTML if innerHTML
    node.parentNode.insertBefore conditionalElem, node.nextSibling

  script: (node, output, tagHead, tagAttr) ->
    if @scalate
      output.writeln ':javascript'
      @writer.writeTextContent node, output, false, false, false
    else
      output.writeln "#{tagHead}#{tagAttr}"
      @writer.writeTextContent node, output, false, true, false, true

  style: (node, output, tagHead, tagAttr) ->
    if @scalate
      output.writeln ':css'
      @writer.writeTextContent node, output, false, false, false
    else
      output.writeln "#{tagHead}#{tagAttr}"
      @writer.writeTextContent node, output, false, true, false

class Output
  constructor: ->
    @indents = ''
  enter: ->
    @indents += '  '
  leave: ->
    @indents = @indents.substring(2)
  write: (data, indent=true) ->
  writeln: (data, indent=true) ->

class StringOutput extends Output
  constructor: ->
    super
    @fragments = []
  write: (data, indent=true) ->
    data ?= ''
    if indent
      @fragments.push @indents + data
    else
      @fragments.push data
  writeln: (data, indent=true) ->
    data ?= ''
    if indent
      @fragments.push @indents + data + '\n'
    else
      @fragments.push data + '\n'
  final: ->
    result = @fragments.join ''
    @fragments = []
    result

class StreamOutput extends Output
  constructor: (@stream) ->
    super
  write: (data, indent=true) ->
    data ?= ''
    if indent
      @stream.write @indents + data
    else
      @stream.write data
  writeln: (data, indent=true) ->
    data ?= ''
    if indent
      @stream.write @indents + data + '\n'
    else
      @stream.write data + '\n'

scope.Output = Output
scope.StringOutput = StringOutput
scope.Converter = Converter
scope.Writer = Writer

# node.js classes
if exports?
  scope.Parser = Parser
  scope.StreamOutput = StreamOutput
  scope.convert = (input, output, options) ->
    options ?= {}
    # specify parser and converter to override default instance
    options.parser ?= new Parser(options)
    options.parser.parse input, (errors, window) ->
      if errors?.length
        errors
      else
        output ?= new StreamOutput(process.stdout)
        options.converter ?= new Converter(options)
        options.converter.document window.document, output

scope.convertHtml = (html, options, cb) ->
  options ?= {}
  # specify parser and converter to override default instance
  options.parser ?= new Parser(options)
  options.parser.parse html, (errors, window) ->
    if errors?.length
      errors
    else
      output = options.output ? new StringOutput()
      options.converter ?= new Converter(options)
      options.converter.document window.document, output
      cb(null, output.final()) if cb?

scope.convertDocument = (document, options, cb) ->
  options ?= {}
  output = options.output ? new StringOutput()
  options.converter ?= new Converter(options)
  options.converter.document document, output
  cb(null, output.final()) if cb?

# DEBUGGING
# inspect = require('util').inspect
# console.log "text parent node: #{inspect(parent)}"
