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

    // Reset lexer tracking system
    _resetLx() {
        this._lx = {};
        return (this._lx == {});
    }

    // Test if flag exists within the Identifier to Function
    _test(f) {
        return typeof(this.itf[f]) == 'function';
    }

    // Lexer System
    _lexer(s) {
        const splitString = s.toString().split(this.csr);
        const splitOp = [ 2, 3, 4 ]; // Max size of all flag opportunities

        if (this.vl) console.log('splitString:', splitString);

        const p = this; // For the functions to access a higher level scope

        function returnFlagCount(w) {
            const wSplit = w.toString().split('/');
            const c = wSplit.length - 1; // Count of slashes
            let f = 0; // Final count (some slashes may not be to actual flags)

            if (p.vl) console.log(w, wSplit, c);
            for (const possibleF of wSplit) {
                if (p.vl) console.log('possibleF:', possibleF);     
                if (p._test(`${possibleF.toString().toLowerCase()}/`)) f++;           
            }

            if (p.vl) console.log('final count:', f);
            return f;
        }

        for (let word of splitString) {
            const possibleOp = [];
            let x, y; // X: Index of correct possible opportunity / Y: Correct possible opportunity word/flag
            let fc = returnFlagCount(word) // Flag Count

            splitOp.forEach((maxSize) => possibleOp.push(word.toString().substring(0, maxSize)));
            possibleOp.forEach((e, i) => {
                if (this._test(e)) {
                    x = i;
                    y = e;
                }
            });

            if (this.vl) console.log('possibleOp / word / x:', possibleOp, word, x);

            // No flags exist
            if (x == undefined) return this._lx.push({
                type: undefined,
                content: word.toString(),
            });

            this._lx.push({
                type: this.itf[y],
                content: word.toString().substring(possibleOp[x].toString().length, word.toString().length),
            });
        }
    }

    // Main Function
    _main(s) {
        this._lexer(s);
        const cs = [];

        // TODO: One flag system needs to change to an adapting one
        for (const y of this._lx) {
            if (this.vl) console.log(y, typeof(y), typeof(y['type']));

            if (typeof(y['type']) == 'function') {
                cs.push(y['type'](y['content']));
            } else {
                cs.push(y['content']);   
            }
        }

        if (this._resetLx() && this.vl) console.log('cleared lexer tracking system');

        return cs.join(' '); // TODO: Might need to fix this to account for new lines, etc.
    }

    // --------------- EXTERNAL --------------- //

    // TODO: Extending prototype actually work LOL
    // internalParse() {
    //     console.log(this);
    //     return this._main(this);
    // }

    parse(string) {
        return this._main(string);
    }
}

// Testing grounds below

const cf = new ChalkFlag({
    extendStringPrototype: true,
    customSplitRule: ' ',
    logging: true,
});

cf.parse('i/Hello g/bd/World');