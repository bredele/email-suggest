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

test('should not return anything if no domain found', assert => {
  assert.plan(1)
  assert.equal(suggest('hello@zz') == null, true)
})

test('should return list of suggested domains if callback passed', assert => {
  assert.plan(2)
  const result = suggest('hello@g', (address, domains) => {
    assert.deepEqual(domains, [
      'games.com',
      'globo.com',
      'globomail.com',
      'gmail.com',
      'gmx.com',
      'gmx.de',
      'gmx.fr',
      'gmx.net',
      'google.com',
      'googlemail.com'
    ])
  })
  assert.equal(result == null, true)
})

test('should map suggested address with given callbacl', assert => {
  assert.plan(1)
  assert.equal(
    suggest('hello@g', (address, domains) => {
      return 'hello@gmail.com'
    }),
    'hello@gmail.com'
  )
})

test('should pass local email part to mapping function', assert => {
  assert.plan(1)
  suggest('hello@g', (address, domains, left) => {
    assert.equal(left, 'hello')
  })
})
