var fs = require('fs');

var defaultFilename = 'jshint-output.log';

var wrStream;
var filename;

module.exports = function (results, data, opts) {
  opts = opts || {};
  opts.filename = opts.filename || defaultFilename;

  if (wrStream && filename !== opts.filename) {
    wrStream.end();
    wrStream = null;
  }

  if (!wrStream) {
    wrStream = fs.createWriteStream(opts.filename);
    filename = opts.filename;
  }

  var out = [];
  var file = {};

  results.forEach(function (result, i) {
    var err = result.error;

    if (i === 0) {
      // start off the output with the filename
      out.push(results.length + ' lint errors found in ' + result.file);
    }

    out.push('  [' + err.line + ',' + err.character + '](' + err.code + ') ' + err.reason);
  });

  wrStream.write(out.join('\n'));
};