"use strict";
exports.__esModule = true;
var chalk_1 = require("chalk");
var c = chalk_1["default"];
var validColors = new Map([
    ["bl", "black"],
    ["r", "red"],
    ["g", "green"],
    ["y", "yellow"],
    ["b", "blue"],
    ["m", "magenta"],
    ["c", "cyan"],
    ["w", "white"],
    ["gr", "grey"],
]);
var validModifiers = new Map([
    ["bb", "bold"],
    ["dd", "dim"],
    ["ii", "italic"],
    ["uu", "underline"],
    ["oo", "overline"],
    ["iv", "inverse"],
    ["hh", "hidden"],
    ["ss", "strikethrough"],
    ["vv", "visible"],
]);
var validBackgrounds = new Map([
    ["bgBl", "bgBlack"],
    ["bgR", "bgRed"],
    ["bgG", "bgGreen"],
    ["bgY", "bgYellow"],
    ["bgB", "bgBlue"],
    ["bgM", "bgMagenta"],
    ["bgC", "bgCyan"],
    ["bgW", "bgWhite"],
    ["bgGR", "bgGrey"],
]);
function init(settings) {
    c = new chalk_1.Chalk(settings);
}
var ChalkFlag = /** @class */ (function () {
    function ChalkFlag(verboseLogging) {
        if (verboseLogging === void 0) { verboseLogging = false; }
        /**
         * @readonly
         */
        this._splitter = "/";
        /**
         * @readonly
         */
        this._splitterEnd = "end";
        this.verboseLogging = verboseLogging;
        this._lexer = [];
    }
    ChalkFlag.prototype.reset = function () {
        this._lexer = [];
    };
    ChalkFlag.prototype.log = function (s) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (this.verboseLogging) {
            console.log(s, args);
        }
    };
    ChalkFlag.prototype.return_config = function () {
        return new Map([
            ["verboseLoggingEnabled?", this.verboseLogging],
            ["chalkFlagSplitter", this._splitter],
        ]);
    };
    return ChalkFlag;
}());
/* export { init };
export default ChalkFlag;
 */
var cf = new ChalkFlag(true);
console.log(cf.return_config());
