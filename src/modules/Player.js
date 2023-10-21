import { detect_rect_collision, detect_platform_collision, globals } from "../utils";
import Weapon, { Sniper } from "./Weapon";


export default class Player {
    constructor({ position, surface_blocks, platform_blocks }) {
        this.position = position;
        this.surface_blocks = surface_blocks;
        this.platform_blocks = platform_blocks;
        this.width = 30;
        this.height = 50;
        this.jumps = 0;
        this.direction = 'right';
    

        this.velocity = {
            x: 0,
            y: 0
        };

        this.weapon = new Sniper({
            position: {
                x: this.position.x + 10,
                y: this.position.y + 10
            }
        });
    };
    
    _apply_gravity() {
        this.position.y += this.velocity.y;
        this.velocity.y += globals.GRAVITY;
    };
    
    _check_vertical_collision() {
        this._apply_gravity();
        
        // Surface blocks collision
        for (let i = 0; i < this.surface_blocks.length; i++) {
            const block = this.surface_blocks[i];
            
            if (
                detect_rect_collision({
                    object_1: this,
                    object_2: block,
                })
                ) {
                    if (this.velocity.y > 0) {
                        this.velocity.y = 0;
                        this.position.y = block.position.y - this.height - 0.01;
                        this.jumps = 0;
                        break;
                    }
                }
            };
            
            // Platform blocks collision
            for (let i = 0; i < this.platform_blocks.length; i++) {
                const block = this.platform_blocks[i];
                
                if (
                    detect_platform_collision({
                        object_1: this,
                        object_2: block,
                    })
                    ) {
                        if (this.velocity.y > 0) {
                            this.velocity.y = 0;
                            this.position.y = block.position.y - this.height - 0.01;
                            this.jumps = 0;
                            break;
                        }
                    }
                };
    };
            
    _check_horizontal_collision() {
        for (let i = 0; i < this.surface_blocks.length; i++) {
            const block = this.surface_blocks[i];
            
            if (
                detect_rect_collision({
                    object_1: this,
                    object_2: block,
                })
                ) {
                    if (this.velocity.x > 0) {
                        this.velocity.x = 0;
                        this.position.x = block.position.x - this.width - 0.01;
                        break;
                    }
                    
                    if (this.velocity.x < 0) {
                        this.velocity.x = 0;
                        this.position.x = block.position.x + block.width + 0.01;
                        break;
                    }
                }
            }
    };

    fire_weapon() {
        this.weapon.fire_bullet(this.direction);
    };
                
    draw(context) {
        context.beginPath();
        if (this.direction === 'left') {
            context.fillStyle = 'black';
            context.fillRect(this.position.x, this.position.y, this.width, this.height);
        } else {
            context.fillStyle = 'black';
            context.fillRect(this.position.x, this.position.y, this.width, this.height);
        }
        context.closePath();
        this.weapon.render(context);
    };
                
    update(bullets) {
        // Horizontal movement
        this.position.x += this.velocity.x;

        if (this.velocity.x > 0) this.velocity.x -= globals.FRICTION;
        else if (this.velocity.x < 0) this.velocity.x += globals.FRICTION;

        // Update weapon position
        if (this.direction === 'left') {
            this.weapon.position = {
                x: this.position.x - this.width,
                y: this.position.y + 10
            };
        } else {
            this.weapon.position = {
                x: this.position.x + 10,
                y: this.position.y + 10,
            };
        }

        // Check collision with bullets
        bullets.forEach(bullet => {
            if (detect_rect_collision({
                object_1: this,
                object_2: bullet
            })) {
                this.velocity.x = bullet.power;
                bullet.marked_for_deletion = true;
            };
        })

        this._check_horizontal_collision();
        this._check_vertical_collision();
    };
                
    render(context, bullets) {
        this.update(bullets);
        this.draw(context);
    };
};