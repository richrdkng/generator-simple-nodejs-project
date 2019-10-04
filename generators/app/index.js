'use strict'

const Generator = require('yeoman-generator')
const chalk = require('chalk')
const yosay = require('yosay')

module.exports = class extends Generator {
  prompting () {
    // Have Yeoman greet the user.
    this.log(
      yosay(`Welcome to the shining ${chalk.red('generator-simple-nodejs-project')} generator!`)
    )

    /*
    const prompts = [
      {
        type: 'confirm',
        name: 'someAnswer',
        message: 'Would you like to enable this option?',
        default: true
      }
    ]

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props
    })
    */
  }

  writing () {
    this.fs.copy(
      this.templatePath('**/*'),
      this.destinationRoot(),
      { globOptions: { dot: true } }
    )

    this.fs.copy(
      this.templatePath('\\.*'),
      this.destinationRoot()
    )
  }

  install () {
    // install semantic-release
    this._installDevDependency([
      '@semantic-release/changelog',
      '@semantic-release/commit-analyzer',
      '@semantic-release/exec',
      '@semantic-release/git',
      '@semantic-release/github',
      '@semantic-release/npm',
      '@semantic-release/release-notes-generator',
      'semantic-release'
    ])

    // install gulp
    this._installDevDependency([
      'gulp',
      'gulp-debug'
    ])

    // install standard
    this._installDevDependency([
      'snazzy',
      'standard'
    ])
  }

  _installDevDependency (...deps) {
    this.npmInstall(deps, { 'save-dev': true })
  }
}
