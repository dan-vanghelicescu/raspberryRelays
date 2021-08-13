var states = '- '.repeat(8).trim().split(' ');
var relays = [{id: 2,name: "G2"}, {id: 3, name: "G3"}, {id: 4, name: "G4"}, {id: 7, name: "Pompa"}, {id: 8, name: "G-Light"}];

function draw()
{
    var html = "";
    relays.forEach(function(item){html += rowhtml(item.id, item.name);});
    document.getElementById("main").innerHTML = html;
}

function refresh()
{
    $.getJSON("cgi-bin/readpins.sh", function(response){
        var oldstates = states;
        states=response.states.split(' ');
        relays.forEach(function(item){if (states[item.id-1] != oldstates[item.id-1]){document.getElementById(`checkbox${item.id}`).checked = states[item.id-1] === "on";}});
        showTemp();
    });
}

function rowhtml(relay, name){
    return `<button type="button" class="btn btn-info" onclick=rly(${relay})>${name}
                <div style="float: right" class="form-check form-switch"><input class="form-check-input" type="checkbox" id="checkbox${relay}"></div>
            </button>`;
}

function rly(relay){const cmd = states[relay-1]==="on"?0:1; $.ajax({url: 'cgi-bin/relay.py?relay=' + relay + '&state=' + cmd});}
function showTemp(){ $.getJSON("cgi-bin/temperature.py", function(response){ document.getElementById("temp").innerHTML = (new Date()).toLocaleTimeString() + " " + response.temp + "&#x2103"; }); }

//function showState(relay){ $.getJSON("cgi-bin/readpin.sh?relay=" + relay, function(response){ document.getElementById("temp").innerHTML = response.state; }); }
//function showStates(){ $.getJSON("cgi-bin/readpins.sh", function(response){ document.getElementById("temp").innerHTML = response.states; }); }

function stop(){var highestTimeoutId = setTimeout(";"); for (var i = 0 ; i < highestTimeoutId ; i++){clearTimeout(i);}}