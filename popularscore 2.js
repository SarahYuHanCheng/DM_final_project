var myArgs = process.argv.slice(2);

var google_kw=myArgs.slice(0,myArgs.length-1);

var postdate = new Date((myArgs[myArgs.length-1]-72000)*1000);
var postdate_3 = new Date((myArgs[myArgs.length-1]-216000)*1000);

const fs_write = require('fs');
const check = require('fs');

var tag_score=0;
var t_count=0;
main();

		
function main(){
		
		fs_write.open("/Users/sarahcheng/Documents/Master/2017Spring/Datamining/final_project/task2/T2-TRAIN/output.txt", 'a', 0666, 
    		function(err, fd_t){
				
				var the_kw=0;					
				var googleTrends = require('google-trends-api');
		
			var kw_sum=Number(0);
			
			googleTrends.interestOverTime({keyword:google_kw[the_kw], startTime: postdate_3 ,endTime: postdate}, 
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
		  						}
								
								if (t_count==1) {
									fs_write.write(fd_t,kw_sum+'\n');
							 		check.open("/Users/sarahcheng/Desktop/check.txt",'w',0666,function(err, fd_check){
						    		check.write(fd_check,"OK");
									});

							}	
						}	
			})

			});
}


