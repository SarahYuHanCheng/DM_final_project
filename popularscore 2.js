function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

var myArgs = process.argv.slice(2);

var head,tags,postdate_1,postdate_3;

const fs_write = require('fs');


var t_count=0;
var count=0;
var temp=-1;
var the_keys;

main();


function google_trend(google_kw,the_len,postday_3,postday,fd){

		
		var googleTrends = require('google-trends-api');
		var avg_score;			
		googleTrends.interestOverTime({keyword:'dre', startTime: postday_3 ,endTime: postday}, 
				function(err, results){
  					if(err) {
  						console.error('there was an error!', err);
  						return 0;
  					}
  					else {	
  						
							var res_data=results.split(',"averages":[');
							var sp_res_data=res_data[1].split("]");
							// if (t_count>Math.ceil(the_len/5)) {
  							// fs_write.open("/Users/sarahcheng/Documents/Master/2017Spring/Datamining/final_project/task2/T2-TRAIN/output.txt", 'a', 0666, 
    					// 		function(err, fd){
    					// 			if(err) {
									// 		console.log('err',err);
									// 	}else{
											console.log('results',results);
											// fs_write.write(fd,sp_res_data[0]+' ');
											// check.open("/Users/sarahcheng/Desktop/check.txt",'w',0666,function(err, fd_check){
		    					// 				check.write(fd_check,"OK");
										// }

									// });

								// });
							// }
					}

				
		});
					
				
					
		return 0;
		
}
the_keys='codyaugustinephotographycatdogeggmi';
var kws_len=the_keys.length;
function main(){

		// var rawdata = readTextFile('file:///Users/sarahcheng/Documents/Master/2017Spring/Datamining/final_project/task2/T2-TRAIN/tags.txt');
	 //    var line = 7;
	 //    var flag=1;
	 //    		// fields = rawdata.split('\n');
	 //    		// console.log('fields',fields);
	 //   //  		head=fields.slice(3,5);
		// 		// tags=fields[10].split(' ');
		// 		// var kws=head.concat(tags) ;
		// 		postdate_1 = new Date('2017-06-09');//((fields[fields.length-4]-72000)*1000);
		// 		postdate_3 = new Date('2017-06-06');//((fields[fields.length-4]-216000)*1000);
				
		// 		var kws_len=rawdata.length;
				fs_write.open("/Users/sarahcheng/Documents/Master/2017Spring/Datamining/final_project/task2/T2-TRAIN/tags_score.txt", 'a', 0666, 
    					function(err, fd){
		// 					(function loop(i) {
		// 					    if (i <= kws_len-1 ) new Promise(resolve => {
		// 					    	the_keys=rawdata.slice(i,i+5);
							        google_trend(the_keys,kws_len,postdate_3,postdate_1,fd);
// 							        setTimeout(resolve, Math.random() * 500);
// 							    }).then(loop.bind(null, i+5));
// 							})(0);	
						});
}

function readTextFile(file)
{
	var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    var rawFile = new XMLHttpRequest();
   	rawFile.open("GET", file, false);
    var all_fields=Number(0);
    var allText,lines,fields,google_kw,google_kw_split,data_scores;
    var flag;
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                allText = rawFile.responseText;
                lines = allText.split('\n');
                
            }
        }
    }
    rawFile.send(null);
    return lines;
}


