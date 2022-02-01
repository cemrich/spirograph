export class Point {

	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	draw(context, color) {
		color = color || 'black';
		context.fillStyle = color;
		context.fillRect(this.x, this.y, 1, 1);
	}

	plus(point) {
		return new Point(this.x + point.x, this.y + point.y);
	}

	scale(size) {
		return new Point(this.x * size, this.y * size);
	}
}
