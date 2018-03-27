[![Build Status](https://travis-ci.org/{{github-user-name}}/{{github-app-name}}.svg?branch=master)](https://travis-ci.org/moppymopperson/linealysis.svg?branch=master)
[![Coverage Status](https://coveralls.io/repos/github/{{github-user-name}}/{{github-app-name}}/badge.svg?branch=master)](https://coveralls.io/github/moppymopperson/linealysis?branch=master)
[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)

# Linealysis

Linealysis is a simple Javascript/Typescript module for transforming chat
history exported from Line into convenient immutable objects that can be used
for personal projects.

```js
const fs = require('fs')
const MessageParser = require('linealysis').MessageParser

const history = fs.readFileSync('my_line_chat_history.txt').toString()
const parser = new MessageParser()
const messages = parser.parseText(history)
console.log(messages)
```

Messages are simple objects with three properties.

```ts
type Message {
    date: Date,
    sender: string,
    content: string
}
```
