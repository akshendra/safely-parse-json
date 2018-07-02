### Parse JSON safely

```js
const safe = require('safely-parse-json');

const value = '{ "one": "one" }';
const result = safe(value, options); // value parsed
```

Options are,
  - `checkString`: if `true` will assume error if `value` is not string [default: `true`]
  - `returnError`: if `true` will also return error, and result will be of from `{ value, error }` [default: `false`]
  - `nullOnError`: if `true` will not return the original value on error, will return null instead [default: `false`]