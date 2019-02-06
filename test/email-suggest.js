/**
 * Dependencies
 */

const test = require('tape')
const suggest = require('..')

test('should not suggest email address if does not contain a @ charater', assert => {
  assert.plan(1)
  assert.equal(suggest('hello') == null, true)
})

test('should not suggest email address if does not contain a domain after the @ charater', assert => {
  assert.plan(1)
  assert.equal(suggest('hello@') == null, true)
})

test('should not suggest email if local email is falsy', assert => {
  assert.plan(1)
  assert.equal(suggest('@gmail.com') == null, true)
})

test('should suggest email address if contains a @ charater', assert => {
  assert.plan(1)
  assert.equal(suggest('hello@gma'), 'hello@gmail.com')
})

test('should suggest first most popular domain based on given address', assert => {
  assert.plan(1)
  assert.equal(suggest('hello@hot'), 'hello@hotmail.com')
})

test('should not return anything if no domain found', assert => {
  assert.plan(1)
  assert.equal(suggest('hello@zz') == null, true)
})

test('should return list of suggested domains if callback passed', assert => {
  assert.plan(2)
  const result = suggest('hello@g', (address, domains) => {
    assert.deepEqual(domains, ['gmail.com', 'games.com', 'globo.com', 'globomail.com', 'gmx.com', 'gmx.de', 'gmx.fr', 'gmx.net', 'google.com', 'googlemail.com'])
  })
  assert.equal(result == null, true)
})

test('should map suggested address with given callback', assert => {
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

test('should pass a list of suggested domains', assert => {
  assert.plan(1)
  assert.equal(
    suggest('hello@g', undefined, ['klara.com', 'olivier.com', 'gabriel.com']),
    'hello@gabriel.com'
  )
})

test('should merge list of suggested domains', assert => {
  assert.plan(2)
  assert.equal(
    suggest('hello@g', undefined, ['klara.com', 'olivier.com', 'gabriel.com'], true),
    'hello@gabriel.com'
  )
  assert.equal(
    suggest('hello@li', undefined, ['klara.com', 'olivier.com', 'gabriel.com'], true),
    'hello@live.com'
  )
})
