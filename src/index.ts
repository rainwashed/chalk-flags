import chalk, { Chalk } from "chalk";

let c: any = chalk;

const validColors: Map<string, string> = new Map<string, string>([
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
const validModifiers: Map<string, string> = new Map<string, string>([
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
const validBackgrounds: Map<string, string> = new Map<string, string>([
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

// note, able to add Bright to ends of validColors and validBackgrounds

interface ChalkSetting {
    /**
	The color support for Chalk.

	By default, color support is automatically detected based on the environment.

	Levels:
	- `0` - All colors disabled.
	- `1` - Basic 16 colors support.
	- `2` - ANSI 256 colors support.
	- `3` - Truecolor 16 million colors support.
	*/
    level?: 0 | 1 | 2 | 3;

    /**
	Use RGB values to set text color.

	@example
	```
	import chalk from 'chalk';

	chalk.rgb(222, 173, 237);
	```
	*/
    rgb?: (red: number, green: number, blue: number) => this;

    /**
	Use HEX value to set text color.

	@param color - Hexadecimal value representing the desired color.

	@example
	```
	import chalk from 'chalk';

	chalk.hex('#DEADED');
	```
	*/
    hex?: (color: string) => this;

    /**
	Use an [8-bit unsigned number](https://en.wikipedia.org/wiki/ANSI_escape_code#8-bit) to set text color.

	@example
	```
	import chalk from 'chalk';

	chalk.ansi256(201);
	```
	*/
    ansi256?: (index: number) => this;

    /**
	Use RGB values to set background color.

	@example
	```
	import chalk from 'chalk';

	chalk.bgRgb(222, 173, 237);
	```
	*/
    bgRgb?: (red: number, green: number, blue: number) => this;

    /**
	Use HEX value to set background color.

	@param color - Hexadecimal value representing the desired color.

	@example
	```
	import chalk from 'chalk';

	chalk.bgHex('#DEADED');
	```
	*/
    bgHex?: (color: string) => this;

    /**
	Use a [8-bit unsigned number](https://en.wikipedia.org/wiki/ANSI_escape_code#8-bit) to set background color.

	@example
	```
	import chalk from 'chalk';

	chalk.bgAnsi256(201);
	```
	*/
    bgAnsi256?: (index: number) => this;

    /**
	Modifier: Reset the current style.
	*/
    readonly reset?: this;

    /**
	Modifier: Make the text bold.
	*/
    readonly bold?: this;

    /**
	Modifier: Make the text have lower opacity.
	*/
    readonly dim?: this;

    /**
	Modifier: Make the text italic. *(Not widely supported)*
	*/
    readonly italic?: this;

    /**
	Modifier: Put a horizontal line below the text. *(Not widely supported)*
	*/
    readonly underline?: this;

    /**
	Modifier: Put a horizontal line above the text. *(Not widely supported)*
	*/
    readonly overline?: this;

    /**
	Modifier: Invert background and foreground colors.
	*/
    readonly inverse?: this;

    /**
	Modifier: Print the text but make it invisible.
	*/
    readonly hidden?: this;

    /**
	Modifier: Puts a horizontal line through the center of the text. *(Not widely supported)*
	*/
    readonly strikethrough?: this;

    /**
	Modifier: Print the text only when Chalk has a color level above zero.

	Can be useful for things that are purely cosmetic.
	*/
    readonly visible?: this;

    readonly black?: this;
    readonly red?: this;
    readonly green?: this;
    readonly yellow?: this;
    readonly blue?: this;
    readonly magenta?: this;
    readonly cyan?: this;
    readonly white?: this;

    /*
	Alias for `blackBright`.
	*/
    readonly gray?: this;

    /*
	Alias for `blackBright`.
	*/
    readonly grey?: this;

    readonly blackBright?: this;
    readonly redBright?: this;
    readonly greenBright?: this;
    readonly yellowBright?: this;
    readonly blueBright?: this;
    readonly magentaBright?: this;
    readonly cyanBright?: this;
    readonly whiteBright?: this;

    readonly bgBlack?: this;
    readonly bgRed?: this;
    readonly bgGreen?: this;
    readonly bgYellow?: this;
    readonly bgBlue?: this;
    readonly bgMagenta?: this;
    readonly bgCyan?: this;
    readonly bgWhite?: this;

    /*
	Alias for `bgBlackBright`.
	*/
    readonly bgGray?: this;

    /*
	Alias for `bgBlackBright`.
	*/
    readonly bgGrey?: this;

    readonly bgBlackBright?: this;
    readonly bgRedBright?: this;
    readonly bgGreenBright?: this;
    readonly bgYellowBright?: this;
    readonly bgBlueBright?: this;
    readonly bgMagentaBright?: this;
    readonly bgCyanBright?: this;
    readonly bgWhiteBright?: this;
}

function init(settings: ChalkSetting): void {
    c = new Chalk(settings);
}

interface ChalkEntry {
    type: "color" | "modifier" | "background";
    text: string;
    method: void;
}

class ChalkFlag {
    verboseLogging: boolean;
    /**
     * @readonly
     */
    readonly _splitter: string = "/";
    /**
     * @readonly
     */
    readonly _splitterEnd: string = "end";
    private _lexer: Array<ChalkEntry>;

    constructor(verboseLogging: boolean = false) {
        this.verboseLogging = verboseLogging;
        this._lexer = [];
    }

    private reset(): void {
        this._lexer = [];
    }

    private log(s: string, ...args: string[]): void {
        if (this.verboseLogging) {
            console.log(s, args);
        }
    }

    return_config(): Map<string, any> {
        return new Map<string, any>([
            ["verboseLoggingEnabled?", this.verboseLogging],
            ["chalkFlagSplitter", this._splitter],
        ]);
    }
}

/* export { init };
export default ChalkFlag;
 */

const cf = new ChalkFlag(true);
console.log(cf.return_config());
