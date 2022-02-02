import { Point } from './point.js';

export class Circle {

	constructor(x, y, radius) {
		this.center = new Point(x, y);
		this.radius = radius;
	}

	draw(context, color) {
		color = color || 'black';
		context.strokeStyle = color;
		context.beginPath();
		context.arc(this.center.x, this.center.y, this.radius, 0, 2 * Math.PI);
		context.stroke();
	}

	pointAtAngle(angle, distanceFromCenter) {
		let pointAtAngle = new Point(Math.cos(angle), Math.sin(angle));
		pointAtAngle = pointAtAngle.scale(distanceFromCenter);
		pointAtAngle = this.center.plus(pointAtAngle);
		return pointAtAngle;
	}
}
