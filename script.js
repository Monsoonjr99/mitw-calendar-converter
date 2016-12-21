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

document.onload(WIPBlock());

function ButImDevPlzLetMeIn(){
	localStorage.setItem("isDev",true);
	location.reload();
}