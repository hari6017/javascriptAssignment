var fs=require("fs");
const readline = require('readline');

var ind1=fs.createWriteStream('indiafile.json');
ind1.readable=true;
ind1.writable=true;

var asia1=fs.createWriteStream('asiafile.json');
asia1.readable=true;
asia1.writable=true;




//createInterface takes single line as input each time from file
//start of readline function
const rl = readline.createInterface({
    input: fs.createReadStream('Indicators.csv')
  });
  var colname=[];
  var line1=[];
  var output=[];
  var bar1=[];
  var bar2=[];
  var k=0,l;
  var asiancountries = ["Afghanistan", "Bahrain", "Bangladesh", "Bhutan", "Myanmar", "Cambodia", "China", "India", "Indonesia", "Iraq", "Israel", "Japan", "Jordan", "Kazakhstan", "Lebanon", "Malaysia", "Maldives", "Mongolia", "Nepal",
  "Oman", "Pakistan", "Philippines", "Qatar", "Saudi Arabia", "Singapore", "Sri Lanka", "Syrian Arab Republic", "Tajikistan", "Thailand", "Timor-Leste", "Turkmenistan", "United Arab Emirates", "Uzbekistan", "Vietnam", "Yemen"];
rl.on('line', function (line){
    if(k==0)
    {
      colname=line.split(',');
      k=k+1;
    }
//end of if condition used for headers
    else{
      var lineInfo=line.split(",");

      if(lineInfo[0]=="India")
			{
        if(lineInfo[2]=="Urban population (% of total)" || lineInfo[2]=="Rural population (% of total population)")
        {
          if(lineInfo[4]>=1960&&lineInfo[4]<=2015)
          {
            bar1.push({"IndicatorName":lineInfo[2],"year":lineInfo[4],"value":parseFloat(lineInfo[5])});
          }
        }
      }

      for(l=0;l<asiancountries.length;l++)
				{
        if(lineInfo[0]==asiancountries[l])
					{
          if(lineInfo[2]=="Urban population" || lineInfo[2]=="Rural population")
            {
              if(lineInfo[4]>=1960 && lineInfo[4]<=2015)
              {

                bar2.push({"CountryName":lineInfo[0], "IndicatorName":lineInfo[2],"year":lineInfo[4],"value":lineInfo[5]});

              }
            }
          }
        }
      }
//end of else

      });
		//end of on line event

var arr6=[];
var sum1=0;
var sumu=0;
var sumr=0;
          var urbanAndRural=[];
          var sum=0;
					var obj1={};
          rl.on('close',() =>
         {
					for(y=1960;y<=2015;y++)
				  	{
      			for(k=0;k<asiancountries.length;k++)
							{
        			for(i=0;i<bar2.length-1;i+=2)
								{
      						if(bar2[i].CountryName==asiancountries[k])
										{
											if(bar2[i].year==y)
												{
                              sumu=sumu+parseFloat(bar2[i].value);
                              sumr=sumr+parseFloat(bar2[i+1].value);
      										sum=sum+(parseFloat(bar2[i].value))+(parseFloat(bar2[i+1].value));
      										urbanAndRural.push({CountryName:bar2[i].CountryName,value:sum});
															urbanAndRural.sort(function(a,b){
  															return b.value-a.value;
						});
      											obj1[bar2[i].year]=urbanAndRural;

                            sum1=sum1+sum;
																sum=0;



     										}

										}
 								}
     					}
        urbanAndRural=[];
arr6.push({"year":y,"urban":sumu,"rural":sumr});
            sumu=0;
sumr=0;
   				}
console.log(arr6);
//console.log(bar1);
//console.log(obj1);


      obj2={};

obj2.India= bar1;

       //console.log(obj1);
ind1.write(JSON.stringify(bar1));
asia1.write(JSON.stringify(arr6));

        });
//end of close event
