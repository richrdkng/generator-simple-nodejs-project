'use strict'

const assert = require('assert')
const path = require('path')
const fs = require('fs-extra')
const ci = require('is-ci')
const execa = require('execa')
// const getVersion = require('./get-version-from-env')
// const isVersionValid = require('./is-version-valid')

const root = path.join(__dirname, '../../../')

module.exports = {
  run: async () => {
    // check CI environment
    assert(ci, 'Script can be executed only in a CI environment.')

    // check token presence
    assert(process.env.NPM_TOKEN, 'NPM token is not present.')

    // const version = getVersion()

    // check version validity
    // assert(isVersionValid(version), `Version "${version}" is invalid.`)

    // edit package name
    const pkg = require(`${root}/package.json`)
    const originalName = pkg.name
    const [scope, name] = pkg.name.split('/')

    pkg.name = `${scope}/generator-${name}`

    await fs.writeJSON(`${root}/package.json`, pkg, { spaces: 2 })

    // add note to README.md
    const npmUrl = `https://www.npmjs.com/package/${originalName}`
    const readme = await fs.readFile(`${root}/README.md`, 'utf-8')

    let note = `## This is an automatically cloned package for **${originalName}** to provide an inline Yeoman generation, when using this generator!\n\n`
    note += '## ***Do not install or use this package!***\n\n'
    note += `### To get the **actual package**, go to: ${npmUrl}\n\n`
    note += '---\n\n'

    await fs.writeFile(`${root}/README.md`, note + readme)

    // publish the modified files to NPM
    await execa('npm', ['publish'], { cwd: root })
  }
}
