/**
 * Dependencies
 */

const popular = require('email-domain-popular')
const email = require('email-domain')
const pick = require('array-prefix')

module.exports = (address, cb = (str, domains) => email(str, domains[0])) => {
  const [left, right] = address.split('@')
  if (right != null) {
    return cb(address, pick(right, popular), left)
  }
}
