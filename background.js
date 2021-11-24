'use strict';
var registered = null;
var ua = "ALLOW-FROM https://www.runt.com.co/consultaCiudadana/#/consultaVehiculo";
var entro="no"; //http://192.168.1.10:8181/SART-web/FormRunt.html
var pattern = "https://www.runt.com.co/consultaCiudadana/#/consultaVehiculo";

chrome.webRequest.onHeadersReceived.addListener(
  function (details) {
    for (var j = 0; j < details.responseHeaders.length; ++j) {
      if (details.responseHeaders[j].name.toLowerCase() == 'x-frame-options') {
        details.responseHeaders.splice(j, 1);
		
        return {
          responseHeaders: details.responseHeaders 
        };
      }
    }
  }, {
    urls: ["<all_urls>"]
  }, ["blocking", "responseHeaders"]);
function createTabData(id) {
  return {
    //'index': parseInt(document.getElementById('index_' + id).value),
    //'windowId': parseInt(document.getElementById('windowId_' + id).value),
    //'index': parseInt(document.getElementById('index_' + id).value),
	'url': 'https://192.168.1.10:8181/SART-WEB/preRevision.html', 	   
    'selected': true 
  }
}

function createTabDataMoto(id) {
  return {
    //'index': parseInt(document.getElementById('index_' + id).value),
    //'windowId': parseInt(document.getElementById('windowId_' + id).value),
    //'index': parseInt(document.getElementById('index_' + id).value),
	'url': 'https://192.168.1.10:8181/SART-WEB/preRevisionMoto.html',  
    'selected': true 
  }
}

function createTabDataNaturaleza(id) {
  return {
    //'index': parseInt(document.getElementById('index_' + id).value),
    //'windowId': parseInt(document.getElementById('windowId_' + id).value),
    //'index': parseInt(document.getElementById('index_' + id).value),	 	 
    'url': 'https://192.168.1.10:8181/SART-WEB/naturalezaRevision.html',
    'selected': true 
  }
}

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  try {   
   console.log(" onMenssge Listener ");
  var args;
      if(message.closeThis==1){
        args = createTabDataMoto('Moto');
	  }else{
		args = createTabData('Vehiculo');
	  }
      chrome.tabs.create(args);
	  chrome.tabs.remove(sender.tab.id);
	  if(message.closeThis==3){
		 chrome.tabs.remove(sender.tab.id);				
		 var args = createTabDataNaturaleza('new') 
         chrome.tabs.create(args);	 
	  }	  
	} catch (e) {
      alert(e);
    }
});
//C:\Users\Tablet\AppData\Local\Google\Chrome\Application\chrome.exe --user-data-dir="C://Chrome d session" --disable-web-security --unsafely-treat-insecure-origin-as-secure=http://192.168.1.10:8181/SART-WEB