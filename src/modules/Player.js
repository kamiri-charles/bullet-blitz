export default class Player {
    constructor({position}) {
        this.position = position;
        this.width = 100;
        this.height = 100;
    };

    draw(context) {
        context.fillStyle = '#f00';
        context.fillRect(this.position.x, this.position.y, this.width, this.height);
    };

    update() {

    };

    render(context) {
        this.update();
        this.draw(context);
    };
}