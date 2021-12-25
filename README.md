<h1 align="center">Chalk Flags</h1>
<h3 align="center">Easily declare <a href='https://www.npmjs.com/package/chalk'>chalk.js</a> color styles inside the text itself.</h1>
<p align="center">Version 1.0.1</p>

---

## Setup
There are two methods to use **chalk-flags**.

### 1. From Package

> npm install --save chalk-flags

### 2. From Source

> git clone https://github.com/rainwashed/chalk-flags.git

\* import the ``index.js`` file for version 1.0.1 or ``old.js`` for version 1.0.0

---

## Usage

```js
import cf from 'chalk-flags';

const e = new cf(); // Chalk flag engine (multiple can be created with different settings)

console.log(e.parse('r/bd/Hello u/i/World'));
```

![](./assets/demo.png)

---

```js
// TODO: Fix broken documentation
```
## Documentation

Each word in a document can have **multiple** (introduced in version 1.0.1) flag that will modify its colors/attributes.
The format is as follows \
``[flag]/word``

### Flags

All basic styles in *chalk.js* are covered.

- **bd** : ```chalk.bold```
- **d** : ```chalk.dim```
- **i** : ```chalk.italic```
- **u** : ```chalk.underline```
- **iv** : ```chalk.inverse```
- **st** : ```chalk.strikethrough```
- **bk** : ```chalk.black```
- **r** : ```chalk.red```
- **g** : ```chalk.green```
- **b** : ```chalk.blue```
- **m** : ```chalk.magenta```
- **c** : ```chalk.cyan```
- **w** : ```chalk.white```
- **gy** : ```chalk.grey```
- **bgbk** : ```chalk.bgBlack```
- **bgr** : ```chalk.bgRed```
- **bgg** : ```chalk.bgGreen```
- **bgb** : ```chalk.bgBlue```
- **bgm** : ```chalk.bgMagenta```
- **bgc** : ```chalk.bgCyan```
- **bgw** : ```chalk.bgWhite```
- **bggy** : ```chalk.bgGrey```

> #### Function: parse
> To get the formatted result just call the imported function with the string to be parsed. \
> Returns *string*

---

## Features / ToDo

- [ x ] Flag chaining (more than one flag per word)
- [ ] Flag covering (more than one word per flag)

---

## Bug / Issues

- Multiline formatting
    - Point-of-failure: ```const s = string.toString().split(' ')``` (line 35 @ *index.js*)
    - Most-probable-solution: Handle both ``\n`` and (spaces)
- Newline statements (``\n``)
    - Point-of-failure: ```const s = string.toString().split(' ')``` (line 35 @ *index.js*)
    - Most-probable-solution: Handle both ``\n`` and (spaces)