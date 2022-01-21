const updateEnvironmentVariables = require('./gatsby-cloud-api.js').updateEnvironmentVariables

async function syncSecrets() {
  const syncResponse = await updateEnvironmentVariables()
  if (syncResponse && syncResponse.data) {
    console.log('[info]: secrets synced to Gatsby')
  }
  setTimeout(syncSecrets, 1000)
}

syncSecrets()
