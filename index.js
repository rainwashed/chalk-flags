import chalk from 'chalk';

/**
 * @author RainWashed <rainwashed@yandex.com>
 * @version 1.0.1
 */

class ChalkFlag {
    /**
     * Creates a new ChalkFlag API Instance
     * @param { boolean } extendStringPrototype - Extend String.prototype to be used with the ChalkFlag function (default: false)
     * @param { boolean } logging - Enable verbose logging (default: false)
     * @param { string } customSplitRule - Custom rule for splitting text (default: ' ' - one width space)
     */
    constructor(extendStringPrototype = false, logging = false, customSplitRule = ' ') {
        if (extendStringPrototype) String.prototype.chalkParse = this.internalParse;
        this.vl = logging; // Verbose logging
        this.csr = customSplitRule; // Custom split rule (the rules for detection)
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
        // const splitOp = [ 2, 3, 4 ]; // Max size of all flag opportunities

        if (this.vl) console.log('splitString:', splitString);

        const p = this; // For the functions to access a higher level scope

        function returnPossibleFlags(w) {
            const wSplit = w.toString().split('/');
            const c = wSplit.length - 1; // Count of slashes
            const confirmedFlags = []; // Final count (some slashes may not be to actual flags)
            let flagCount = 0;

            if (p.vl) console.log(w, wSplit, c);
            for (const possibleF of wSplit) {
                if (p.vl) console.log('possibleF:', possibleF);     
                if (p._test(`${possibleF.toString().toLowerCase()}/`)) {
                    confirmedFlags.push(possibleF.toString());
                    flagCount++;
                }        
            }

            if (p.vl) console.log('final count:', flagCount);
            return [ confirmedFlags, flagCount ];
        }

        // Filter so we only get the content
        function filterWord(w, f) {
            f = Array.from(f); // Flags
            w = w.toString(); // Word

            return w.toString().replace(f.join('/'), '').slice(1);
        }

        for (let word of splitString) {
            // const possibleOp = [];
            // let x, y; // X: Index of correct possible opportunity / Y: Correct possible opportunity word/flag
            const [ confirmedFlags, flagCount ] = returnPossibleFlags(word); // Possible flags and flag count
            const trueFlags = [];

            if (this.vl) console.log('possible flags / fc:', confirmedFlags, flagCount);
            if (confirmedFlags == [] || flagCount == 0) {  
                this._lx.push({
                    flags: [],
                    content: word,
                });
            } else {
                confirmedFlags.forEach((flag, index) => {
                    const correctFunction = this.itf[`${flag}/`];
                    const filteredContent = filterWord(word, confirmedFlags);
                    const lastFlag = index + 1 == confirmedFlags.length;

                    if (this.vl) console.log('correct function / filter / index:', correctFunction.name, filteredContent, index);
                    if (this.vl) console.log('confirmed flag count / last flag?:', confirmedFlags.length, lastFlag);

                    trueFlags.push(correctFunction); // This might be redundant but eh, I'll fix it in another update

                    // TODO: Multiple flag pushing to lexer
                    if (lastFlag) {
                        this._lx.push({
                            flags: trueFlags,
                            content: filteredContent,
                        });
                    }
                });
            }
            // This is the old system for anyone who is wondering. Just keep it there cause why not.
            // splitOp.forEach((maxSize) => possibleOp.push(word.toString().substring(0, maxSize)));
            // possibleOp.forEach((e, i) => {
            //     if (this._test(e)) {
            //         x = i;
            //         y = e;
            //     }
            // });

            // if (this.vl) console.log('possibleOp / word / x:', possibleOp, word, x);

            // // No flags exist
            // if (x == undefined) return this._lx.push({
            //     type: undefined,
            //     content: word.toString(),
            // });

            // this._lx.push({
            //     type: this.itf[y],
            //     content: word.toString().substring(possibleOp[x].toString().length, word.toString().length),
            // });
        }
    }

    // Main Function
    _main(s) {
        this._lexer(s);
        const cs = []; // Final string join

        for (const y of this._lx) {
            const flags = y['flags'];
            let content = y['content'];

            if (this.vl) console.log(y);
            if (flags != {} || flags.length != 0) flags.forEach((flagFunction) => content = flagFunction(content));
            
            cs.push(content);
        }

        this._resetLx();

        return cs.join(' '); // TODO: Might need to fix this to account for new lines, etc.
    }

    // --------------- EXTERNAL --------------- //

    // TODO: Extending prototype actually work LOL
    // internalParse() {
    //     console.log(this);
    //     return this._main(this);
    // }


    /**
     * Parse an input string with the ChalkFlag engine
     * @param { string } string - String to be parsed
     * @returns { string } Formatted string that can be console-logged
     */
    parse(string) {
        return this._main(string);
    }
}

export default ChalkFlag;