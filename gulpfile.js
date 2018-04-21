'use strict'

//#region require modules
//node
const glob        = require ('glob')
const fs          = require ('fs')
//gulp
const gulp        = require ('gulp')
const sourcemaps  = require ('gulp-sourcemaps')
const sass        = require ('gulp-sass')
const pug         = require ('gulp-pug')
const babel       = require ('gulp-babel')
const concat      = require ('gulp-concat')
const uglify      = require ('gulp-uglify')
//webpack
const webpack       = require ('webpack')
const webpackStream = require ('webpack-stream')
const webpackConfig = require ('./webpack.config.js')
//others
const BrowserSync = require ('browser-sync')
const pump        = require ('pump')
//#endregion

const browserSync = BrowserSync.create()

const dirs = {
  src:  './src',   // Sources directory
  dev:  './build', // Development build
}

// === Helpers

const removeFiles = (pattern) => {
  glob.sync(pattern).forEach(file => {
    fs.unlinkSync(file)
  })
}


// === Building tasks

gulp.task('sass', (cb) => {
  pump([
    gulp.src(`${dirs.src}/sass/main.scss`),
    sourcemaps.init(),
    sass().on('error', sass.logError),
    sourcemaps.write(), // write() to write inline or .write('./maps')
    gulp.dest(`${dirs.dev}/css`),
    browserSync.stream(),
  ], cb)
})

gulp.task('pug', (cb) => {
  pump([
    gulp.src(`${dirs.src}/*.pug`),
    pug({
        // Your options in here.
    }),
    gulp.dest(dirs.dev),
    browserSync.stream(),
  ], cb)
});

gulp.task('js', (cb) => {
  pump([
    gulp.src(`${dirs.src}/js/*.js`),
    //sourcemaps.init(),
    webpackStream(webpackConfig, webpack),
    //concat('all.js'),
    //uglify({output: {beautify: true}}),
    //sourcemaps.write('.'),
    gulp.dest(dirs.dev),
  ], cb)
});


// === Serving tasks

let clean = (dir) => removeFiles(`${dir}/**/*.*`)

gulp.task('clean', () => clean(dirs.dev))

gulp.task('watch', () => {
  gulp.watch(`${dirs.src}/sass/**/*.scss`, ['sass'])
  gulp.watch(`${dirs.src}/*.pug`, ['pug'])
  gulp.watch(`${dirs.src}/**/*.@(js|jsx)`, ['js'])
})

gulp.task('build', ['clean', 'sass', 'pug', 'js'])

gulp.task('serve-only', ['watch'], () => {
  browserSync.init({
    server: dirs.dev
  })

  gulp.watch([
    `${dirs.dev}/*.html`, 
    `${dirs.dev}/css/*.css`,
    `${dirs.dev}/*.js`,
  ]).on('change', browserSync.reload)
})

gulp.task('serve', ['build', 'serve-only'])