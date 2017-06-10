var myArgs = process.argv.slice(2);

var head=myArgs.slice(0,2);
var tags=myArgs.slice(2,myArgs.length-1);

var postdate = new Date((myArgs[myArgs.length-1]-72000)*1000);
var postdate_3 = new Date((myArgs[myArgs.length-1]-216000)*1000);

const fs_write = require('fs');
const h_fs_write = require('fs');
const f_w= require('fs');
var in_cs=1;
var tag_score='tags';
var head_score='head';
main();


function tag_google_trend(google_kw,the_kw,postday_3,postday){

		
		in_cs=1;
		var googleTrends = require('google-trends-api');
		var s_all_fields=0;
		// if (!busy) {
			
			// busy=true;
			var kw_sum=Number(0);
			
			googleTrends.interestOverTime({keyword:google_kw[the_kw], startTime: postday_3 ,endTime: postday}, 
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
			  							var the_value=the_element[1].split('"');
			  							kw_sum=kw_sum+Number(the_value[1]);
			  							
			  						}
		  						}
		  						
								console.log('kw_sum',kw_sum);
								
								tag_score=tag_score+' '+kw_sum;
								// tag_score=tag_score+Number(kw_sum);
								
								kw_sum=0;
								console.log('the_kw=',the_kw);
								if (the_kw==google_kw.length-1) {
									
								fs_write.open("/Users/sarahcheng/Documents/Master/2017Spring/Datamining/final_project/task2/T2-TRAIN/output.txt", 'a', 0666, function(err, fd){
									fs_write.write(fd,tag_score + "===");
									
								});	


							}
															
								
						}	
						

			})
			
		// }
		// s_all_fields=1;
		return 1;
		
}
function main(){
			    
	    // do{
				the_kw=0;
				do {
					tag_google_trend(tags,the_kw,postdate_3,postdate);
					the_kw++;
				}while(tags.length >the_kw)	
				
				sleep(500);
				var h_the_kw=0;

				do {
						google_trend(head,h_the_kw,postdate_3,postdate);
						h_the_kw++;

					}while(head.length >h_the_kw)
		// }while()
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}
	
function google_trend(google_kw_h,the_kw_h,postday_3,postday){

		var googleTrends_h = require('google-trends-api');
		var kw_sum_h=Number(0);
		
		googleTrends_h.interestOverTime({keyword:google_kw_h[the_kw_h], startTime: postday_3 ,endTime: postday}, 
				function(err, results_h){

  					if(err) {
  						console.error('there was an error!', err);
  						return 0;
  					}
  					else {	
  							
  							if (results_h.length > 50) { 
  								var res_data_h=results_h.split('}');
  								console.log('google_kw_h[the_kw_h]',google_kw_h[the_kw_h]);
	  							
								for (var i = 7 ; i >4; i--) {
		  							var a_daydata_h=res_data_h[res_data_h.length-i].split(',');//倒數三天的data
		  							var the_element_h=a_daydata_h[a_daydata_h.length-1].split(':');
		  							var the_value_h=the_element_h[1].split('"');
		  							kw_sum_h=kw_sum_h+Number(the_value_h[1]);
		  						
		  						}
	  						}
	  						
							console.log('kw_sum_h',kw_sum_h);
							
							head_score=head_score+' '+kw_sum_h;
							// head_score=head_score+Number(kw_sum_h);
							
							kw_sum_h=0;
							console.log('the_kw_h=',the_kw_h);
							if (the_kw_h==google_kw_h.length-1) {
								
							fs_write.open("/Users/sarahcheng/Documents/Master/2017Spring/Datamining/final_project/task2/T2-TRAIN/output.txt", 'a', 0666, function(err, fd_h){
								fs_write.write(fd_h,head_score + "--");
								
							});	


						}
														
							
					}	
					

		})
		return 1;
		
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
}





