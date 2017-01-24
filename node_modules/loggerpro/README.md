# LoggerPro
Better logging in Node.<sub>1</sub>

## Features

❗️ **Message Types:** In addition to the regular ones, you can log success, error, info, and warning messages.

✅ **Emoji Log Symbols:** 👁💖 Emoji.

🔕 **Disable Logging:** Just call `.disable()` and messages will stop being logged.

🌎 **Environmentally Conscious:** Logging can be enabled or disabled based on the value of an environment variable.

🗄**Log to File:** Messages can be sent to a logfile and/or stdout. 

⌚️ **Timestamps:** Logged messages can include timestamps to let you know when they were sent.

🎨 **Colors:** Timestamps are colored when sent to the console.

💄**Pretty-Printed Objects**: JSON objects and arrays are printed in a much more readable way than with plain old `console.log`.

## Preview

<img src="http://alexarena.com/loggerpro-screen.jpg">

## Installation

You know the drill. `npm install loggerpro --save` installs logger-pro and adds it as a dependency to your project.

## The Basics

Before you do anything else, import the LoggerPro module:

`var log = require('./loggerpro')`

**By default, logging is enabled.**

You can disable logging in four(!!!) different ways:

1. `log.disable()`
2. `log.config({log:false})`
3. `log.toggle() // Only if logging is enabled.`
4. By setting setting `ENABLE_LOGGING=false` as an environment variable. 


You can reenable logging by doing the opposite of the above.

Every option in LoggerPro can be customized by the object that you pass when calling `.config()`, here's a sample that includes every property:

```js
log.config({
  log:true,
  showTimestamp:true,
  stdout:true,
  fileout:true,
  useEmoji: true
})
```

## Logging Messages

Here's how you log a message:
```js
log.message('Hello World!')
```

[10x programmers](https://twitter.com/thenatekirby/status/677573473670193152) can use this shorthand, which does the same thing:
```js
log.msg('Hello World!')
```

LoggerPro includes a special function for logging the value of variables:

```js
var foo = 12
log.val(foo,'foo') // 1st param is the var, 2nd is its name.

var bar = 'Hello!'
log.val(bar,'bar')

```
That example would log:
```
number x = 12
string bar = Hello!
```

## Message Types

Custom styling is provided for success, error, info, and warning messages.

Here's how you call each, respectively:
```js
log.err('This is an error. ') // log.error also works.
log.suc('Something succeeded!') //log.success works, too!
log.info('Something neither good nor bad happened.')
log.warn('This could be a problem in the future, but isn\'t now.')
```

The same output can also be achieved by providing an extra argument to a basic message. For example:

```js
log.msg('This is an error.','error')
```

By default, these messages are prefixed with a corresponding emoji. If you're on a PC or just aren't any fun, this can be disabled with the following:

```js
log.config({useEmoji:false})

```

## Output to a File

LoggerPro will log to a file if `fileout` is set to `true` in your config object. That file is called `debug.log` and it will be created in the directory where your app lives.

By default, the output from LoggerPro will just keep appending itself to that file. If you want to delete that file and start fresh, you can do so by calling `log.delete()`.

Because it's just a plaintext file, colors aren't shown in `debug.log`.

## Using Environment Variables

Logging can be enabled or disabled based on the value of an environment variable.

If you're new to environment variables, here are two really easy ways to set them:

1. If your app's start command is something like this: `node app.js`, you can pass it an environment variable that will enable logging like this: `ENABLE_LOGGING=true node app.js`.

2. Use [dotenv](https://www.npmjs.com/package/dotenv).

## Example

Putting it all together now, let's say we declared the following variables:

```js
var x = 12
var bar = 'Hello!'
var obj = {"make":"Bentley","model":"Continental GT","color":"Blue"}
```

Here's how we might print that plus an obligatory *hello world* message using just `console.log`:

```js
console.log('Hello World')
console.log(typeof(x) + ' x = ' + x)
console.log(typeof(bar) + ' bar = ' + bar)
console.log(obj)
```

Which would output:
```
Hello World
number x = 12
string bar = Hello
{ make: 'Bentley', model: 'Continental GT', color: 'Blue' }
```

Here's how we'd do it using LoggerPro:

```js
log.msg('Hello World')
log.val(x,'x')
log.val(bar,'bar')
log.msg(obj)
```

Which would output:

```
[23:19:57] Hello World
[23:19:57] number x = 12
[23:19:57] string bar = Hello!
[23:19:57] {
              "make": "Bentley",
              "model": "Continental GT",
              "color": "Blue"
           }
```

Prettier *and* quicker!

---
1: Better = better for the needs of [the author](http://twitter.com/alexarena). Your desire/need for this module will vary. For lots of people, `console.log` will work just fine, in which case, don't use this module!
