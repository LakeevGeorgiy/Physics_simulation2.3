function magnitInduction(current, coordinates, x, y){
	const mu = 4 * Math.PI * Math.pow(10, -7);
	const radius = distanceBetweenPoints(coordinates[0], coordinates[1], x, y) / 100;
	let B = (mu * current) / (2 * Math.PI * radius); 
	console.log("magnit induction: ", B);
	return B;

}

function vectorMagnitInduction(current, coordinates, x, y){
	const B = magnitInduction(current, coordinates, x, y);
	const k = lineCoefficient(coordinates[0], coordinates[1], x, y)[0];
	let vectorB = coordinatesNormalVector(k, x, y, B);
	vectorB = perpendicularVector(coordinates[0], coordinates[1], x, y, B);
	vectorB[0] -= x;
	vectorB[1] -= y;
	return vectorB;
}

function CheckForCollision(x, y, coordinates){
	for (let i = 0; i < coordinates.length; ++i){
		if (coordinates[i][0] - 7 < x && x < coordinates[i][0] + 7 && coordinates[i][1] - 7 < y && y < coordinates[i][1] + 7)
			return true;
	}
	return false;
}

function plotLines(current, currentCoordinates){
	for (let x = 0; x < width; x += 35){
		for (let y = 0; y < height; y += 35){

			if (CheckForCollision(x, y, currentCoordinates)){
				continue;
			}

			let vectorB = [0, 0];

			for (let i = 0; i < currentCoordinates.length; ++i){

				let currentB = vectorMagnitInduction(current[i], currentCoordinates[i], x, y);
				vectorB = vectorSum(vectorB, currentB);

			}

			vectorB = normalizedVector(vectorB, 15);
			//console.log("vector B", x, y, vectorB);

			context.beginPath();
			context.moveTo(x, y);
			context.lineWidth = 2;
			context.lineTo(x + vectorB[0], y + vectorB[1]);
			context.strokeStyle = "#FFFFFF";
			context.stroke();

			// context.beginPath();
			// context.moveTo(x, y);
			// context.lineWidth = 1;
			// context.lineTo(currentCoordinates[0][0], currentCoordinates[0][1]);
			// context.stroke();

			// context.beginPath();
			// context.moveTo(x + vectorB[0], y + vectorB[1]);
			// context.lineWidth = 1;
			// context.lineTo(currentCoordinates[0][0], currentCoordinates[0][1]);
			// context.stroke();

		}
	}
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

    // var d=document.createElement("label");
    // d.id=e.id;
    // d.onclick="a(10)";
    // d.innerHTML="welcome";
	// d.setAttribute("style", "color: white");
    // document.body.appendChild(d);

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
	//console.log(currentCoordinates[cntCurrentSources - 1]);
	clearAllLines(currentCoordinates);
	plotLines(current, currentCoordinates);
	//plotTriangle(36, 34, 123, 570);
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