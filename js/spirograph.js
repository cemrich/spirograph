import { Circle } from './circle.js';

const AlphaIncrement = 0.01;
const MaxAlpha = 2 * Math.PI * 60;
const RingColor = '#333';
const SpiroColor = '#00ff00';

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const ring = new Circle(canvas.width/2, canvas.height/2, canvas.width/2);


function draw(cogRadius, cogEntryPointSize) {
	const cog = new Circle(0, 0, cogRadius);

	const radiusToCogCenter = ring.radius - cog.radius;
	const cogRotationFactor = ring.radius / cog.radius;

	ring.draw(context, RingColor);

	context.strokeStyle = SpiroColor;
	context.beginPath();

	for (let alpha = 0; alpha < MaxAlpha; alpha += AlphaIncrement) {
		cog.center = ring.pointAtAngle(alpha, radiusToCogCenter);

		const beta = -alpha * cogRotationFactor;
		let cogEntryPoint = cog.pointAtAngle(beta, cogEntryPointSize);

		context.lineTo(cogEntryPoint.x, cogEntryPoint.y);
	}

	context.stroke();
}

canvas.addEventListener('mousemove', e => {
	context.clearRect(0, 0, canvas.width, canvas.height);

	const cogRadius = (e.x - canvas.offsetLeft) / 2;
	const cogEntryPointSize = cogRadius * ((e.y - canvas.offsetTop) / canvas.height);

	draw(cogRadius, cogEntryPointSize);
});

draw(ring.radius / 2.24, ring.radius / 2.54);
