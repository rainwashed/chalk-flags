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

const _validColors = {
    "r": "red",
    "g": "green",
    "y": "yellow",
    "b": "blue",
    "m": "magenta",
    "c": "cyan",
    "w": "white",
    "bk": "black",
    "gr": "gray"
};
const _validModifiers = {
    "ii": "italic",
    "bb": "bold",
    "dd": "dim",
    "un": "underline",
    "in": "inverse",
    "st": "strikethrough",
    "bt": "bright", // <----- Only these two need to 
    "bg": "background" // <-- be handled differently due to their nature
};
// bt is for the Bright which can be both for colors and modifiers

/*
example of the syntax:
r_bt+ii+rBg/Hello World/end
bright red text color + italic text + red background 
*/

// https://regex101.com/r/5ru6yN/1 - Regex with 4 test case scenarios 

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

    // Custom console log just to handle if verbose logging is on
    _consoleLog(string, ...args) {
        if (this.verboseLogging) console.log(string, ...args);
    }

    _testSimpleFlag(flag) {
        if (_validColors[flag] !== undefined) return [ "color", _validColors[flag] ];
        if (_validModifiers[flag] !== undefined) return [ "modifier", _validModifiers[flag] ];
        return false;
    }

    _lexer(phrase) {       
        const sectionsOfText = phrase.toString().split(this.syntaxRules.flagSplit);
        if (_internalFunctions.lastElem(sectionsOfText) !== this.syntaxRules.flagEnd) return; // If the end block does not match the syntaxRules.flagEnd, this is not a valid ChalkFlag string and so do nothing.
        const textFlags = sectionsOfText[0].split("+"); // The flag rules of the text
        const textBlockLength = sectionsOfText.length - 2; // The last element of the array (should) always be the end block and the first element of the array (should) always be the flag block
        const trueText = (textBlockLength < 2) ? sectionsOfText[1] : sectionsOfText.slice(1, textBlockLength); // Handle cases in which the text have slashes inside of them (still need to test)

        this._consoleLog("Possible Flags:", textFlags);
        this._consoleLog("Text Block Length:", textBlockLength);
        this._consoleLog("True Text:", trueText);
        this._consoleLog("___FINISH LEXER INITIAL___")

        // Create meaning from each flag
        /*
            finalData structure as followed:
            [trueColor]: {
                bright: [true/false],
                background: [true/false],
                type: [color/modifier]
            },
            "text": trueText
        */
        const finalData = {}

        for (const flag of textFlags) {
            if (flag.includes("_") || flag.includes("Bg")) continue; // handle sep.
            const flagTest = this._testSimpleFlag(flag);
            if (!flagTest) continue;

            finalData[flagTest[1]] = {
                bright: false,
                background: false,
                type: flagTest[0],
            };
        }

        finalData["text"] = (Array.isArray(trueText)) ? trueText.join(this.syntaxRules.flagSplit) : trueText.toString();

        console.log(finalData);
    }

    parse(string) {
        this._lexer(string);
    }
}

const test = new ChalkFlag(true);

test.parse("r_bt+ii+rBg+ax/Hello World/end");
// test.parse("This line has nothing to do with ChalkFlags");
// test.parse("red+green+blue/is awesome/end");
// test.parse("red+green+blue/is not awesome/end")