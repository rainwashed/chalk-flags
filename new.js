import chalk from 'chalk';

// TODO: More than one word covering of flags

class ChalkFlag {
    constructor(settings={
        extendStringPrototype: false,
        customSplitRule: ' ',
        logging: false,
    }) {
        const { extendStringPrototype, customSplitRule, logging } = settings;
        if (extendStringPrototype) String.prototype.chalkParse = this.internalParse;
        this.csr = customSplitRule; // Custom split rule (the rules for detection)
        this.vl = logging; // Verbose logging
        this.itf = {
            'bd/' : chalk.bold,
            'd/': chalk.dim,
            'i/' : chalk.italic,
            'u/' : chalk.underline,
            'iv/' : chalk.inverse,
            'st/' : chalk.strikethrough,
            'bk/' : chalk.black,
            'r/' : chalk.red,
            'g/' : chalk.green,
            'b/' : chalk.blue,
            'm/' : chalk.magenta,
            'c/' : chalk.cyan,
            'w/' : chalk.white,
            'gy/' : chalk.grey,
            'bgbk/' : chalk.bgBlack,
            'bgr/' : chalk.bgRed,
            'bgg/' : chalk.bgGreen,
            'bgb/' : chalk.bgBlue,
            'bgm/' : chalk.bgMagenta,
            'bgc/' : chalk.bgCyan,
            'bgw/' : chalk.bgWhite,
            'bggy/' : chalk.bgGrey,
        }; // Identifier to function
        this._lx = []; // Internal lexer tracking system

        // Only for debugging
        // if ((extendStringPrototype || customSplitRule != /a/ || logging) && logging) console.warn('Custom settings in place.');
    }

    // -------------- INTERNAL -------------- //

    // Test if flag exists within the Identifier to Function
    _test(f) {
        return typeof(this.itf[f]) == 'function';
    }

    // Lexer System
    _lexer(s) {
        const splitString = s.toString().split(this.csr);
        const splitOp = [ 2, 3, 4 ]; // Max size of all flag opportunities

        /* const returnFlagCount = (s2) => {
            // TODO: Develop a testing algorithm to detect the amount of flags there are in a system
            // Also implement a system in which words can be commented out
            const t1 = s2.toString().split(/a/)
        }; // Check the amount of flags in a given word. This can be used by the lexer to further process the word. */

        if (this.vl) console.log(splitString);

        for (let word of splitString) {
            const possibleOp = [];
            let x, y;

            splitOp.forEach((maxSize) => possibleOp.push(word.toString().substring(0, maxSize)));
            possibleOp.forEach((e, i) => {
                if (this._test(e)) return eval('x = i; y = e;');
            });

            if (this.vl) console.log(possibleOp, word, x);

            // No flags exist
            if (x == undefined) return this._lx.push({
                type: undefined,
                content: word.toString(),
            });

            this._lx.push({
                type: this.itf[y],
                content: word.toString().substring(possibleOp[x], word.toString().length),
            });
        }
    }

    // Main Function
    _main(s) {
        this._lexer(s);
    }

    // --------------- EXTERNAL --------------- //

    internalParse() {
        console.log(this);
    }

    parse(string) {
        this._main(string);
    }
}

// Testing grounds below

const cf = new ChalkFlag({
    extendStringPrototype: true,
    customSplitRule: ' ',
    logging: true,
});

cf.parse('i/Hello World')

console.log(cf._lx);