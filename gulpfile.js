const {src, series, task, parallel, dest} = require('gulp');
const run = require('gulp-run');
const clean = require('gulp-clean');
const install = require('gulp-install');

const path = {
    build: {
        client: './build/client',
        server: './build/server'

    },
    src: {
        client: './client/dist/**/*.*',
        server: './server/dist/**/*.*'
    }
}
//NPM tasks
function deleteClientNodeModules () {
    return src('./client/node_modules', {read: false, allowEmpty: true}).pipe(clean());
}

function deleteServerNodeModules() {
    return src('./client/node_modules', {read: false, allowEmpty: true}).pipe(clean());
}

function npmInstall() {
    return src(['./client/package.json', './server/package.json']).pipe(install());
}

// SRC tasks

function build(cb) {
   return run('npm run build', {}).exec('', cb);
}

function copyBuildFiles(cb) {
    return src(path.src.client).pipe(dest(path.build.client))
}

// function build(cb) {
//
//
// }



const deleteNodeModules = parallel(deleteClientNodeModules, deleteServerNodeModules);

exports.deleteNodeModules = deleteNodeModules
exports.reinstallNodeModules = series(deleteNodeModules, npmInstall);


exports.npmInstall = npmInstall
exports.copyBuildFiles = copyBuildFiles
exports.default = npmInstall;
exports.build = build;