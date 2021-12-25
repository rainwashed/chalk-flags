import chalk from 'chalk';

/**
 * This function will parse a chalk-flags ready string
    @function parse
    @param { string } inputString String to be parsed
    @returns string Properly formatted string with color support
*/
function parse(string) {
    const identifierToFunction = {
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
    };  

    const s = string.toString().split(' ');
    const f = []; // Final string composite

    for (let word of s) {
        const flagAttr = [
            word.substring(0, 2), // Single letter flag
            word.substring(0, 3), // Two letter flag
            word.substring(0, 4), // Three letter flag
        ];
        let x;
        
        flagAttr.forEach((flagCode, i) => {
            if (!(identifierToFunction[flagCode] == undefined || identifierToFunction[flagCode] == null)) return x = i;
        });

        if (x == undefined) {
            f.push(word);
        } else {
            f.push(identifierToFunction[flagAttr[x]](word.slice(Array.from(flagAttr[x]).length)));
        }
    }

    return f.join(' ');
}

export default parse;