<h1 align="center">Chalk Flags</h1>
<h3 align="center">Declare <a href="https://npmjs.com/package/chalk">Chalk</a> inside the string itself</h3>

---

## Features
- All core colors, background colors, and text styles are supported
- Customizable syntax*
- Flag chaining and coverage
- Performant**

## Installation Process
### From [npm](https://npmjs.com/package/chalk-flags) (recommended)
> npm install --save chalk-flags
### From source 
> git clone https://github.com/rainwashed/chalk-flags.git

or 

> gh repo clone rainwashed/chalk-flags

and import the ``src/index.js`` file or the ``src/index.min.js`` \
ex:
```js
import ChalkFlags from "./src/index.js"
```

## Syntax
ChalkFlags requires a very declarative syntax. The default settings of the ChalkFlags syntax are the ``syntaxRules.flagSplit = "/"`` and ``syntaxRules.flagEnd = "end"`` meaning the "/" splits the flags and the actual main text, and the "end" declare the end of a ChalkFlag chunk. \
ex:
```
flags/main text content/end
      ^                  ^
syntaxRules.flagSplit    syntaxRules.flagEnd
```

## Flags
Flags have a simple structure, and are often characterized as either one or two characters combined with "modifiers". \
(Note: Modifiers can also stand on their own)

**Color**
> r - Red \
> g - Green \
> y - Yellow \
> b - Blue \
> m - Magenta \
> c - Cyan \
> w - White \
> bk - Black \
> gr - Gray

**Modifiers**
> ii - *Italics* \
> bb - **Bold** \
> un - __Underline__ \
> st - ~~Strikethrough~~ \
> in - Inverse \
> bt^ - Bright \
> bg^ - Background 

^: **bt** and **bg** behave differently compared to the other modifiers, but are classified as such due to their pattern. Their use will be described more in-depth later.

The flags come before the main text content. Refer back to this structure later:
```
flags/main text content/end
      ^                  ^
syntaxRules.flagSplit    syntaxRules.flagEnd
```
The flags come before the ``syntaxRules.flagSplit`` and are conjoined using ``+``. A simple example would be a **bold** and **red** text consisting of the string **Hello World**. \
For this to be represented in the ChalkFlags syntax, it goes as follows:
```
r+bb/Hello World/end
```
![](assets/docs/red_bold_Hello_World.png)

For modifiers such as **bt** and **bg**, they are appended to other flags rather than standing on their own. **bt** will brighten whatever color it is attached to (ex: Light Cyan = c_bt). **bt** will always require an _ to attach itself to a flag, so if the Light Cyan flag was written as cbt, it would not work. 

**bg** also attaches to another flag, but it makes the color the background color instead. **bg** requires that the B in the bg be capitalized during the flag statement (ex: Cyan Background = cBg). **bg** should always follow the color flag, not come before it.

## Documentation
``chalk-flags`` exports one class which is the ``ChalkFlag`` class, but since it is the default export, the name can be whatever during import. The ``ChalkFlag`` class must be initialized for the project to run as each ``ChalkFlag`` class can contain its own settings and syntax, making chalk-flags very versatile.

### constructor(verboseLogging=false, customSplitRule=" ", syntaxRules={ flagSplit: "/", flagEnd: "end" })
This will initialize ChalkFlag for usage with the ``parse`` function. \
*verboseLogging* must be a **boolean** type. \
*customSplitRule* must be a **string** type. \
*syntaxRules* must be an **object** type with the *flagSplit* and *flagEnd* must be **strings**.

- > verboseLogging determines if ChalkFlag should do verbose logging such as the lexer system, what it is processing, etc.
- > customSplitRule (kinda redundant) determines how two different flag declarations should be handled. (Ex: r+ii/Hello World/end b+ii/Goodbye World/end)
- > syntaxRules (kinda redundant) determines how the flag declaration syntax should be handled. The *flagSplit* properties tells where the flags and the main text content should split and the *flagEnd* property tells where the end of the flag chunk is

#### **returns** a ChalkFlag object/class

### parse(string)
The parse function takes in the input *string* that is the type of **string** and is the chalk declaration meaning the flags + text + flag ending. 

#### **returns** a properly, color-formatted string to be *console.log*

#### **Example**
```js
import ChalkFlag from "chalk-flags"

const cf = new ChalkFlag();
const formattedString = cf.parse("r/Hello World/end");

console.log(formattedString);

// Console log red colored "Hello World"
```

## Caveats
- \* The syntax is still quite limiting and I hope to expand the syntax to enable custom colors/hexadecimal codes.
- \*\* The performance I have still not measured to other packages, but from all the testing I've done, it seems to run quite fast.

## Contributors
```js
// No one has contributed yet
```

## Contribution Process
Anyone is welcome and free to contribute to the project. Just clone the repository, create a separate branch (use your username as the branch name), make your changes, and send a pull request

## License
This project is under the **MIT** license (same as chalk) and more information can be found in the [LICENSE](./LICENSE) file. 