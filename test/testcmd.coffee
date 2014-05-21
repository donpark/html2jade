assert = require('assert')
fs = require('fs')
path = require('path')
child_process = require('child_process')

async = require('async')

exec = child_process.exec
existsSync = fs.existsSync or path.existsSync

html2jade = (inputFile, outputDir, cb) ->
  cmd = "node ../cli.js #{inputFile} -o #{outputDir}"
  options =
    cwd: __dirname
  # console.log cmd
  child = exec cmd, options, (err, stdout, stderr) ->
    # console.log "stderr: #{stderr}"
    # console.log "stdout: #{stdout}"
    # console.error err if err
    cb(err) if cb

testFile = (inputFile, expectedFile, outputDir, fileDone) ->
  basename = path.basename(inputFile, path.extname(inputFile))
  outputFile = path.join(outputDir, "#{basename}.jade")
  html2jade inputFile, outputDir, (err) ->
    if not err
      actual = fs.readFileSync(outputFile, 'utf8')
      expected = fs.readFileSync(expectedFile, 'utf8')
      assert.equal(actual, expected)
    fileDone(err)


describe "html2jade", ->

  testDir = (inputDir, expectedDir, outputDir) ->
    inputDir = path.resolve(__dirname, inputDir)
    expectedDir = path.resolve(__dirname, expectedDir)
    outputDir = path.resolve(__dirname, outputDir)

    fs.mkdirSync(outputDir) if !existsSync(outputDir)

    inputFiles = fs.readdirSync(inputDir)
    inputFiles.forEach (inputFile) ->
      extname = path.extname(inputFile)
      basename = path.basename(inputFile, extname)
      extname = extname.toLowerCase()
      if extname is '.html' or extname is '.htm'
        inputFile = path.join(inputDir, inputFile)
        expectedFile = path.join(expectedDir, "#{basename}.jade")
        # console.log "processing #{inputFile}"
        it "should convert #{path.basename(inputFile)} to output matching #{path.basename(expectedFile)}", (done) ->
          testFile inputFile, expectedFile, outputDir, done

  testDir "./data/", "./data/", "../temp/"
