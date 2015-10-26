var gulp = require('gulp');
var concat = require('gulp-concat');
var path = {
    src: {
        stylesheets: {
            vendor: [
                'node_modules/bootstrap/dist/css/bootstrap.min.css',
                'node_modules/bootstrap/dist/css/bootstrap-theme.min.css'
            ],
            custom: [
                'styles/main_tabs.css'
            ]
        },
        scripts: {
            vendor: [
                'node_modules/jquery/dist/jquery.min.js',
                'node_modules/bootstrap/dist/js/bootstrap.min.js'
            ]
        },
        fonts: 'node_modules/bootstrap/dist/fonts/*.{eot,svg,ttf,woff,woff2}'
    },
    dest: {
        stylesheets: {
            vendor: {
                dir: 'build/stylesheets',
                file: 'vendor.css'
            },
            custom: {
                dir: 'build/stylesheets',
                file: 'custom.css'
            }
        },
        scripts: {
            vendor: {
                dir: 'build/scripts',
                file: 'vendor.js'
            }
        },
        fonts: 'build/fonts'
    }
};


gulp.task('stylesheets_vendor', function () {
    gulp.src(path.src.stylesheets.vendor)
        .pipe(concat(path.dest.stylesheets.vendor.file))
        .pipe(gulp.dest(path.dest.stylesheets.vendor.dir));
});

gulp.task('stylesheets_custom', function () {
    gulp.src(path.src.stylesheets.custom)
        .pipe(concat(path.dest.stylesheets.custom.file))
        .pipe(gulp.dest(path.dest.stylesheets.custom.dir));
});

gulp.task('scripts_vendor', function () {
    gulp.src(path.src.scripts.vendor)
        .pipe(concat(path.dest.scripts.vendor.file))
        .pipe(gulp.dest(path.dest.scripts.vendor.dir));
});

gulp.task('fonts', function () {
    gulp.src(path.src.fonts).pipe(gulp.dest(path.dest.fonts));
});

gulp.task('default', [
    'stylesheets_vendor',
    'stylesheets_custom',
    'scripts_vendor',
    'fonts'
]);
