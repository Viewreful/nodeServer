var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var async = require('async');
var fs = require('fs');
var _ = require('underscore');
/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  dbUrl = 'mongodb://localhost:27017/test'

  MongoClient.connect(dbUrl, function(err, db){
    var docsCollection = db.collection('docs');
    var urlsCollection = db.collection('urls');   
    var issueCollection = db.collection('issueDescription');

    var numStudent = 0;
    var indenCnt = 0, 
	namingCnt = 0, 
	commentCnt = 0,
	whiteCnt = 0, 
	formatCnt = 0, 
	statementCnt = 0, 
	funcCnt = 0, 
	classCnt = 0, 
	moduleCnt = 0;
    var ErrorCountObj= new Object();
    var StaticInfo = new Array();
    var StudentList = new Array();
    var UrlList = new Array();

    var StudentCode = new Array();
    var IssueCode = new Array();
    var IndividualInfo = new Array();

async.series([
  function(callback){
    docsCollection.find({}).toArray(function(err, result){
        IndividualInfo.push(result);
	numStudent = result.length;

	for(var i =0; i<numStudent;i++){
	  var tmp = new Object();
	  
	  tmp.id = result[i]._id;
	  tmp.cnt = result[i].Indentation.count + result[i].Naming.count + result[i].Comment.count+ result[i].WhiteSpace.count+result[i].CodeFormat.count+result[i].Statement.count+result[i].Function.count+result[i].Class.count+result[i].Module.count;
	  tmp.blockDepth = result[i].blockDepth;
	  tmp.maxBlockDepth = result[i].blockDepth;
	  tmp.numBlocks = result[i].numBlocks;
	  tmp.numCharacters = result[i].numCharacters;
	  tmp.numClasses = result[i].numClasses;
	  tmp.numComments = result[i].numComments;
	  tmp.numCommentsInline = result[i].numCommentsInline;
	  tmp.numFunctions = result[i].numFunctions;
	  tmp.numKeywords = result[i].numKeywords;
	  tmp.numLines = result[i].numLines;
	  tmp.numModuleDocStrings = result[i].numModuleDocStrings;
	  tmp.numSrcLines = result[i].numSrcLines;
	  tmp.numTokens = result[i].numTokens;
	  tmp.__main__ = result[i].__main__;
	  tmp.IndentationCount = result[i].Indentation.count;
	  tmp.NamingCount = result[i].Indentation.count;
	  tmp.CommentCount = result[i].Comment.count;
	  tmp.WhiteSpaceCount = result[i].WhiteSpace.count;
	  tmp.CodeFormatCount = result[i].CodeFormat.count;
	  tmp.StatementCount = result[i].Statement.count;
	  tmp.FunctionCount = result[i].Function.count;
	  tmp.ClassCount = result[i].Class.count;
	  tmp.ModuleCount = result[i].Module.count;
	  //function is dynamic.
//	  console.log(tmp);
	  StudentList.push(tmp);

	  indenCnt += result[i].Indentation.count;
	  namingCnt += result[i].Naming.count;
	  commentCnt += result[i].Comment.count;
	  whiteCnt += result[i].WhiteSpace.count;
	  formatCnt += result[i].CodeFormat.count;
	  statementCnt += result[i].Statement.count;
	  funcCnt += result[i].Function.count;
	  classCnt += result[i].Class.count;
	  moduleCnt += result[i].Module.count;
	  
	  
	  for(var j=0; j<result[i].Indentation.count;j++){
	    if(ErrorCountObj[result[i].Indentation.error[j].name] == null){ErrorCountObj[result[i].Indentation.error[j].name] = 0 }//initialize

	    ErrorCountObj[result[i].Indentation.error[j].name]++;
	  }
	  for(var j=0; j<result[i].Naming.count;j++){
	    if(ErrorCountObj[result[i].Naming.error[j].name] == null){ErrorCountObj[result[i].Naming.error[j].name] = 0 }//initialize

	    ErrorCountObj[result[i].Naming.error[j].name]++;
	  }
	  for(var j=0; j<result[i].Comment.count;j++){
	    if(ErrorCountObj[result[i].Comment.error[j].name] == null){ErrorCountObj[result[i].Comment.error[j].name] = 0 }//initialize

	    ErrorCountObj[result[i].Comment.error[j].name]++;
	  }
	  for(var j=0; j<result[i].WhiteSpace.count;j++){
	    if(ErrorCountObj[result[i].WhiteSpace.error[j].name] == null){ErrorCountObj[result[i].WhiteSpace.error[j].name] = 0 }//initialize

	    ErrorCountObj[result[i].WhiteSpace.error[j].name]++;
	  }
	  for(var j=0; j<result[i].CodeFormat.count;j++){
	    if(ErrorCountObj[result[i].CodeFormat.error[j].name] == null){ErrorCountObj[result[i].CodeFormat.error[j].name] = 0 }//initialize

	    ErrorCountObj[result[i].CodeFormat.error[j].name]++;
	  }
	  for(var j=0; j<result[i].Statement.count;j++){
	    if(ErrorCountObj[result[i].Statement.error[j].name] == null){ErrorCountObj[result[i].Statement.error[j].name] = 0 }//initialize

	    ErrorCountObj[result[i].Statement.error[j].name]++;
	  }
	  for(var j=0; j<result[i].Function.count;j++){
	    if(ErrorCountObj[result[i].Function.error[j].name] == null){ErrorCountObj[result[i].Function.error[j].name] = 0 }//initialize

	    ErrorCountObj[result[i].Function.error[j].name]++;
	  }
	  for(var j=0; j<result[i].Class.count;j++){
	    if(ErrorCountObj[result[i].Class.error[j].name] == null){ErrorCountObj[result[i].Class.error[j].name] = 0 }//initialize

	    ErrorCountObj[result[i].Class.error[j].name]++;
	  } 
	  for(var j=0; j<result[i].Module.count;j++){
	    if(ErrorCountObj[result[i].Module.error[j].name] == null){ErrorCountObj[result[i].Module.error[j].name] = 0 }//initialize

	    ErrorCountObj[result[i].Module.error[j].name]++;
	  }
	///////////////////////////////////////////////////////////////////////////////////////////////
	var tempCode = new Object();
	tempCode.id = tmp.id;
	tempCode.code = fs.readFileSync('./public/codePool/'+tmp.id+'/'+tmp.id+'.py','utf8');	
	StudentCode.push(tempCode);
	///////////////////////////////////////////////////////////////////////////////////////////////
	}
	for(var i =0; i < result.length; i++){
         for(var j = 0; j < result.length; j++){
          if(_.map(StudentList)[i].id == _.map(StudentCode)[j].id){
           _.map(StudentList)[i].code = _.map(StudentCode)[j].code;
           break;
          }
         }
        }
	callback();	
    });//docs.find end
  },//first callback end
  function(callback){
    urlsCollection.find({}).toArray(function(err,result){
	var numUrl = result.length;
	var tmp = new Object();

	for(var i =0; i < numUrl; i++){
	 for(var j = 0; j < numUrl; j++){
 	    if(_.map(StudentList)[i].id == result[j]._id){
	     _.map(StudentList)[i].url = result[j].url;
	     break;
	   } 
	  }
	}
	  
	callback();
    });  
  },//second callback end  
  function(callback){
    issueCollection.find({}).toArray(function(err,result){
	for(var i =0; i<Object.keys(ErrorCountObj).length;i++){
		var keys = Object.keys(ErrorCountObj);		
		var tmp = new Object();
		tmp.id = keys[i];
		tmp.count = Object.values(ErrorCountObj)[i];
		tmp.korean = _.values(result[0][keys[i]])[1];
		IssueCode.push(tmp);	
		
	}
	callback();
    });

  }//third callback end
], //task end

function(err){
    if(err) console.log(err);
    res.render('home',{
	IndenCount:indenCnt, 
	NamingCount:namingCnt, 
	CommentCount:commentCnt, 
	WhiteSpaceCount:whiteCnt, 
	CodeFormatCount:formatCnt, 
	StatementCount:statementCnt, 
	FunctionCount:funcCnt, 
	ClassCount:classCnt, 
	ModuleCount:moduleCnt,
	FilterArray:IssueCode,FilterArrayLength:Object.keys(ErrorCountObj).length, 
	StudentList:StudentList,StudentListLength:Object.keys(StudentList).length,
	UrlList:UrlList,
	IndividualInfo:IndividualInfo
    });
  });//async end

  });//connect end
});//get end

router.post('/CopyCheck',function(req,res){
	window.alert('hello');
});

module.exports = router;
