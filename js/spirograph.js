import { Circle } from './circle.js';
import { Point } from './point.js';

const AlphaIncrement = 0.005;
const MaxAlpha = 2 * 40 * Math.PI;

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const ring = new Circle(canvas.width/2, canvas.height/2, canvas.width/2);


function draw(cogRadius, cogEntryPointSize) {
	const cog = new Circle(0, 0, cogRadius);

	const radiusToCogCenter = ring.radius - cog.radius;
	const cogRotationFactor = ring.radius / cog.radius;

	ring.draw(context, '#333');

	for (let alpha = 0; alpha < MaxAlpha; alpha += AlphaIncrement) {

		cog.center = ring.pointAtAngle(alpha, radiusToCogCenter);

		const beta = -alpha * cogRotationFactor;
		let cogEntryPoint = cog.pointAtAngle(beta, cogEntryPointSize);
		cogEntryPoint.draw(context, '#00ff00');
	}
}

canvas.addEventListener('mousemove', e => {
	context.clearRect(0, 0, canvas.width, canvas.height);

	const cogRadius = (e.x - canvas.offsetLeft) / 2;
	const cogEntryPointSize = cogRadius * ((e.y - canvas.offsetTop) / canvas.height);

	draw(cogRadius, cogEntryPointSize);
});

draw(ring.radius / 3.3, ring.radius / 10);
