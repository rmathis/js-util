var jshint = require('gulp-jshint');
var reporter = require('../');
var gutil = require('gulp-util');
var join = require('path').join;
var fs = require('fs');
var should = require('should');

var outfilename = join(__dirname, '../jshint-output.log');

describe('file reporter', function () {

  afterEach(function (done) {
    fs.unlink(outfilename, done);
  });

  it('should write a line for every error and every filename that failed', function (done) {
    var fileRoot = '/home/username/code/project';
    var getErrCountRE = /(\d+) lint errors/;

    var head = jshint();
    var tail = head.pipe(jshint.reporter(reporter, { filename: outfilename }));

    tail.once('end', function () {
      fs.readFile(outfilename, 'utf8', function (err, out) {
        should.not.exist(err);

        out.should.match(getErrCountRE);
        var count = out.match(getErrCountRE)[1];
        out.match(/^  \[\d+/gm).length.should.eql(count);
        done();
      });
    });

    head.write(new gutil.File({
      cwd: fileRoot,
      base: fileRoot,
      path: fileRoot + '/file.js',
      contents: new Buffer('not valid json', 'utf8')
    }));

    head.end();
  });
});