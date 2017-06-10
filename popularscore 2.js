// var myArgs = process.argv.slice(2);

var head,tags,postdate_1,postdate_3 

const fs_write = require('fs');
const check = require('fs');
var in_cs=1;
var tag_score=0;
var head_score='head=';
var t_count=0;
var count=0;
var temp=-1;
main();


function tag_google_trend(google_kw,the_kw,postday_3,postday,fd_t){

		
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
		  							
									for (var i = 7 ; i >4; i--) {
			  							var a_daydata=res_data[res_data.length-i].split(',');//倒數三天的data
			  							var the_element=a_daydata[a_daydata.length-1].split(':');
			  							var the_value=the_element[1].split('"');
			  							kw_sum=kw_sum+Number(the_value[1]);
			  							
			  						}
			  						t_count++;
		  						}else{t_count++;}
								tag_score=tag_score+Number(kw_sum);
								kw_sum=0;
								
								if (t_count==google_kw.length) {
									fs_write.write(fd_t,'  alltags='+tag_score);
							 		check.open("/Users/sarahcheng/Desktop/check.txt",'w',0666,function(err, fd_check){
						    		check.write(fd_check,"OK");
									});

							}
															
								
						}	
						

			})
			
		// }
		// s_all_fields=1;
		return 1;
		
}
function main(){
var rawdata = readTextFile('file:///Users/sarahcheng/Documents/Master/2017Spring/Datamining/final_project/task2/T2-TRAIN/output.rtf');
	    var line = 9;
	    
	    do{
	    		fields = rawdata[line].split('" "');
	    		
	    		head=fields.slice(3,5);
	    		
				tags=fields[10].split(' ');
				postdate_1 = new Date((fields[fields.length-4]-72000)*1000);
				postdate_3 = new Date((fields[fields.length-4]-216000)*1000);

		    	fs_write.open("/Users/sarahcheng/Documents/Master/2017Spring/Datamining/final_project/task2/T2-TRAIN/output.txt", 'a', 0666, 
		    		function(err, fd){
						var h_the_kw=0;
						
						do {
								google_trend(head,h_the_kw,postdate_3,postdate_1,fd);
								h_the_kw++;

							}while(head.length >h_the_kw)	

						// the_kw=0;
						// do {
						// 	tag_google_trend(tags,the_kw,postdate_3,postdate_1,fd);
						// 	the_kw++;
						// }while(tags.length >the_kw)	
						fs_write.write(fd,"\n");

					});
   			line++;
		}while(line < rawdata.length)
}

	
function google_trend(google_kw_h,the_kw_h,postday_3,postday,fd_h){

		var googleTrends_h = require('google-trends-api');
		var kw_sum_h=Number(0);
		console.log('google_kw_h[the_kw]',google_kw_h[the_kw_h]);
		
		googleTrends_h.interestOverTime({keyword:'Fashion', startTime: new Date('2015-11-29') ,endTime: new Date('2015-12-29')}, 
				function(err, results_h){

  					if(err) {
  						console.error('there was an error!', err);
  						return 0;
  					}
  					else {	
  							
  				// 			if (results_h.length > 50) { 
  				// 				var res_data_h=results_h.split('}');
	  							
						// 		for (var i = 7 ; i >4; i--) {
		  		// 					var a_daydata_h=res_data_h[res_data_h.length-i].split(',');//倒數三天的data
		  		// 					var the_element_h=a_daydata_h[a_daydata_h.length-1].split(':');
		  		// 					var the_value_h=the_element_h[1].split('"');
		  		// 					kw_sum_h=kw_sum_h+Number(the_value_h[1]);
		  						
		  		// 				}
		  		// 				if (the_kw_h==1 && count==0) {
						// 			temp=kw_sum_h;

						// 		}else{
						// 			head_score=head_score+' '+kw_sum_h;	
						// 		}
						// 		count++;

		  		// 				if (count==2) {
		  		// 					if (temp>0) {
		  		// 						head_score=head_score+' '+temp;
		  		// 					}
		  		// 					fs_write.write(fd_h,'  '+head_score );
		  		// 				}
	  			// 			}
							
						// kw_sum_h=0;
														
							
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
    rawFile.send(null);
    return lines;
}



