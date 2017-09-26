'use strict'

const
  gulp = require('gulp'),  
  babel = require('gulp-babel'),
  eslint = require('gulp-eslint'),
  plumber = require('gulp-plumber'),
  notify = require('gulp-notify')

// babel
gulp.task('babel', ()=>{
  return gulp.src(['serve/src/**/*.js'])
  .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
  .pipe(babel())
  .pipe(gulp.dest('serve/dist/'))
})

// lint
gulp.task('lint', ()=>{
  return gulp.src(['serve/src/**/*.js'])
  .pipe(eslint())
  .pipe(eslint.format())
})

// watch
gulp.task('watch', ()=>{

  // file
  gulp.watch('serve/src/**/*.js', ['babel'])
})
