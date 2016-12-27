var version = "1.0.1"
document.getElementById("versionnum").innerHTML = version;

//WIP block stuff

var WIPshade = document.getElementById("WIPshade");
var WIPbox = document.getElementById("WIPbox");

function WIPBlock(){
	if(!localStorage.getItem("isDev")){
		WIPshade.style.display = "block";
		WIPbox.style.display = "block";
		var WIPCSSTransitionTimeout = setTimeout(function(){
			WIPshade.className = "WIPactive";
			WIPbox.className = "WIPactive";
		},40);
	}
}

WIPBlock();

function ButImDevPlzLetMeIn(){
	localStorage.setItem("isDev",true);
	location.reload();
}

//Converter

var galacticMilliseconds = 0;
var GMSBox = document.getElementById("gms");
var ACBox = document.getElementById("ac");

function updateConverter(changedBox){
	if(changedBox==undefined){
		galacticMilliseconds = Number(GMSBox.value);
	}else if(changedBox=="ac"){
		galacticMilliseconds = ACtoGMS();
	}
	GMSBox.value = galacticMilliseconds;
	ACBox.value = GMStoAC();
}

ACMULT = 32429057361;
ACOFFSET = -21257938114038;

function ACtoGMS(){
	var ACnum = Number(ACBox.value);
	return (ACnum*ACMULT)-ACOFFSET;
}

function GMStoAC(){
	return Math.floor((galacticMilliseconds+ACOFFSET)/ACMULT);
}

updateConverter();