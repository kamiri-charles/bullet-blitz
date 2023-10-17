const gravity = 0.5;

export default class Player {
    constructor({canvas, position}) {
        this.canvas = canvas;
        this.position = position;
        this.width = 50;
        this.height = 50;

        this.velocity = {
            x: 0,
            y: 0
        };
    };

    draw(context) {
        context.fillStyle = 'blue';
        context.fillRect(this.position.x, this.position.y, this.width, this.height);
    };

    update() {
        // Horizontal movement
        this.position.x += this.velocity.x

        // Vertical movement
        this.position.y += this.velocity.y;


        // Surface boundary
        if (this.position.y + this.height + this.velocity.y < this.canvas.height - 100) {
            this.velocity.y += gravity;
        } else {
            this.velocity.y = 0;
        }
    };

    render(context) {
        this.update();
        this.draw(context);
    };
}