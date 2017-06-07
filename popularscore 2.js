
const googleTrends = require('google-trends-api');
const fs_write = require('fs');
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}
function readTextFile(file)
{
	var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                var lines = allText.split('\n');
                var data_scores;
			    for(var line = 8; line < lines.length; line++){
			    	var fields = lines[line].split('" "');
			    	var google_kw= [fields[3],fields[4]];// subcategory, concept, alltag
			    	google_kw=google_kw+','+fields[10].split(' ');
			    	google_kw=google_kw.split(',');
			    	console.log('google_kw.length=',google_kw.length);
			    	var all_field_sum=Number(0);
			    	for (var the_kw = google_kw.length - 1; the_kw >= 0; the_kw--) {
			    		var kw_sum=Number(0);
			    		googleTrends.interestOverTime({keyword:google_kw[the_kw] , startTime: new Date('2015-02-15'),startTime: new Date('2015-03-14')}, 
			    				function(err, results){
				  					if(err) console.error('there was an error!', err);
				  					else {	
				  							if (results.length > 50) { 
					  							var res_data=results.split('}');
												for (var i = 7 ; i >4; i--) {
						  							var a_daydata=res_data[res_data.length-i].split(',');//倒數三天的data
						  							var the_element=a_daydata[a_daydata.length-1].split(':');
						  							var the_value=the_element[1].split('"');
						  							kw_sum=kw_sum+Number(the_value[1]);
						  							console.log('the_value[1]=',the_value[1]);

						  						}
					  						}
					  				// 		fs_write.open("/Users/sarahcheng/Documents/Master/2017Spring/Datamining/final_project/task2/T2-TRAIN/output.txt", 'a', 0666, function(err, fd){
											// 	fs_write.write(fd,kw_sum + "\n");
											// });
											console.log('kw_sum=',kw_sum);
									}	
						})
						// all_field_sum+=kw_sum;
						// console.log('all_field_sum=',all_field_sum);
			    	}
			      	
			      	// data_scores = ' '+all_field_sum;
			      	// console.log('data_scores=',data_scores);
			    }

            }
        }
    }
    rawFile.send(null);
}

readTextFile('file:///Users/sarahcheng/Documents/Master/2017Spring/Datamining/final_project/task2/T2-TRAIN/output.rtf');



