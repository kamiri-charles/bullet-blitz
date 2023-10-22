import { globals } from "../utils";
import Bullet from "./Bullet";

export  default class Weapon {
    constructor({position}) {
        this.position = position;
        this.name = "Default";
        this.bullets = [];
        this.width = 50;
        this.height = 20;
        this.max_ammo = 15;
        this.power = 5;
    }

    fire_bullet(direction) {
        if (this.bullets.length < this.max_ammo) {
            const bullet = new Bullet({
              position: {
                x: direction === "left" ? this.position.x : this.position.x + this.width,
                y: this.position.y + this.height / 2 - 5,
              },
              direction: direction,
              power: this.power
            });
    
            this.bullets.push(bullet);
            globals.BULLETS.push(bullet);
        }
    };

    update() {
        this.bullets = this.bullets.filter(bullet => !bullet.marked_for_deletion);
    };

    render(context) {
        this.update();

        context.beginPath();
        context.fillStyle = "black";
        context.fillRect(this.position.x, this.position.y, this.width, this.height);
        context.closePath();

        this.bullets.forEach(bullet => bullet.render(context));
    };
}


export class Sniper extends Weapon {
    constructor({position}) {
        super({position});
        this.name = 'Sniper'
        this.max_ammo = 1;
        this.power = 20;
    }
}