import chalk from "chalk"

// TODO: Remove this later, this is just for notes
const _chalkGlueLayer = {
    backgroundColors: {
        "r": chalk.bgRed,
        "g": chalk.bgGreen,
        "y": chalk.bgYellow,
        "b": chalk.bgBlue,
        "m": chalk.bgMagenta,
        "c": chalk.bgCyan,
        "w": chalk.bgWhite,
        "bk": chalk.bgBlack,
        "gr": chalk.bgGray,
    },
    textColors: {
        "r": chalk.red,
        "g": chalk.green,
        "y": chalk.yellow,
        "b": chalk.blue,
        "m": chalk.magenta,
        "c": chalk.cyan,
        "w": chalk.white,
        "bk": chalk.black,
        "gr": chalk.gray,
    },
    validModifiers: {
        "ii": chalk.italic,
        "bb": chalk.bold,
        "dd": chalk.dim,
        "un": chalk.underline,
        "in": chalk.inverse,
        "st": chalk.strikethrough,
    }
};

const _validColors = ["r", "g", "y", "b", "m", "c", "w", "bk", "gr"];
const _validModifiers = ["ii", "bb", "dd", "un", "in", "st", "bt"];
// bt is for the Bright which can be both for colors and modifiers

/*
example of the syntax:
r_bt+ii+rBg/Hello World/end
bright red text color + italic text + red background 
*/

const _internalFunctions = {
    lastElem: (array) => {
        return array.slice(-1)[0];
    }
};

class ChalkFlag {
    // TODO: Modify customSplitRule to account for the new syntax rule (flags/Main Text Content Here/end)
    constructor(verboseLogging=false, customSplitRule=" ", syntaxRules={ flagSplit: "/", flagEnd: "end" }) {
        this.verboseLogging = verboseLogging;
        this.customSplitRule = customSplitRule;
        this.syntaxRules = syntaxRules;

        // Lexer tracking system to track every flag and word that occurs within the string
        this._lexerTrackingSystem = {};
    }

    // [rgb, Hello, World, end]

    _lexer(phrase) {       
        const sectionsOfText = phrase.toString().split(this.syntaxRules.flagSplit);
        if (_internalFunctions.lastElem(sectionsOfText) !== this.syntaxRules.flagEnd) return; // If the end block does not match the syntaxRules.flagEnd, this is not a valid ChalkFlag string and so do nothing.
        
        const flags = sectionsOfText[0].split("+"); // The flag rules of the text
        const targetTextLength = sectionsOfText.length - 2; // The last element of the array (should) always be the end block and the first element of the array (should) always be the flag block
    }

    parse(string) {
        this._lexer(string);
    }
}

const test = new ChalkFlag();

test.parse("r_bt+ii+rBg/Hello World/end");
test.parse("This line has nothing to do with ChalkFlags");
test.parse("red+green+blue/is awesome/end");
test.parse("red+green+blue/is not awesome/end")