import { Point } from './point.js';

const AlphaIncrement = 0.005;
const MaxAlpha = 2 * 40 * Math.PI;

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const center = new Point(canvas.width/2, canvas.height/2);
const ringSize = canvas.width / 2;


function draw(cogSize, cogEntryPointSize) {
	const radiusToCogCenter = ringSize - cogSize;
	const cogRotationFactor = ringSize / cogSize;

	for (let alpha = 0; alpha < MaxAlpha; alpha += AlphaIncrement) {

		let rawRingPoint = new Point(Math.cos(alpha), Math.sin(alpha));

		let ringPoint = rawRingPoint.scale(ringSize);
		ringPoint = center.plus(ringPoint);
		ringPoint.draw(context, '#333');

		let spiroPoint = rawRingPoint.scale(radiusToCogCenter);
		spiroPoint = center.plus(spiroPoint);
		//spiroPoint.draw(context, '#ff00ff');

		const beta = -alpha * cogRotationFactor;
		let cogEntryPoint = new Point(Math.cos(beta), Math.sin(beta));
		cogEntryPoint = cogEntryPoint.scale(cogEntryPointSize);
		cogEntryPoint = spiroPoint.plus(cogEntryPoint);
		cogEntryPoint.draw(context, '#00ff00');
	}
}

canvas.addEventListener('mousemove', e => {
	context.clearRect(0, 0, canvas.width, canvas.height);

	const cogSize = (e.x - canvas.offsetLeft) / 2;
	const cogEntryPointSize = cogSize * ((e.y - canvas.offsetTop) / canvas.height);

	draw(cogSize, cogEntryPointSize);
});

draw(ringSize / 3.3, ringSize / 10);
