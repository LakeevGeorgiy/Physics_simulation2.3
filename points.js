function distanceBetweenPoints(x1, y1, x2, y2){
	return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
}

function distanceBetweenVectors3D(lhs, rhs){
	return Math.sqrt(Math.pow(lhs[0] - rhs[0], 2) + Math.pow(lhs[1] - rhs[1], 2) + Math.pow(lhs[2] - rhs[2], 2));
}

function lineCoefficient(x0, y0, x1, y1){
    let k = (y1 - y0) / (x1 - x0);
    let b = y0 - k * x0;
    return [k, b];
}

function coordinatesNormalVector(k, x1, y1, length) {
    const k2 = -1 / k;
	const b2 = y1 - k * x1;
	const c = Math.sqrt(Math.pow(k2, 2) + 1);
	let x2 = (length + x1 * c) / c;
	let y2 = x2 * k2 + b2;
	return [x2 - x1, y2 - y1];
}

function vectorSum(lhs, rhs){
	return [ lhs[0] + rhs[0], lhs[1] + rhs[1] ];
}

function vectorLength(vector){
	return Math.sqrt(Math.pow(vector[0], 2) + Math.pow(vector[1], 2));
}

function normalizedVector(vector, length){
	const currentLength = vectorLength(vector);
	return [vector[0]  * length / currentLength, vector[1] * length / currentLength, vector[2] * length / currentLength ];
}

function perpendicularVector(x0, y0, x1, y1, l){
	const x = x1 - x0;
	const y = y1 - y0;

	if (x == 0) {
		return [x1 - l, y1]
	}

	if (y == 0) {
		return [x1, y1 - l];
	}

	const c1 = Math.pow(y, 2) + Math.pow(x, 2);
	const c2 = Math.pow(l, 2) * Math.pow(y, 2);

	const D = 4 * c1 * c2;
	let x2 = (2 * c1 * x1 - Math.sqrt(D)) / (2 * c1);
	if (y1 < width / 2)
		x2 = (2 * c1 * x1 + Math.sqrt(D)) / (2 * c1);
	let y2 = (y1 * y - x2 * x + x1 * x) / y;
	return [x2, y2];
}

function plotTriangle(x0, y0, x1, y1){

	let a = distanceBetweenPoints(x0, y0, x1, y1);
	const k = lineCoefficient(x0, y0, x1, y1)[0];
	// let point3 = coordinatesNormalVector(k, x1, y1, 250);
	// console.log(point3);
	let point3 = perpendicularVector(x0, y0, x1, y1, 250);
	//point3 = normalizedVector(point3, 250);
	console.log(point3);

	context.beginPath();
	context.moveTo(x0, y0);
	context.lineWidth = 1;
	context.lineTo(x1, y1);
	context.stroke();

	context.beginPath();
	context.moveTo(x1, y1);
	context.lineWidth = 1;
	context.lineTo(point3[0], point3[1]);
	context.stroke();

	context.beginPath();
	context.moveTo(point3[0], point3[1]);
	context.lineWidth = 1;
	context.lineTo(x0, y0);
	context.stroke();
}