const doppler = require('./doppler.js')
const gatsbyCloudSecrets = doppler.fetchSecrets('gatsby-cloud')

module.exports = {
  GATSBY_API_URL: gatsbyCloudSecrets.GATSBY_API_URL,
  GATSBY_SITE_ID: gatsbyCloudSecrets.GATSBY_SITE_ID,
  GATSBY_AUTH_TOKEN: gatsbyCloudSecrets.GATSBY_AUTH_TOKEN,
}
