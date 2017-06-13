var gulp = require('gulp'),
	gutil = require('gulp-util'),
	concat = require('gulp-concat'),
	connect = require('gulp-connect'),
	connectPHP = require('gulp-connect-php'),
	compass = require('gulp-compass'),
	gulpif = require('gulp-if'),
	uglify = require('gulp-uglify'),
	minifyCSS = require('gulp-minify-css'),
	imagemin = require('gulp-imagemin'),
	pngcrush = require('imagemin-pngcrush'),
	concatCss = require('gulp-concat-css'),
	minifyJSON = require('gulp-jsonminify'),
	babel = require('gulp-babel');

var env,
	jsSrc,
	sassSrc,
	jsonSrc,
	outputDir

env = process.env.NODE_ENV || 'development';

if (env === 'development') {
	outputDir = 'builds/development/';
} else {
	outputDir = 'builds/production/';
}

jsSrc = ['components/scripts/*.js'];
sassSrc = ['components/sass/style.scss'];
jsonSrc = ['builds/development/js/*.json'];

gulp.task('js', function() {
	gulp.src(jsSrc)
		.pipe(concat('script.js'))
		.pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulpif(env === 'production', uglify()))
		.pipe(gulp.dest(outputDir + 'js'))
		.pipe(connect.reload())
});

gulp.task('compass', function() {
	gulp.src(sassSrc)
		.pipe(compass({
			sass: 'components/sass/',
			image: outputDir + 'images',
			style: 'expanded'
		})
		.on('error', gutil.log))
		.pipe(gulpif(env === 'production', minifyCSS()))
		.pipe(gulp.dest(outputDir + 'css'))
		.pipe(connect.reload())
});

gulp.task('json', function() {
	gulp.src(jsonSrc)
		.pipe(gulpif(env === 'production', minifyJSON()))
		.pipe(gulpif(env === 'production', gulp.dest(outputDir + 'js')))
		.pipe(connect.reload())
});

gulp.task('watch', function() {
	gulp.watch(jsSrc, ['js']);
	gulp.watch('components/sass/*.scss', ['compass']);
	gulp.watch('builds/development/*.php', ['php']);
	gulp.watch('builds/development/images/**/*.*', ['images']);
	gulp.watch('builds/development/snippets/*.php', ['phpSnippets']);
	gulp.watch(jsonSrc, ['json']);
});

gulp.task('connect', function() {
	connect.server({
		root: outputDir,
		livereload: true
	});
});

gulp.task('connectPHP', function() {
	connectPHP.server({
		base: outputDir,
		keepalive: true,
		hostname: 'localhost',
		port: 9999,
		open: false,
		livereload: true
	});
});

gulp.task('php', function() {
	gulp.src('builds/development/*.php')
		.pipe(gulpif(env === 'production', gulp.dest(outputDir)))
		.pipe(connect.reload())
});

gulp.task('phpSnippets', function() {
	gulp.src('builds/development/snippets/*.php')
		.pipe(gulpif(env === 'production', gulp.dest(outputDir + 'snippets')))
		.pipe(connect.reload())
});

gulp.task('images', function() {
	gulp.src('builds/development/images/**/*.*')
		.pipe(gulpif(env === 'production', imagemin({
			progressive: true,
			svgoPlugins: [{ removeViewBox: false }],
			use: [ pngcrush() ]
		})))
		.pipe(gulpif(env === 'production', gulp.dest(outputDir + 'images')))
		.pipe(connect.reload())
});

gulp.task('build', ['php', 'phpSnippets', 'js', 'compass', 'json', 'images']);
gulp.task('default', ['build', 'connectPHP', 'connect', 'watch']);

