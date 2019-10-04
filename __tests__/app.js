'use strict'

const path = require('path')
const assert = require('yeoman-assert')
const helpers = require('yeoman-test')

describe('generator-simple-nodejs-project:app', () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        name: '@custom/package',
        directories: [
          'copyMediaDir'
        ],
        semanticRelease: [
          'includeNpmPlugin', 'includeExecPlugin'
        ]
      })
  })

  it('creates files', () => {
    assert.file([
      'script/gulp/tasks/.gitkeep',
      'script/gulp/utils/.gitkeep',
      'script/gulp/config.js'
    ])

    assert.file([
      'media/.gitkeep',
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

  it('has the content', () => {
    assert.fileContent('package.json', /"name": "@custom\/package"/)
    assert.fileContent('package.json', /"homepage": "https:\/\/github.com\/custom\/package#readme"/)

    assert.fileContent('README.md', /# @custom\/package/)
    assert.fileContent('README.md', /\[url-license-doc\]: https:\/\/github.com\/custom\/package\/blob\/master\/LICENSE.md/)
  })

  it('has the semantic-release config', () => {
    assert.fileContent('.releaserc', /"@semantic-release\/npm"/)
    assert.fileContent('.releaserc', /"@semantic-release\/exec"/)
  })
})
