'use strict'

const path = require('path')
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
    this._copy('script/gulp/tasks/_gitkeep')
    this._copy('script/gulp/utils/_gitkeep')
    this._copy('script/gulp/config.js')

    this._copy('src/_gitkeep')
    this._copy('test/_gitkeep')

    this._copy('_editorconfig')
    this._copy('_gitattributes')
    this._copy('_gitignore')
    this._copy('_npmignore')
    this._copy('_nvmrc')
    this._copy('_releaserc')
    this._copy('_travis.yml')

    this._copy('LICENSE.md')
    this._copy('package.json')
    this._copy('README.md')
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

  _copy (file) {
    const basename = path.basename(file)

    let destFile = file

    // replace _ with a . if the file is a leading-underscored file (e.g.: _gitkeep => .gitkeep)
    if (basename.startsWith('_')) {
      destFile = path.dirname(file) + '/.' + basename.substring(1)
    }

    this.fs.copy(
      this.templatePath(file),
      this.destinationPath(destFile)
    )
  }

  _installDevDependency (...deps) {
    this.npmInstall(deps, { 'save-dev': true })
  }
}
