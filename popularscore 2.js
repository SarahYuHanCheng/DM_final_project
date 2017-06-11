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


function google_trend(google_kw,the_kw,postday_3,postday){

		
		var googleTrends = require('google-trends-api');
					
		googleTrends.interestOverTime({keyword:google_kw, startTime: postday_3 ,endTime: postday}, 
				function(err, results){

  					if(err) {
  						console.error('there was an error!', err);
  						return 0;
  					}
  					else {	
  						
							var res_data=results.split(',"averages":[');
							
							var sp_res_data=res_data[1].split("]");
							var avg_score=sp_res_data[0];
							console.log('avg_score',avg_score);
							t_count++;
							if (t_count>Math.ceil(the_kw/5)) {
  							fs_write.open("/Users/sarahcheng/Documents/Master/2017Spring/Datamining/final_project/task2/T2-TRAIN/output.txt", 'a', 0666, 
    							function(err, fd){
    								if(err) {
											console.log('err',err);
										}else{
											console.log('avg_score',avg_score);
											fs_write.write(fd,avg_score+"\n");
											// check.open("/Users/sarahcheng/Desktop/check.txt",'w',0666,function(err, fd_check){
		    					// 				check.write(fd_check,"OK");
											// });

									});

							}

					}	
				
		});
					
				
					
		return 0;
		
}

function main(){

		var rawdata = readTextFile('file:///Users/sarahcheng/Documents/Master/2017Spring/Datamining/final_project/task2/T2-TRAIN/t2_train_data.txt');
	    var line = 7;
	    var flag=1;
	    // while(true){
	    	
	    	// if (flag) {
	    		// flag=0;
	    		fields = rawdata[line].split('" "');
	    		console.log('fields',fields);
	    		head=fields.slice(3,5);
				tags=fields[10].split(' ');
				var kws=head.concat(tags) ;
				postdate_1 = new Date((fields[fields.length-4]-72000)*1000);
				postdate_3 = new Date((fields[fields.length-4]-216000)*1000);
				
		    	// fs_write.open("/Users/sarahcheng/Documents/Master/2017Spring/Datamining/final_project/task2/T2-TRAIN/output.txt", 'a', 0666, 
		    	// 	function(err, fd){
		    			
						
						var kws_len=kws.length;
						// do {
						(function loop(i) {
						    if (i <= len-1 ) new Promise(resolve => {
						    	the_keys=google_kw.slice(i,i+5);
						        console.log('the_keys',the_keys);
						        google_trend(kws,kws_len,postdate_3,postdate_1);
						        setTimeout(resolve, Math.random() * 10);
						    }).then(loop.bind(null, i+5));
						})(0);
						flag=1;
						sleep(1000);
						// 	the_kw++;
						// }while(tags.length >the_kw)	
						// fs_write.write(fd,line+"\n");
					// 	if(err) {
					// 	console.log('err',err);
					// 	}else{
					// 		console.log('lineiiii',line);
							
					// 	}
					// });
	   			line++;
	   			// if(line==rawdata.length-1){break;}//if filetype is .rtf, the condition need to change to if(line==rawdata.length-1)
	   			// }
		// }
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
