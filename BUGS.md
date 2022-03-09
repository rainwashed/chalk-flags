# Collection of Bugs for ChalkFlags

#### 03/09/2021
- [ ] When pure invalid flags are entered into the correct syntax, ChalkFlags will trimmed string without the hypothetical flag block and end block
- ![](screenshots/screenshot-2022-03-09-05-01-04.png) \
is correlated to \
![](screenshots/screenshot-2022-03-09-05-01-58.png)
- [ ] (Unsure) All text colors resolve to white if text modifications (such as bold, italics, etc.) are applied concurrently (probably an issue with the lexer/parsing or with the lexer system overriding previous lexers).