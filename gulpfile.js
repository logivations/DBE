const {src, series, parallel, dest} = require('gulp');
const run = require('gulp-run');
const clean = require('gulp-clean');
const install = require('gulp-install');
const liveServer = require('gulp-live-server');

const path = {
    build: {
        client: './build/client',
        server: './build/server'
    },
    src: {
        client: './client/dist/**/*.*',
        server: './server/dist/**/*.*'
    }
};

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

function buildServerAndClient() {
   return run('npm run build', {}).exec();
}

function copyClientBuildFiles() {
    return src(path.src.client).pipe(dest(path.build.client))
}

function copyServerBuildFiles() {
    return src(path.src.server).pipe(dest(path.build.server))
}

function runServer(cb) {
    const server = liveServer.new('build/server/main.js', {open: true}, true);
    server.start()
    cb()
}


function deleteBuildFiles() {
    return src('./build', {read: false, allowEmpty: true}).pipe(clean());
}

const copyBuildFiles = parallel(copyClientBuildFiles, copyServerBuildFiles);
const deleteNodeModules = parallel(deleteClientNodeModules, deleteServerNodeModules);
const reinstallNodeModules = series(deleteNodeModules, npmInstall)

exports.deleteNodeModules = deleteNodeModules
exports.reinstallNodeModules = series(deleteNodeModules, npmInstall);

const build = series(reinstallNodeModules, deleteBuildFiles, buildServerAndClient, copyBuildFiles, runServer);

exports.npmInstall = npmInstall
exports.copyBuildFiles = copyBuildFiles
exports.build = build;
exports.deleteNodeModules = deleteNodeModules
exports.reinstallNodeModules = reinstallNodeModules;
exports.runServer = runServer;

exports.default = build
