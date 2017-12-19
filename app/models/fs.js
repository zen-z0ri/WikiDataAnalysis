/**
 * Created by tung on 21/05/17.
 */

import fs from 'fs';

let bots;
let admins;

/**
 * Read the bot list and admin list store in list.
 * @param filePath
 */
const readList = (filePath) => {
	return fs.readFileSync(filePath, 'utf8', (err, fileData) => {
		if (err) console.error(filePath+'does not exist');
		return fileData;
	});
}
bots = readList('bot.txt').toString().trim().split('\n');
admins = readList('admin.txt').toString().trim().split('\n');

module.exports={
	bots,
	admins
};