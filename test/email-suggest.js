/**
 * Dependencies
 */

const test = require('tape')
const suggest = require('..')

test('should not suggest email address if does not contain a @ charater', assert => {
  assert.plan(1)
  assert.equal(suggest('hello') == null, true)
})

test('should suggest email address if contains a @ charater', assert => {
  assert.plan(1)
  assert.equal(suggest('hello@gma'), 'hello@gmail.com')
})

test('should suggest first most popular domain based on given address', assert => {
  assert.plan(1)
  assert.equal(suggest('hello@hot'), 'hello@hotmail.be')
})
