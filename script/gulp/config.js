'use strict'

const gulp = require('gulp')
const fixer = require('./utils/yo-scoped-generator-clone-fixer')

gulp.task('yo:fix', async () => {
  fixer.run()
})
