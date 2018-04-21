# Web prototyping environment with gulp & webpack

Build tools: [GULP](https://gulpjs.com/), [WebPack](https://webpack.js.org/), [BrowserSync](https://www.browsersync.io/). 
Dev techs: [SASS](http://sass-lang.com/), [PUG](https://pugjs.org), [React](https://reactjs.org/).


## Tools

- `npm i -D` [gulp](https://www.npmjs.com/package/gulp). 
- `npm i -D` [pump](https://www.npmjs.com/package/pump) - to help properly handle error conditions with Node streams. For more information, see [Why Use Pump?](https://github.com/terinjokes/gulp-uglify/blob/master/docs/why-use-pump/README.md#why-use-pump).
- `npm i -D` [gulp-sourcemaps](https://www.npmjs.com/package/gulp-sourcemaps)
- `npm i -D` [gulp-concat](https://www.npmjs.com/package/gulp-concat)[gulp-uglify](https://www.npmjs.com/package/gulp-uglify) - for production builds.<br>
- `npm i -D` [webpack](https://www.npmjs.com/package/webpack) [webpack-stream](https://www.npmjs.com/package/webpack-stream) - to integrate webpack in gulp<br>


## Syntaxes

[SASS](http://sass-lang.com/): 
`npm i -D` [gulp-sass](https://www.npmjs.com/package/gulp-sass) 

[PUG](https://pugjs.org): `npm i -D` [gulp-pug](https://www.npmjs.com/package/gulp-pug)

[React](https://reactjs.org/): 

- `npm i -D` [gulp-babel](https://www.npmjs.com/package/gulp-babel)
- `npm i -D` [@babel/core](https://www.npmjs.com/package/@babel/core) [babel-loader](https://www.npmjs.com/package/babel-loader) [@babel/preset-env](https://www.npmjs.com/package/@babel/preset-env) [@babel/preset-react](https://www.npmjs.com/package/@babel/preset-react) - babel core, loader and presets.
- `npm i -S` [react](https://www.npmjs.com/package/react) [react-dom](https://www.npmjs.com/package/react-dom)


## How to use

- `npm run gulp -T` to list all tasks. 
- `npm run gulp <task>` run specific task.
- `npm start` build and open browser in watch mode.
- You can debug gulp tasks in [VS Code](https://code.visualstudio.com/). Change `args` in [launch.json](https://code.visualstudio.com/docs/editor/debugging) to debug specific task.


## Q & A

### Q: Why gulp + webpack, why not just only webpack as it can pack everything?

A: Gulp tasks is a functions, it is just code that uses some libraries. It doesn't cost anythig to start use it. And that's what I like about Gulp. [I like libraries and do not like frameworks](http://tomasp.net/blog/2015/library-frameworks/). On the other side webpack looks like a framework with huge configuration file. I have webpack experience and it takes me longer time to make things work in comparison to gulp. So I persanally don't like webpack. But webpack has (at least) one feature, that I like - it's able to traverse source code tree through `import` directives. And using loaders you can transform source to destination format. Since that at this moment there are no other tool, that can traverce source tree and pass modules through loaders (If there is, please let me know, i.e. send PR to this readme), I use webpack for that specific task. For other build tasks I prefer gulp.

