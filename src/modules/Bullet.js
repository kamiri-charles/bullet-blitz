import { globals } from "../utils";

export default class Bullet {
    constructor({position}) {
        this.position = position;
        this.radius = 5;
        this.speed = 20;
        this.marked_for_deletion = false;
        
        if (globals.DIRECTION === "right") {
            this.speed = 20;
        } else {
            this.speed = -20;
        }
    }
    
    draw(context) {
        context.beginPath();
        context.fillStyle = 'red';
        context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false);
        context.fill();
        context.closePath();
    }
    
    update() {
        this.position.x +=  this.speed;
        
        if (this.position.x < 0 - (this.radius * 0.5) || this.position.x > globals.GAME_WIDTH + (this.radius * 0.5)) this.marked_for_deletion = true;
    };
    
    render(context) {
        this.draw(context);
        this.update();
    };
};