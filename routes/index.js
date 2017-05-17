var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;


/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  dbUrl = 'mongodb://localhost:27017/test'

  MongoClient.connect(dbUrl, function(err, db){
    var collection = db.collection('docs');

    collection.find({}).toArray(function(err, result){
      db.close();
        
	var numStudent = result.length;
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

	for(var i =0; i<numStudent;i++){
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
	}
	
	res.render('home',{
	IndenCount:indenCnt, NamingCount:namingCnt, CommentCount:commentCnt, WhiteSpaceCount:whiteCnt, CodeFormatCount:formatCnt, StatementCount:statementCnt, FunctionCount:funcCnt, ClassCount:classCnt, ModuleCount:moduleCnt,
	FilterArray:ErrorCountObj,FilterArrayLength:Object.keys(ErrorCountObj).length
      });
    });
  });
});

module.exports = router;
