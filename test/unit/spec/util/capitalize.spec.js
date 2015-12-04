'use strict';

describe('Capitalize Filter', function() {
    var filter;
    beforeEach(function () {

        module('common.util.capitalize.filter');

        inject(function(_capitalizeFilter_) {
            filter = _capitalizeFilter_;
        });
    });

    it('should be defined', function () {
        expect(filter).to.exist;
    });

    it('should capitalize "ryan" to "Ryan"', function () {
        expect(filter('ryan')).to.equal('Ryan');
    });

    it('should capitalize "ryan mathis" to "Ryan mathis"', function () {
        expect(filter('ryan mathis')).to.equal('Ryan mathis');
    });

});
