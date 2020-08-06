// v = value
const isArray     = v => typeof v === 'object' && v.constructor === Array
const isBoolean   = v => typeof v === 'boolean'
const isDate      = v => v instanceof Date
const isError     = v => typeof v.message !== 'undefined' && v instanceof Error
const isFalsey    = v => v === false || v === 0 || v.length === 0 || v === null || typeof v === 'undefined' 
const isFunction  = v => typeof v === 'function'
const isPromise   = v => v instanceof Promise
const isString    = v => typeof v === 'string' || v instanceof String
const isNull      = v => v === null
const isNumber    = v => typeof v === 'number' && isFinite(v)
const isObject    = v => typeof v === 'object' && v.constructor === Object && v
const isRegExp    = v => typeof v === 'object' && v.constructor === RegExp && v
const isSymbol    = v => typeof v === 'symbol'
const isUndefined = v => typeof v === 'undefined'
// isNaN builtin javascript
// isFinite builtin javascript
// isArray builtin javascript but is used as a method instead of a standalone function
