function magnitInduction(current, coordinates, x, y){
	const mu = 4 * Math.PI * Math.pow(10, -7);
	const radius = distanceBetweenPoints(coordinates[0], coordinates[1], x, y);
	let B = (mu * current) / (2 * Math.PI * radius); 
	return B;

}

function vectorMagnitInduction(current, coordinates, x, y){
	const B = magnitInduction(current, coordinates, x, y);
	let vectorB = perpendicularVector(coordinates[0], coordinates[1], x, y, 10);
	vectorB[0] -= x;
	vectorB[1] -= y;
	return vectorB;
}

function CheckForCollision(x, y, coordinates){
	for (let i = 0; i < coordinates.length; ++i){
		if (coordinates[i][0] - 15 < x && x < coordinates[i][0] + 15 && coordinates[i][1] - 15 < y && y < coordinates[i][1] + 15)
			return true;
	}
	return false;
}

function Correction(vector, x, y){

	vector[0] = Math.abs(vector[0]);
	vector[1] = Math.abs(vector[1]);

	if (y > width / 2) {
		vector[0] = -1 * vector[0];
	}
	if (x < height / 2){
		vector[1] = -1 * vector[1];
	}
	return vector;
}

function Reverse(vector){
	vector[0] = -vector[0];
	vector[1] = -vector[1];
	return vector;
}

function ChangeCoordinates(x, y){
	return [(x + 8) * 100, (y + 5) * 150, 0];
}

function plotLines(current, currentCoordinates){


	for (let x = 0; x < height; x += 35){
		for (let y = 0; y < width; y += 35){

			if (CheckForCollision(x, y, currentCoordinates)){
				continue;
			}

			let vectorB = [0, 0, 0];
			let direction = [x, y, 0];

			for (let i = 0; i < currentCoordinates.length; ++i){

				let currentVector = [currentCoordinates[i][0], currentCoordinates[i][1], 0];
				let distance = Math.pow(distanceBetweenVectors3D(direction, currentVector), 3);

				let partX = current[i] * (currentCoordinates[i][1] - y) / distance;
				let partY = -current[i] * (currentCoordinates[i][0] - x) / distance;

				vectorB[0] += partX;
				vectorB[1] += partY;

			}

			vectorB = normalizedVector(vectorB, 15);
			canvas_arrow(context, x, y, x + vectorB[0], y + vectorB[1]);
		}
	}
}

function canvas_arrow(context, fromx, fromy, tox, toy) {
	var headlen = 5;
	var dx = tox - fromx;
	var dy = toy - fromy;
	var angle = Math.atan2(dy, dx);
	context.beginPath()
	context.lineWidth = 3;
	context.moveTo(fromx, fromy);
	context.lineTo(tox, toy);
	context.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
	context.moveTo(tox, toy);
	context.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
	context.strokeStyle = "#FFFFFF";
	context.stroke();
}

let dl = 1;
let canvas = document.getElementById("id_canvas");
let context = canvas.getContext("2d");

let height = canvas.height = window.innerHeight;
let width = canvas.width = window.innerWidth;

let cntCurrentSources = 0;
let current = [];
let currentCoordinates = [];

document.addEventListener("click", createCurrentSource, false);
document.addEventListener("dblclick", clearAllCurrent, false);

function createCurrentSource(e) {
    if (cntCurrentSources == 4)
        return;    

	let temp = prompt("Введите значение силы тока: ", 1);
	if (temp.replace(/\s/g, '').length === 0 || isNaN(temp)) {
		alert('Нужно писать число!');
		return;
	}
	
	context.beginPath();
    context.arc(e.clientX, e.clientY, 7.5, 0, Math.PI * 2, false);
    context.lineWidth = 5;
    context.strokeStyle = "#FF0000";
    context.stroke();
    ++cntCurrentSources;

	current[cntCurrentSources - 1] = parseInt(temp);
	currentCoordinates[cntCurrentSources - 1] =  [e.clientX, e.clientY];
	clearAllLines(currentCoordinates);
	plotLines(current, currentCoordinates);
}
 

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function clearAllLines(coordinates){
	context.clearRect(0, 0, canvas.width, canvas.height);
	for (let i = 0; i < coordinates.length; ++i){
		context.beginPath();
		context.arc(coordinates[i][0], coordinates[i][1], 5, 0, Math.PI * 2, false);
		context.lineWidth = 5;
		context.strokeStyle = "#FF0000";
		context.stroke();
	}
}

function clearAllCurrent(e){
	context.clearRect(0, 0, canvas.width, canvas.height);
	cntCurrentSources = 0;
	current = [];
	currentCoordinates = [];
}