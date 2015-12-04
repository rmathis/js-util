// fileSize.js
angular
.module(
    'lib.util.filters.file-size',
    []
)
.filter(
    'fileSize',
    function() {
        'use strict';

        // these methods adapted to angular from OLE's util.js
        var numFormat = function(number, decimals, decimalPoint, thousandsSeparator) {
            number = number.toString().replace(',', '').replace(' ', '');

            var n = !isFinite(+number) ? 0 : +number,
                prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
                sep = thousandsSeparator ? ',' : thousandsSeparator,
                dec = decimalPoint ? '.' : decimalPoint,
                s = '',
                toFixedFix = function(n, prec) {
                    var k = Math.pow(10, prec);
                    return (Math.round(n * k) / k).toString();
                };

            // Fix for IE parseFloat(0.55).toFixed(0) = 0;
            s = (prec ? toFixedFix(n, prec) : Math.round(n).toString()).split('.');
            if (s[0].length > 3) {
                s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
            }

            if ((s[1] || '').length < prec) {
                s[1] = s[1] || '';
                while (s[1].length < prec) {
                    s[1] += '0';
                }
            }

            return s.join(dec);
        };

        return function(input) {
            var filesize;

            if (!input) {
                return 'N/A';
            }

            if (input >= 1073741824) {
                filesize = numFormat(input / 1073741824, 2, '.', '') + ' GB';
            } else {
                if (input >= 1048576) {
                    filesize = numFormat(input / 1048576, 2, '.', '') + ' MB';
                } else {
                    if (input >= 1024) {
                        filesize = numFormat(input / 1024, 0) + ' KB';
                    } else {
                        filesize = numFormat(input, 0) + ' bytes';
                    }
                }
            }

            return filesize;
        };
    }
);
