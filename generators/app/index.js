'use strict'

const path = require('path')
const Generator = require('yeoman-generator')
const chalk = require('chalk')
const yosay = require('yosay')

const pkg = require('../../package.json')

module.exports = class extends Generator {
  prompting () {
    // greeting
    this.log(yosay(`Welcome to the mighty ${chalk.red.bold(pkg.name)}!`, { maxLength: 40 }))

    const prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'package name:',
        default: '@scope/name'
      },
      {
        type: 'checkbox',
        name: 'directories',
        message: 'directories:',
        choices: [
          {
            name: 'media',
            value: 'copyMediaDir',
            checked: true
          }
        ]
      },
      {
        type: 'checkbox',
        name: 'semanticRelease',
        message: 'semantic-release:',
        choices: [
          {
            name: '@semantic-release/npm plugin',
            value: 'includeNpmPlugin',
            checked: true
          },
          {
            name: '@semantic-release/exec plugin',
            value: 'includeExecPlugin',
            checked: true
          }
        ]
      }
    ]

    return this.prompt(prompts).then(props => { this.props = props })
  }

  async writing () {
    // process project name
    const fullName = this.props.name
    const [scope, barename] = fullName.split('/')

    const template = {
      name: fullName,
      user: scope.substring(1), // remove the leading @
      repo: barename
    }

    this._copy('script/gulp/tasks/_gitkeep')
    this._copy('script/gulp/utils/_gitkeep')
    this._copy('script/gulp/config.js')

    // handle media dir
    if (this.props.directories.includes('copyMediaDir')) {
      this._copy('media/_gitkeep')
    }

    this._copy('src/_gitkeep')
    this._copy('test/_gitkeep')

    this._copy('_editorconfig')
    this._copy('_gitattributes')
    this._copy('_gitignore')
    this._copy('_npmignore')
    this._copy('_nvmrc')
    this._copy('_travis.yml')

    // handle .releaserc
    const config = this.fs.readJSON(this.templatePath('_releaserc'))

    if (this.props.semanticRelease.includes('includeNpmPlugin')) {
      config.plugins.push('@semantic-release/npm')
    }

    if (this.props.semanticRelease.includes('includeExecPlugin')) {
      config.plugins.push([
        '@semantic-release/exec', {
          // eslint-disable-next-line
          successCmd: 'export SEMANTIC_RELEASE_NEXT_RELEASE_VERSION=\"${nextRelease.version}\" && npm run build && npm run deploy'
        }
      ])
    }

    this.fs.writeJSON(this.destinationPath('.releaserc'), config, null, 2)

    this._copy('LICENSE.md')
    this._copy('package.json', template)
    this._copy('README.md', template)
  }

  install () {
    const devDependencies = [
      // install semantic-release
      'semantic-release',
      '@semantic-release/changelog',
      '@semantic-release/git',
      '@semantic-release/exec',

      // install gulp
      'gulp',
      'gulp-debug',

      // install standard
      'standard',
      'snazzy'
    ]

    this.npmInstall(devDependencies, { 'save-dev': true })
  }

  _copy (file, template) {
    const basename = path.basename(file)

    let destFile = file

    // replace _ with a . if the file is a leading-underscored file (e.g.: _gitkeep => .gitkeep)
    if (basename.startsWith('_')) {
      destFile = path.dirname(file) + '/.' + basename.substring(1)
    }

    if (template) {
      this.fs.copyTpl(
        this.templatePath(file),
        this.destinationPath(destFile),
        template
      )
    } else {
      this.fs.copy(
        this.templatePath(file),
        this.destinationPath(destFile)
      )
    }
  }
}
