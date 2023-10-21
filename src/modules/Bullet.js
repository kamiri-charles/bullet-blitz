import { globals } from "../utils";

export default class Bullet {
    constructor({position, direction, power}) {
        this.position = position;
        this.direction = direction
        this.width = 10;
        this.height = 10;
        this.speed = this.direction === 'left' ? -20 : 20;
        this.power = this.direction === "left" ? -power : power;
        this.marked_for_deletion = false;
    }
    
    draw(context) {
        context.beginPath();
        context.fillStyle = 'red';
        context.fillRect(this.position.x, this.position.y, this.width, this.height);
        context.fill();
        context.closePath();
    }
    
    update() {
        this.position.x +=  this.speed;
        
        if (this.position.x < -this.width || this.position.x > globals.GAME_WIDTH + this.width) this.marked_for_deletion = true;
    };
    
    render(context) {
        this.draw(context);
        this.update();
    };
};