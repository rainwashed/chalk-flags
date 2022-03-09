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

const stringCapitalize = (s) => s[0].toUpperCase() + s.slice(1);

class ChalkFlag {
    // TODO: Modify customSplitRule to account for the new syntax rule (flags/Main Text Content Here/end)
    constructor(verboseLogging=false, customSplitRule=" ", syntaxRules={ flagSplit: "/", flagEnd: "end" }) {
        this.verboseLogging = verboseLogging;
        this.customSplitRule = customSplitRule;
        this.syntaxRules = syntaxRules;

        // Lexer tracking system to track every flag and word that occurs within the string
        this._lexerTrackingSystem = [];
    }

    // Reset lexer system
    _resetLexer() {
        this._lexerTrackingSystem = [];
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
        // if (_internalFunctions.lastElem(sectionsOfText) !== this.syntaxRules.flagEnd) return; // It does not matter if the last element of the array is the syntaxRules.flagEnd since it is already used in the parse() function as the string splitter
        const textFlags = sectionsOfText[0].split("+"); // The flag rules of the text
        const textBlockLength = sectionsOfText.length;
        const trueText = (textBlockLength < 2) ? sectionsOfText[1] : sectionsOfText.slice(1, textBlockLength); // Handle cases in which the text have slashes inside of them (still need to test)

        const finalData = [];

        for (let flag of textFlags) {
            flag = flag.trim();

            let bright = false;
            let background = false;

            if (flag.endsWith("_bt")) {
                bright = true;
                flag = flag.toString().slice(0, -3);
            } else if (flag.endsWith("Bg")) {
                background = true;
                flag = flag.toString().slice(0, -2);
            }

            const flagTest = this._testSimpleFlag(flag);  
            
            if (!flagTest) continue;

            finalData.push({
                modifier: flagTest[1],
                bright,
                background,
                type: flagTest[0],
            });
        }

        finalData.push((Array.isArray(trueText)) ? trueText.join(this.syntaxRules.flagSplit) : trueText.toString()); // last element of the finalData array will always be the text string

        this._lexerTrackingSystem.push(finalData);
   }

    parse(string) {
        const phrases = string.split(`${this.syntaxRules.flagSplit}${this.syntaxRules.flagEnd}`);
        phrases.pop();
        
        for (const phrase of phrases) {
            this._lexer(phrase);
        }

        for (const lexer of this._lexerTrackingSystem) {
            let text = lexer.pop();
            lexer.forEach((style) => {
                let chalkStyle = style["modifier"];
                if (style.bright) chalkStyle = chalkStyle + "Bright";
                if (style.background) chalkStyle = "bg" + stringCapitalize(chalkStyle);

                text = chalk[chalkStyle](text);
            });

            console.log(text);
        }
        
        // console.log(this._lexerTrackingSystem);
        this._resetLexer();
        
    }
}

const test = new ChalkFlag(true);

// test.parse("r_bt+ii+rBg+ax+gr/Hello World/end b_bt+bb+rBg+ax/Goodbye / World/end");
test.parse("r_bt+bb/Hello World/end")
// test.parse("This line has nothing to do with ChalkFlags");
// test.parse("red+green+blue/is awesome/end");
// test.parse("red+green+blue/is not awesome/end")