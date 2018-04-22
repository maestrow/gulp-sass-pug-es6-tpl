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
//webpack
const webpack              = require ('webpack')
const webpackConfig        = require ('./webpack.config.js')
const webpackDevMiddleware = require ('webpack-dev-middleware')
const webpackHotMiddleware = require ('webpack-hot-middleware')
//others
const BrowserSync = require ('browser-sync')
const pump        = require ('pump')
//#endregion

const browserSync = BrowserSync.create()
const bundler = webpack(webpackConfig)

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

gulp.task('webpack', () => {
  bundler.run((err, stats) => {})
})

// === Serving tasks

let clean = (dir) => removeFiles(`${dir}/**/*.*`)

gulp.task('clean', () => clean(dirs.dev))

gulp.task('watch-src', () => {
  gulp.watch(`${dirs.src}/sass/**/*.scss`, ['sass'])
  gulp.watch(`${dirs.src}/*.pug`, ['pug'])
})

gulp.task('dev-build', ['clean', 'sass', 'pug']) // webpack task excluded because js recieved from web-sockets, not from fs. 

gulp.task('run-server', ['watch-src'], () => {
  browserSync.init({
    server: dirs.dev,
    browser: 'Chrome',
    startPath: '/react.html',
    middleware: [
      webpackDevMiddleware(bundler),
      webpackHotMiddleware(bundler)
    ]
  })

  gulp.watch([
    `${dirs.dev}/*.html`, 
    `${dirs.dev}/css/*.css`,
    // js not included
  ]).on('change', browserSync.reload)
})

gulp.task('serve', ['dev-build', 'run-server'])

