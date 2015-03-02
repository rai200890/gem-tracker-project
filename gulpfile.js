var gulp = require("gulp");
var karma = require("karma").server;


gulp.task("unit", function(done){
    karma.start({
        configFile: __dirname + "/karma.conf.js",
        singleRun: true
    }, done);
});

gulp.task("e2e", function(){

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
