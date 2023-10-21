import { globals } from "../utils";
import Bullet from "./Bullet";

export  default class Weapon {
    constructor({position}) {
        this.position = position;
        this.name = "Default";
        this.bullets = [];
        this.width = 50;
        this.height = 20;
    }

    fire_bullet() {
        this.bullets.push(new Bullet({
            position: {
                //x: this.position.x  + this.width,
                x: globals.DIRECTION === 'left' ? this.position.x : this.position.x + this.width,
                y: this.position.y + this.height / 2
            }
        }));
    };

    update() {
        this.bullets = this.bullets.filter(bullet => !bullet.marked_for_deletion);
    };

    render(context) {
        this.update();

        context.beginPath();
        context.fillStyle = "blue";
        context.fillRect(this.position.x, this.position.y, this.width, this.height);
        context.closePath();

        this.bullets.forEach(bullet => bullet.render(context));
    }
}