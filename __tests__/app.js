'use strict'

const path = require('path')
const assert = require('yeoman-assert')
const helpers = require('yeoman-test')

describe('generator-simple-nodejs-project:app', () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts({ someAnswer: true })
  })

  it('creates files', () => {
    assert.file([
      'script/gulp/tasks/.gitkeep',
      'script/gulp/utils/.gitkeep',
      'script/gulp/config.js'
    ])

    assert.file([
      'src/.gitkeep',
      'test/.gitkeep'
    ])

    assert.file([
      '.editorconfig',
      '.gitattributes',
      '.gitignore',
      '.npmignore',
      '.nvmrc',
      '.releaserc',
      '.travis.yml'
    ])

    assert.file([
      'LICENSE.md',
      'package.json',
      'README.md'
    ])
  })
})
