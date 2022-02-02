export class Point {

	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	plus(point) {
		return new Point(this.x + point.x, this.y + point.y);
	}

	scale(size) {
		return new Point(this.x * size, this.y * size);
	}
}
