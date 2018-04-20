'use strict'

//#region require modules
const glob = require('glob')
const fs = require('fs')

const browserSync = require ('browser-sync').create()

// gulp and plugins
const gulp = require('gulp')
const sourcemaps = require('gulp-sourcemaps')
const sass = require('gulp-sass')
const pug = require('gulp-pug')
//#endregion


const removeFiles = (pattern) => {
  glob.sync(pattern).forEach(file => {
    fs.unlinkSync(file)
  })
}

gulp.task('clean', () => removeFiles('./dist/**/*.*'))

gulp.task('sass', function () {
  return gulp.src('./src/sass/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('./maps')) // write() to write inline or .write('./maps')
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream())
})

gulp.task('pug', function buildHTML() {
  return gulp.src('./src/*.pug')
    .pipe(pug({
      // Your options in here.
    }))
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.stream())
});

gulp.task('watch', function () {
  gulp.watch('./src/sass/**/*.scss', ['sass'])
  gulp.watch('./src/*.pug', ['pug'])
})

gulp.task('serve', ['clean', 'sass', 'pug', 'watch'], () => {
  browserSync.init({
    server: './dist'
  })

  gulp.watch(['./dist/*.html', './dist/css/*.css']).on('change', browserSync.reload)
})