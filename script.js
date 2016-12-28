var version = "1.1.1"
document.getElementById("versionnum").innerHTML = version;

//WIP block stuff

/* var WIPshade = document.getElementById("WIPshade");
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

WIPBlock(); */

function ButImDevPlzLetMeIn(){
	localStorage.setItem("isDev",true);
	location.reload();
}

//Converter

var galacticMilliseconds = 0;
var GMSBox = document.getElementById("gms");
var ACBox = document.getElementById("ac");
var TDBox = document.getElementById("td");
var NTEBox = document.getElementById("nte");

function updateConverter(changedBox){
	if(changedBox == "gms"){
		galacticMilliseconds = Number(GMSBox.value);
	}else if(changedBox == "ac"){
		galacticMilliseconds = ACtoGMS();
	}else if(changedBox == "td"){
		galacticMilliseconds = TDtoGMS();
	}else if(changedBox == "nte"){
		galacticMilliseconds = NTEtoGMS();
	}
	GMSBox.value = galacticMilliseconds;
	ACBox.value = GMStoAC();
	TDBox.value = GMStoTD();
	NTEBox.value = GMStoNTE();
}

ACMULT = 32429057361;
ACOFFSET = -311868729306411;

function ACtoGMS(){
	var ACnum = Number(ACBox.value);
	return (ACnum*ACMULT)-ACOFFSET;
}

function GMStoAC(){
	return Math.floor((galacticMilliseconds+ACOFFSET)/ACMULT);
}

TDMULT = 37936153824;
TDOFFSET = -239649299691738;

function TDtoGMS(){
	var TDnum = Number(TDBox.value);
	return (TDnum*TDMULT)-TDOFFSET;
}

function GMStoTD(){
	return Math.floor((galacticMilliseconds+TDOFFSET)/TDMULT);
}

NTEOFFSET = TDOFFSET - (TDMULT*3842);

function NTEtoGMS(){
	var NTEnum = Number(NTEBox.value);
	return (NTEnum*TDMULT)-NTEOFFSET;
}

function GMStoNTE(){
	return Math.floor((galacticMilliseconds+NTEOFFSET)/TDMULT);
}

updateConverter();

//linking to conversions

function getQueryVariable(variable){ //this function is someone elses code (why reinvent the wheel)
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for (var i=0;i<vars.length;i++) {
		var pair = vars[i].split("=");
		if(pair[0] == variable){
			return pair[1];
		}
	}
	return(false);
}

if(getQueryVariable("datetype")){
	document.getElementById(getQueryVariable("datetype")).value = getQueryVariable("datevalue");
	updateConverter(getQueryVariable("datetype"));
}