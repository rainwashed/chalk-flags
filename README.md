<h1 align="center">Chalk Flags</h1>
<h3 align="center">Easily declare <a href='https://www.npmjs.com/package/chalk'>chalk.js</a> color styles inside the text itself.</h1>

---

## Setup
There are two methods to use **chalk-flags**.

### 1. From Package

> npm install --save chalk-flags

### 2. From Source

> git clone https://github.com/rainwashed/chalk-flags.git

\* import the ``index.js`` file

---

## Usage

```js
import chalkFlags from 'chalk-flags';

console.log(chalkFlags('bd/Hello r/World')); // Returns a formatted string
```
Output: \
![_](assets/demo_img1.png)

---

## Examples

### Welcome Statement
![_](assets/demo_welcome.png)

Code:
```js
console.log(parse('bd/Hello bd/and bd/welcome! b/We b/are b/glad b/you b/joined b/us. i/Do i/not i/share i/any i/info i/this i/point i/forward.'));
```

### Logger
![_](assets/demo_logs.png)

Code:
```js
console.log(parse('Current Time: i/10:04PM \nMemory Usage: bd/2gb/10gb \nUnix Name: b/Rain'));
```

---

## Documentation

Each word in a document can have **one** flag that will modify its colors/attributes.
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

- Flag chaining (more than one flag per word)
- Flag covering (more than one word per flag)

---

## Bug / Issues

- Multiline formatting
    - Point-of-failure: ```const s = string.toString().split(' ')``` (line 35 @ *index.js*)
    - Most-probable-solution: Handle both ``\n`` and (spaces)
- Newline statements (``\n``)
    - Point-of-failure: ```const s = string.toString().split(' ')``` (line 35 @ *index.js*)
    - Most-probable-solution: Handle both ``\n`` and (spaces)