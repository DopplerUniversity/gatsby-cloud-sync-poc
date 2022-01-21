const fetchEnvironmentVariables = require('./gatsby-cloud-api.js').fetchEnvironmentVariables

;(async () => {
  console.log('[info]: fetch Gatsby Cloud environment variables')
  const environmentVariablesResponse = await fetchEnvironmentVariables()
  console.log(`[info]: environment variables response: ${JSON.stringify(environmentVariablesResponse.data, null, 2)}`)
})()
