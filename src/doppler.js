const execSync = require('child_process').execSync

function secretsToGraphQLVariables(secrets) {
  return Object.keys(secrets).map(key => {
    return { key, value: secrets[key] }
  })
}

function fetchSecrets(config) {
  try {
    return JSON.parse(execSync(`doppler secrets download --config ${config} --no-file --format json`))
  } catch (error) {
    console.log(`[error]: Error fetching secrets from Doppler CLI ${error}`)
    process.exit(1)
  }
}

function fetchGatsbyEnvironmentVariables(config) {
  return secretsToGraphQLVariables(fetchSecrets(config))
}

module.exports = { fetchSecrets, fetchGatsbyEnvironmentVariables }
