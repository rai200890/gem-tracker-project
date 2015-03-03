var gulp = require("gulp");

var karma = require("karma").server;
gulp.task("unit", function(done){
    karma.start({
        configFile: __dirname + "/karma.conf.js",
        singleRun: true
    }, done);
});

var protractor = require("gulp-protractor").protractor;
gulp.task("e2e", function(){
    gulp.src(["./spec/javascripts/e2e/*.js"])
        .pipe(protractor({
            configFile: "protractor.conf.js",
            args: []
        }))
        .on('error', function(e) { throw e });
});

var ngTemplates = require('gulp-ng-templates');

gulp.task('ngtemplates', function () {
    return gulp.src(['app/assets/templates/**/*.html', 'app/assets/templates/*.html'])
        .pipe(ngTemplates({
            filename: 'templates2.js',
            module: 'gemTrackerApp',
            options:  {
                url:    function(url) {
                    return url.replace('app/assets/templates/', '');
                }}})).pipe(gulp.dest('app/assets/javascripts'));
});

gulp.task("default", function(){

});
