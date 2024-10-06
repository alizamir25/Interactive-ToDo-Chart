document.addEventListener("DOMContentLoaded", (event)=>{
	updateDonut();
});
function updateDonut(){
	var checkboxes=document.querySelectorAll('.tasks input[type="checkbox"]');
	var checkedCount=0;
	checkboxes.forEach(function (checkbox){
		if (checkbox.checked){
			checkedCount++;
		}
	});
	var percentage=(checkedCount/checkboxes.length)*100;
	createRing("ring", percentage);
}
function createRing(containerId, percentage){
	var container=document.getElementById(containerId);
	var radius=135;
	var strokeWidth=30;
	var circumference=2*Math.PI*radius;
	var angle=(percentage/100)*360;
	var centerX=150;
	var centerY=150;
	var backgroundCircle=document.createElementNS(
		"http://www.w3.org/2000/svg",
		"circle"
	);
	backgroundCircle.setAttribute("cx", centerX);
	backgroundCircle.setAttribute("cy", centerY);
	backgroundCircle.setAttribute("r", radius);
	backgroundCircle.setAttribute("stroke", "#0F1121");
	backgroundCircle.setAttribute("stroke-width", strokeWidth);
	backgroundCircle.setAttribute("fill", "none");
	container.innerHTML="";
	container.appendChild(backgroundCircle);
	var foregroundCircle=document.createElementNS(
		"http://www.w3.org/2000/svg",
		"circle"
	);
	foregroundCircle.setAttribute("cx", centerX);
	foregroundCircle.setAttribute("cy", centerY);
	foregroundCircle.setAttribute("r", radius);
	foregroundCircle.setAttribute("stroke", "#87CEEB");
	foregroundCircle.setAttribute("stroke-width", strokeWidth);
	foregroundCircle.setAttribute("fill", "none");
	foregroundCircle.setAttribute("stroke-dasharray", circumference);
	foregroundCircle.setAttribute(
		"stroke-dashoffset",
		circumference-(circumference*percentage)/100
	);
	foregroundCircle.setAttribute(
		"transform",
		"rotate(-90 "+centerX+" "+centerY+")"
	);
	container.appendChild(foregroundCircle);
	var labelText=percentage.toFixed(0)+"%";
	var label=document.createElementNS("http://www.w3.org/2000/svg", "text");
	label.setAttribute("x", centerX);
	label.setAttribute("y", centerY+10);
	label.setAttribute("fill", "white");
	label.setAttribute("font-size", "30");
	label.setAttribute("font-weight", "bolder");
	label.setAttribute("text-anchor", "middle");
	label.textContent=labelText;
	container.appendChild(label);
}
createRing("ring", 0);
var checkboxes=document.querySelectorAll('.tasks input[type="checkbox"]');
checkboxes.forEach(function (checkbox){
	checkbox.addEventListener("change", updateDonut);
});