
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
var unix_timestamp='1446016778';

var date = new Date(unix_timestamp*1000);
var tag_score=0;

function google_trend(google_kw,the_kw,busy){
	
		var s_all_fields=1;
		if (!busy) {
			
			busy=true;
			var kw_sum=Number(0);
			
			googleTrends.interestOverTime({keyword:google_kw[the_kw], startTime: date ,endTime: new Date('2015-11-29')}, 
					function(err, results){

	  					if(err) {
	  						console.error('there was an error!', err);
	  						return 0;
	  					}
	  					else {	
	  							
	  							if (results.length > 50) { 
	  								var res_data=results.split('}');
	  								console.log('google_kw[the_kw]',google_kw[the_kw]);
		  							
									for (var i = 7 ; i >4; i--) {
			  							var a_daydata=res_data[res_data.length-i].split(',');//倒數三天的data
			  							var the_element=a_daydata[a_daydata.length-1].split(':');
			  							var the_value=the_element[1].sp｀lit('"');
			  							kw_sum=kw_sum+Number(the_value[1]);
			  						}
		  						}
		  						
								
								tag_score=tag_score+' '+kw_sum;
								kw_sum=0;
															
								
						}	
						if (the_kw==google_kw.length) {
								fs_write.open("/Users/sarahcheng/Documents/Master/2017Spring/Datamining/final_project/task2/T2-TRAIN/output.txt", 'a', 0666, function(err, fd){
									fs_write.write(fd,tag_score + "\n");
								});	
							}

			})
			
		}

		return s_all_fields;
	    

		
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
					the_kw=0;
					var isbusy=false;

					var g_res =1;
					do {
						
						if(g_res==1){
							g_res=0;
							g_res= google_trend(google_kw,the_kw,isbusy);
							the_kw++;
							
						}
					}while(google_kw.length >the_kw)
					
            }
        }
    }
    rawFile.send(null);
}

readTextFile('file:///Users/sarahcheng/Documents/Master/2017Spring/Datamining/final_project/task2/T2-TRAIN/output.rtf');
