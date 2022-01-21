const clearEnvironmentVariables = require('./gatsby-cloud-api.js').clearEnvironmentVariables

;(async () => {
  console.log('[info]: clearing Gatsby secrets')
  const syncResponse = await clearEnvironmentVariables()
  console.log(`[info]: sync response: ${JSON.stringify(syncResponse.data, null, 2)}`)
})()
