var gulp = require('gulp');
var cat = require('gulp-concat');
var server = require('gulp-server-livereload');
var inject = require('gulp-inject');

var paths = {
	scripts: ['src/js/*.js'],
	styles: ['src/css/*.css']
};

var indexPage = gulp.src('./index.html');

gulp.task('index-debug', function() {
	var sources = gulp.src(['src/js/*.js', 'src/css/*.css'], { read: false });

	return indexPage.pipe(inject(sources))
		.pipe(gulp.dest('.'));
});

gulp.task('watch', function() {
	gulp.watch(paths.scripts, ['concat-scripts']);
	gulp.watch(paths.styles, ['concat-styles']);
});

gulp.task('webserver', function() {
	gulp.src('.')
		.pipe(server({
			livereload: true,
		    directoryListing: false,
			open: false,
			enable: true,
			filter: function(filePath, cb) {
				cb( !(/node_module|src/.test(filePath)) )
			}
		}));
});

gulp.task('concat-scripts', function() {
	return gulp.src(paths.scripts)
		.pipe(cat('all.js'))
		.pipe(gulp.dest('build'));
});

gulp.task('concat-styles', function() {
	return gulp.src(paths.styles)
		.pipe(cat('all.css'))
		.pipe(gulp.dest('build'));
});

gulp.task('concat', ['concat-scripts', 'concat-styles']);

gulp.task('index-production', function() {
	var sources = gulp.src(['build/*.css', 'build/*.js'], { read: false });

	return indexPage.pipe(inject(sources))
		.pipe(gulp.dest('.'));
});

gulp.task('default', ['watch', 'index-debug', 'webserver']);
gulp.task('production', ['concat-scripts', 'concat-styles', 'index-production']);
