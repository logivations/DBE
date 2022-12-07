const {src, series, parallel, dest} = require('gulp');
const run = require('gulp-run');
const clean = require('gulp-clean');
const install = require('gulp-install');
const liveServer = require('gulp-live-server');

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

function runServer(cb) {
    const server = liveServer.new('server/dist/main.js', {open: true}, true);
    server.start()
    cb()
}

function deleteBuildFiles() {
    return src('./build', {read: false, allowEmpty: true}).pipe(clean());
}

const deleteNodeModules = parallel(deleteClientNodeModules, deleteServerNodeModules);
const reinstallNodeModules = series(deleteNodeModules, npmInstall)
const build = series(reinstallNodeModules, deleteBuildFiles, buildServerAndClient, runServer);

exports.deleteNodeModules = deleteNodeModules
exports.build = build;
exports.deleteNodeModules = deleteNodeModules;
exports.reinstallNodeModules = reinstallNodeModules;
exports.npmInstall = npmInstall;
exports.deleteBuildFiles = deleteBuildFiles;
exports.runServer = runServer;
exports.buildServerAndClient = buildServerAndClient;

exports.default = build;
