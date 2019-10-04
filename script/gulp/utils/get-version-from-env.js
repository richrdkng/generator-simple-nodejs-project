'use strict'

const semver = require('semver')

module.exports = (defaultEnvVar = 'SEMANTIC_RELEASE_NEXT_RELEASE_VERSION', defaultVersion = '0.0.0') => {
  const version = process.env[defaultEnvVar]

  return semver.valid(version) !== null
    ? version
    : defaultVersion
}
