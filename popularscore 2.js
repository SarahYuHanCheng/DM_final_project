
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
function google_trend(google_kw,the_kw){
		var the_flag=false;
		var kw_sum=Number(0);
		console.log('google_kw[the_kw]=',google_kw[the_kw]);
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

							all_fields=kw_sum;
							console.log('all_fields=',all_fields);
							the_flag=true;
							console.log('the_flag',the_flag);
							return the_flag;
					}	
		})
	
}
function readTextFile(file)
{
	var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    var rawFile = new XMLHttpRequest();
   	rawFile.open("GET", file, false);
    var all_fields=Number(0);
    var allText,lines,fields,google_kw,google_kw_split,data_scores;
    var flag=true;
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                allText = rawFile.responseText;
                lines = allText.split('\n');
                
			    for(var line = 8; line < lines.length; line++){

			    	fields = lines[line].split('" "');
					google_kw= fields[10].split(' ');
					console.log('google_kw=',google_kw);
			    	all_fields=Number(0);
					the_kw=google_kw.length - 1;

					while(flag && (the_kw>=0)){
						flag=false;
						flag=google_trend(google_kw,the_kw);
						the_kw--;
						console.log('the_kw',the_kw);
					}

			    }

            }
        }
    }
    rawFile.send(null);
}

readTextFile('file:///Users/sarahcheng/Documents/Master/2017Spring/Datamining/final_project/task2/T2-TRAIN/output.rtf');



