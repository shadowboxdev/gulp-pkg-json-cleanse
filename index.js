'use strict';
const through = require('through2');
const PluginError = require('plugin-error');

module.exports = options => {
	options = options || {};

	return through.obj(function (file, enc, cb) {
		if (file.isNull()) {
			cb(null, file);
			return;
		}

		if (file.isStream()) {
			cb(new PluginError('gulp-pkg-json-cleanse', 'Streaming not supported'));
			return;
		}

		try {
			const pkgData = require(file.path);

			options.remove.forEach(opt => {
				delete pkgData[opt];
			});
			console.log(pkgData.toString());

			file.contents = Buffer.from(JSON.stringify(pkgData));
			this.push(file);
		} catch (err) {
			this.emit('error', new PluginError('gulp-pkg-json-cleanse', err));
		}

		cb();
	});
};
