/**
 * Dependencies
 */

const popular = require('email-domain-popular')
const email = require('email-domain')
const pick = require('array-prefix')

module.exports = (address) => {
  const [left, right] = address.split('@')
  if (right != null) {
    const domains = pick(right, popular)
    return email(address, domains[0])
  }
}
