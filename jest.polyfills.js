// jest.polyfills.js

// Polyfill for TextEncoder and TextDecoder
const { TextDecoder, TextEncoder } = require('util')

if (!global.TextDecoder) {
  global.TextDecoder = TextDecoder
}

if (!global.TextEncoder) {
  global.TextEncoder = TextEncoder
}
