// filename : scraping.js
// author : saltfactory@gmail.com

var cheerio = require('cheerio');
var request = require('request');

var url = 'https://www.skyscanner.co.kr/transport/flights/icn/oka/170503/170506/airfares-from-seoul-incheon-int-l-to-okinawa-naha-in-may-2017.html?adults=2&children=0&adultsv2=2&childrenv2=&infants=0&cabinclass=economy&rtn=1&preferdirects=false&outboundaltsenabled=false&inboundaltsenabled=false&ref=day-view#results';
request(url, function(error, response, html){
	if (error) {throw error;}

	console.log (html);

});
