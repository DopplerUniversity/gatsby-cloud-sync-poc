const axios = require('axios')
const config = require('./config.js')
const doppler = require('./doppler.js')

const fetchEnvironmentVariablesQuery = `query AllEnvironmentVariablesForSite($id: UUID!) {
  buildEnvironmentVariablesForSite: environmentVariablesForSite(
    id: $id
    runnerType: BUILDS
  ) {
    key
    value
    truncatedValue
    __typename
  }
  previewEnvironmentVariablesForSite: environmentVariablesForSite(
    id: $id
    runnerType: PREVIEW
  ) {
    key
    value
    truncatedValue
    __typename
  }
}  
`

const updateEnvironmentVariablesQuery = `mutation UpdateAllEnvironmentVariablesForSite(
  $id: UUID!
  $buildEnvironmentVariables: [TagInput!]!
  $previewEnvironmentVariables: [TagInput!]!
  ) {
  updateBuildEnvironmentVariablesForSite: updateEnvironmentVariablesForSite(
    id: $id
    environmentVariables: $buildEnvironmentVariables
    runnerType: BUILDS
  ) {
    success
    message
    __typename
  }
  updatePreviewEnvironmentVariablesForSite: updateEnvironmentVariablesForSite(
    id: $id
    environmentVariables: $previewEnvironmentVariables
    runnerType: PREVIEW
  ) {
    success
    message
    __typename
  }
}
`

async function executeGraphQLQuery(query, variables) {
  try {
    const response = await axios({
      url: config.GATSBY_API_URL,
      method: 'post',
      headers: {
        Authorization: config.GATSBY_AUTH_TOKEN,
      },
      data: {
        query,
        variables,
      },
    })
    return response
  } catch (error) {
    console.log(`[error]: GraphQL error: ${error}`)
    process.exit(1)
  }
}

let dopplerSecretsHash = null
async function updateEnvironmentVariables() {
  const buildSecrets = doppler.fetchGatsbyEnvironmentVariables('build')
  const previewSecrets = doppler.fetchGatsbyEnvironmentVariables('prev')
  const latestSecretsHash = Buffer.from(buildSecrets + previewSecrets).toString('base64')

  if (dopplerSecretsHash === latestSecretsHash) {
    return null
  }
  dopplerSecretsHash = latestSecretsHash

  const response = await executeGraphQLQuery(updateEnvironmentVariablesQuery, {
    id: config.GATSBY_SITE_ID,
    buildEnvironmentVariables: doppler.fetchGatsbyEnvironmentVariables('build'),
    previewEnvironmentVariables: doppler.fetchGatsbyEnvironmentVariables('prev'),
  })

  return response
}

async function clearEnvironmentVariables() {
  const response = await executeGraphQLQuery(updateEnvironmentVariablesQuery, {
    id: config.GATSBY_SITE_ID,
    buildEnvironmentVariables: [],
    previewEnvironmentVariables: [],
  })

  return response
}

async function fetchEnvironmentVariables() {
  const response = await executeGraphQLQuery(fetchEnvironmentVariablesQuery, {
    id: config.GATSBY_SITE_ID,
  })

  return response
}

module.exports = {
  executeGraphQLQuery,
  fetchEnvironmentVariablesQuery,
  updateEnvironmentVariablesQuery,
  updateEnvironmentVariables,
  clearEnvironmentVariables,
  fetchEnvironmentVariables,
}
