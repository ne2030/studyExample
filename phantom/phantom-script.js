var page = require('webpage').create();

page.onConsoleMessage = function(msg) {
  console.log('CONSOLE: ' + msg);
};

page.onError = function(msg, trace) {
  var msgStack = ['ERROR: ' + msg];
  if (trace && trace.length) {
    msgStack.push('TRACE:');
    trace.forEach(function(t) {
      msgStack.push(' -> ' + t.file + ': ' + t.line + (t.function ? ' (in function "' + t.function +'")' : ''));
    });
  }
  console.error(msgStack.join('\n'));
};

page.onResourceError = function(resourceError) {
  console.log('Unable to load resource (#' + resourceError.id + 'URL:' + resourceError.url + ')');
  console.log('Error code: ' + resourceError.errorCode + '. Description: ' + resourceError.errorString);
};

page.onResourceTimeout = function(request) {
    console.log('Response (#' + request.id + '): ' + JSON.stringify(request));
};

page.open('https://www.skyscanner.co.kr/transport/flights/icn/jngo/170503/170507/airfares-from-seoul-incheon-int-l-to-nagoya-in-may-2017.html#results', function(status) {
  console.log(status);
  if (status !== 'success') {
    console.log('Unable to access network');
    phantom.exit();
  } else {
    console.log('start');
    var script = "function(){setTimeout(function(){console.log(document.getElementsByTagName('h2')[0])}, 2000)}";
    page.evaluateJavaScript(script);
    console.log('async task');
    setTimeout(function(){phantom.exit();}, 3000);
  }

});
// document.getElementsByClassName('searchp-summary-places')[0].textContent;
// var page = require('webpage').create();
// console.log('The default user agent is ' + page.settings.userAgent);
// page.settings.userAgent = 'SpecialAgent';
// page.open('http://www.httpuseragent.org', function(status) {
//   if (status !== 'success') {
//     console.log('Unable to access network');
//   } else {
//     var ua = page.evaluate(function() {
//       return document.getElementById('myagent').textContent;
//     });
//     console.log('test: ' + ua);
//   }
//   phantom.exit();
// });
