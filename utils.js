var StrLoc = function(str) {
    return str;
};

String.prototype.format = function() {
    var formatted = this;
    for (var i = 0; i < arguments.length; i++) {
        var key = '{' + i.toString() + '}';
        if(formatted.indexOf(key) < 0) {
            throw new Error(StrLoc("Index {0} was not defined in string: {1}").format(i, formatted));
        }

        formatted = formatted.replace(key, arguments[i]);
    }

    return formatted;
};

Number.prototype.clamp = function(min, max) {
    return Math.min(Math.max(this, min), max);
};

$.fn.textWidth = function(text, font) {
    if (!$.fn.textWidth.fakeEl) $.fn.textWidth.fakeEl = $('<span>').appendTo(document.body);
    var htmlText = text || this.val() || this.text();
    htmlText = $.fn.textWidth.fakeEl.text(htmlText).html(); //encode to Html
    htmlText = htmlText.replace(/\s/g, "&nbsp;"); //replace trailing and leading spaces
    $.fn.textWidth.fakeEl.html(htmlText).css('font', font || this.css('font'));
    return $.fn.textWidth.fakeEl.width();
};

Game.utils = (function(){

    var instance = {};

    instance.decimalSeparator = function() {
        var n = 1.1;
        n = n.toLocaleString().substring(1, 2);
        return n;
    }();

    instance.formatEveryThirdPower = function(notations)
    {
        return function (value)
        {
            // ensure we have a number
            var value = value * 1;

            var base = 0;
            var notationValue = '';
            if (value >= 1000000)
            {
                value /= 1000;
                while(Math.round(value) >= 1000) {
                    value /= 1000;
                    base++;
                }

                if (base > notations.length) {
                    return StrLoc('Infinity');
                } else {
                    notationValue = notations[base];
                }
            }

            var valueString = (Math.round(value * 1000) / 1000.0).toLocaleString();

            if(notationValue !== '') {
                var numberCount = valueString.replace(/[^0-9]/g, "").length;
                var separator = valueString.indexOf(Game.utils.decimalSeparator) > 0 ? '' : Game.utils.decimalSeparator;
                switch (numberCount) {
                    case 1: valueString = valueString + separator + '000'; break;
                    case 2: valueString = valueString + separator + '00'; break;
                    case 3: valueString = valueString + separator + '0'; break;
                }

                if (numberCount > 4) {
                    valueString = valueString.slice(0, 4 - numberCount)
                }
            }

            return valueString + notationValue;
        };
    };

    instance.formatScientificNotation = function(value)
    {
        if (value === 0 || (Math.abs(value) > 1 && Math.abs(value) < 100))
        {
            return Game.utils.formatRaw(value);
        }

        var sign = value > 0 ? '' : '-';
        value = Math.abs(value);
        var exp = ~~(Math.log(value)/Math.LN10);
        var num = Math.round((value/Math.pow(10, exp)) * 100) / 100;
        var output = num.toString();
        if (num === Math.round(num)) {
            output += '.00';
        } else if (num * 10 === Math.round(num * 10)) {
            output += '0';
        }

        return sign + output + '*10^' + exp;
    };

    instance.formatRounded = function(value)
    {
        return (Math.round(value * 1000) / 1000).toString();
    };

    instance.formatRaw = function(value) {
        if(value === undefined || value === null) {
            return "";
        }

        return value.toString();
    };

    instance.formatters = {
        'raw': instance.formatRaw,
        'rounded': instance.formatRaw,
        'name': instance.formatEveryThirdPower(['', StrLoc(' million'), StrLoc(' billion'), StrLoc(' trillion'), StrLoc(' quadrillion'),
            StrLoc(' quintillion'), StrLoc(' sextillion'), StrLoc(' septillion'), StrLoc(' octillion'),
            StrLoc(' nonillion'), StrLoc(' decillion')
        ]),
        'shortName': instance.formatEveryThirdPower(['', StrLoc('M'), StrLoc('B'), StrLoc('T'), StrLoc('Qa'), StrLoc('Qi'), StrLoc('Sx'),StrLoc('Sp'), StrLoc('Oc'), StrLoc('No'), StrLoc('De') ]),
        'shortName2': instance.formatEveryThirdPower(['', StrLoc('M'), StrLoc('G'), StrLoc('T'), StrLoc('P'), StrLoc('E'), StrLoc('Z'), StrLoc('Y')]),
        'scientific': instance.formatScientificNotation
    };

    instance.pad = function(n, width, z) {
        z = z || '0';
        n = n + '';
        return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
    };

    // Note: This has to use math.floor otherwise the value will be skewed for large time
    instance.splitDateTime = function(seconds) {
        // returns array of [y, d, h, m, s, z]
        var result = [0, 0, 0, 0, 0, 0];
        var milliSeconds = Math.floor(seconds * 1000);

        result[0] = Math.floor(milliSeconds / (365 * 24 * 60 * 60 * 1000));

        milliSeconds %= (365 * 24 * 60 * 60 * 1000);
        result[1] = Math.floor(milliSeconds / (24 * 60 * 60 * 1000));

        milliSeconds %= (24 * 60 * 60 * 1000);
        result[2] = Math.floor(milliSeconds / (60 * 60 * 1000));

        milliSeconds %= (60 * 60 * 1000);
        result[3] = Math.floor(milliSeconds / (60 * 1000));

        milliSeconds %= (60 * 1000);
        result[4] = Math.floor(milliSeconds / 1000);
        result[5] = milliSeconds;

        return result;
    };

    instance.getFullTimeDisplay = function(seconds, use24hourTime) {
        var timeSplit = this.splitDateTime(seconds);
        var hourMinutePart = this.getTimeDisplay(seconds, use24hourTime);

        if(timeSplit[1] > 0) {
            return timeSplit[1] + ' Days ' + hourMinutePart;
        }

        return hourMinutePart;
    };

    instance.getTimeDisplay = function(seconds, use24hourTime) {
        if (seconds === 0 || seconds === Number.POSITIVE_INFINITY) {
            return '~~';
        }

        var timeSplit = this.splitDateTime(seconds);
        var suffix = '';
        if (use24hourTime === false) {
            if (timeSplit[2] > 12) {
                timeSplit[2] -= 12;
                suffix = ' ' + StrLoc('pm');
            } else {
                suffix = ' ' + StrLoc('am');
            }
        }

        var hourResult = this.pad(timeSplit[2], 2) + ':';
        var minuteResult = this.pad(timeSplit[3], 2) + ':';
        var secondResult = this.pad(timeSplit[4], 2);
        return hourResult + minuteResult + secondResult + suffix;
    };

    return instance;
}());