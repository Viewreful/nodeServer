var mongoose = require('mongoose');
var Schema = monoose.Schema;

var pyresultSchema = new Schema({
	blockDepth: Number,
	maxBlcokDepth: Number,
	numBlocks: Number,
	numCharacters: Number,
	numClasses: Number,
	numComments: Number,
	numCommentsInline: Number,
	numFunctions: Number,
	numKeywords: Number,
	numLines: Number,
	numModuleDocStrings: Number,
	numSrcLines: Number,
	numTokens: Number,
	__main__: Number,
	bfs: Number,
	dfs: Number,
	
	
