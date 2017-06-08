
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
function google_trend(google_kw,the_kw,busy){
		var s_all_fields=5;
		if (!busy) {
			
			busy=true;
			var kw_sum=Number(0);
			console.log('google_kw[the_kw]=',google_kw[the_kw]);
			googleTrends.relatedTopics({keyword:google_kw[the_kw] , startTime: new Date('2015-02-15'),startTime: new Date('2015-03-14')}, 
					function(err, results){
	  					if(err) {
	  						console.error('there was an error!', err);
	  						return 0;
	  					}
	  					else {	
	  							
	  							if (results.length > 50) { 
		  							// var res_data=results.split('}');
		  							var res_data=results.split('{"rankedKeyword":[');
		  							
		  							var s_res_data=res_data[1].split('"},"');
		  							var s_res_value=s_res_data[1].split(':');
		  							var s_value=s_res_value[1].split(',');
		  							console.log('s_value=',s_value[0]);

		  						}
		  						s_all_fields=s_res_value[1];	
								console.log('s_all_fields=',s_all_fields);
								
								
						}	
						return s_all_fields;
			})
			
		}
		
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
                
			    	var line = 8;

			    	fields = lines[line].split('" "');
					google_kw= fields[10].split(' ');
					console.log('google_kw=',google_kw);
			    	all_fields=Number(0);
					the_kw=google_kw.length - 1;
					var isbusy=false;
					var g_res = google_trend(google_kw,the_kw,isbusy);
					console.log('g_res=',g_res);

            }
        }
    }
    rawFile.send(null);
}

readTextFile('file:///Users/sarahcheng/Documents/Master/2017Spring/Datamining/final_project/task2/T2-TRAIN/output.rtf');
