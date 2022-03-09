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

## Documentation

## Caveats
- \* a
- \*\* b