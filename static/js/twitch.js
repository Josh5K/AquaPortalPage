setTimeout(function() { load(); }, 5000);

function loadJSON(callback) {   

    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', '../twitch.json', true);
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
 }

 function load() {
    loadJSON(function(response) {
       var stream = JSON.parse(response);
       
       if(stream.stream.viewers != undefined)
       {
        var offline = document.getElementById('stream');
        var online = document.createElement('p');
        online.innerHTML = 'AquaFPS\' stream is live with ' + stream.stream.viewers + ' viewers';
        offline.parentNode.replaceChild(online, offline);
       }
    });
   }
