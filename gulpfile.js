const {src, series, dest} = require('gulp');
const run = require('gulp-run');
const clean = require('gulp-clean');

//NPM tasks

async function deleteNodeModules(cb) {
    await src('./client/node_modules', {read: false}).pipe(clean());
    await src('./server/node_modules', {read: false}).pipe(clean());
    cb();
}

async function npmInstall(cb) {
    return await src('./client').pipe(run('npm install --ws'));
    // await run('npm install --ws', {}).exec();
    cb();
}
function npmCi(cb) {
    run('npm ci --ws', {}).exec(null, cb);
}

// SRC tasks


function build(cb) {
    run('npm build --ws', {}).exec(null, cb);
}

function productionBuild() {

}


// gulp.task('default', ['build'])

exports.deleteNodeModules = deleteNodeModules
exports.npmInstall = npmInstall
exports.default = npmInstall;