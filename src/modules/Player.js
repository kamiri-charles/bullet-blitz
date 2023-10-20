import { detect_rect_collision, detect_platform_collision, globals } from "../utils";


export default class Player {
    constructor({ position, surface_blocks, platform_blocks }) {
        this.position = position;
        this.surface_blocks = surface_blocks;
        this.platform_blocks = platform_blocks;
        this.width = 25;
        this.height = 25;
        
        
        
        this.velocity = {
            x: 0,
            y: 0
        };
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
                
    draw(context) {
        context.fillStyle = 'black';
        context.fillRect(this.position.x, this.position.y, this.width, this.height);
    };
                
    update() {
        // Horizontal movement
        this.position.x += this.velocity.x;
        this._check_horizontal_collision();
        this._check_vertical_collision();
    };
                
    render(context) {
        this.update();
        this.draw(context);
    };
};