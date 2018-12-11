import path from 'path';
import test from 'ava';
import Vinyl from 'vinyl';
import pEvent from 'p-event';
import fn from '.';

const pkgJsonPath = path.resolve(__dirname, 'test-data/package.json');
const pkgJsonData = require(pkgJsonPath);
const pkgJsonStr = JSON.stringify(pkgJsonData);

test(async t => {
	const stream = fn({
		remove: [
			'devDependencies'
		]
	});
	const promise = pEvent(stream, 'data');

	stream.end(new Vinyl({
		base: __dirname,
		path: path.join(__dirname, 'package.json'),
		contents: Buffer.from(pkgJsonStr)
	}));

	const file = await promise;

	console.log('here', file.contents.toString('utf8'));

	t.is(file.contents.toString('utf8'), pkgJsonStr);
});
