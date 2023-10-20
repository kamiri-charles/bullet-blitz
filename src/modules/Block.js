export default class Block {
    constructor({position}) {
        this.position = position;
        this.width = 16;
        this.height = 16;
    }

    render(context) {
        context.fillStyle = 'rgba(0, 0, 0, 0.5)';
        context.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}