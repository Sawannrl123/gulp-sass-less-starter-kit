// Load Gulp
var gulp = require('gulp'),
    gutil = require('gulp-util'),
    plugins = require('gulp-load-plugins')({
        rename: {
            'gulp-live-server': 'serve'
        }
    });

// Start Watching: Run "gulp"
gulp.task('default', ['watch']);

// Run "gulp server"
gulp.task('server', ['squish-jquery', 'build-js', 'build-css', 'build-font', 'build-images', 'build-html', 'build-index', 'serve', 'watch']);

// Minify jQuery Plugins: Run manually with: "gulp squish-jquery"
gulp.task('squish-jquery', function () {
    return gulp.src('assets/js/libs/**/*.js')
        .pipe(plugins.uglify({
            output: {
                'ascii_only': true
            }
        }))
        .pipe(plugins.concat('jquery.plugins.min.js'))
        .pipe(gulp.dest('build/js'));
});

// Minify Custom JS: Run manually with: "gulp build-js"
gulp.task('build-js', function () {
    return gulp.src('assets/js/*.js')
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter('jshint-stylish'))
        .pipe(plugins.uglify({
            output: {
                'ascii_only': true
            }
        }))
        .pipe(plugins.concat('scripts.min.js'))
        .pipe(gulp.dest('build/js'));
});

gulp.task('build-font', function () {
    return gulp.src('assets/fonts/*')
        .pipe(gulp.dest('build/fonts'));
});

gulp.task('build-html', function () {
    return gulp.src('assets/pages/**/*.html')
        .pipe(gulp.dest('build/html/'));
});

gulp.task('build-index', function () {
    return gulp.src('*.html')
        .pipe(gulp.dest('build/'));
});

gulp.task('build-images', function () {
    return gulp.src('assets/images/**/*')
        .pipe(plugins.imagemin([
            plugins.imagemin.gifsicle({interlaced: true}),
            plugins.imagemin.jpegtran({progressive: true}),
            plugins.imagemin.optipng({optimizationLevel: 5}),
            plugins.imagemin.svgo({plugins: [{removeViewBox: true}]})
        ]))
        .pipe(gulp.dest('build/images'));
});

// Sass to CSS: Run manually with: "gulp build-css"
gulp.task('build-css', function () {
    return gulp.src('assets/sass/*.scss')
        .pipe(plugins.plumber())
        .pipe(plugins.sass())
        .on('error', function (err) {
            gutil.log(err);
            this.emit('end');
        })
        .pipe(plugins.autoprefixer({
            browsers: [
                    '> 1%',
                    'last 2 versions',
                    'firefox >= 4',
                    'safari 7',
                    'safari 8',
                    'IE 8',
                    'IE 9',
                    'IE 10',
                    'IE 11'
                ],
            cascade: false
        }))
        .pipe(plugins.cssmin())
        .pipe(gulp.dest('build/css')).on('error', gutil.log);
});

// Default task
gulp.task('watch', function () {
    gulp.watch('assets/js/libs/**/*.js', ['squish-jquery']);
    gulp.watch('assets/js/*.js', ['build-js']);
    gulp.watch('assets/sass/**/*.scss', ['build-css']);
    gulp.watch('assets/fonts/*', ['build-font']);
    gulp.watch('assets/pages/**/*.html', ['build-html']);
    gulp.watch('*.html', ['build-index']);
    gulp.watch('assets/images/**/*', ['build-images']);
});

// Folder "/" serving at http://localhost:8888
// Should use Livereload (http://livereload.com/extensions/)
gulp.task('serve', function () {
    var server = plugins.serve.static('/build', 3000);
    server.start();
    gulp.watch(['build/*'], function (file) {
        server.notify.apply(server, [file]);
    });
});
