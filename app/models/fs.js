/**
 * Created by tung on 21/05/17.
 */

'use strict';
const fs = require('fs');
let bots;
let admins;

/**
 * Read the bot list and admin list store in list.
 * @param fPathe
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
	bots:bots,
	admins:admins
};