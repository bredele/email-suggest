/**
 * Dependencies
 */

const popular = require('email-domain-popular')
const email = require('email-domain')
const pick = require('array-prefix')

/**
 * Default suggestion mapping function.
 * By default return the first suggestion in the list of popular domains.
 *
 * @type {Function}
 */

const map = (str, domains) => email(str, domains[0])

/**
 * Suggest email address based on list of popular domains.
 *
 * @param {String} address
 * @param {Function?} map
 * @api public
 */

module.exports = (address, cb = map, suggested = popular) => {
  const [left, right] = address.split('@')
  if (right) return cb(address, pick(right, suggested), left)
}
