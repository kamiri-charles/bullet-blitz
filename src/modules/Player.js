import { detect_rect_collision, globals } from "../utils";

const gravity = 0.5;

export default class Player {
    constructor({ position, surface_blocks }) {
        this.position = position;
        this.surface_blocks = surface_blocks;
        this.width = 20;
        this.height = 20;


        this.velocity = {
            x: 0,
            y: 0
        };
    };

    _apply_gravity() {
        this.position.y += this.velocity.y;
        this.velocity.y += gravity;
    };

    _check_vertical_collision() {
        for (let i = 0; i < this.surface_blocks.length; i++) {
            const block = this.surface_blocks[i];

            if (detect_rect_collision({
                object_1: this,
                object_2: block
            })) {
                if (this.velocity.y > 0) {
                    this.velocity.y = 0;
                    this.position.y = block.position.y - this.height - 0.01;
                    break;
                };
            }
        }
    }

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
    }

    draw(context) {
        context.fillStyle = 'blue';
        context.fillRect(this.position.x, this.position.y, this.width, this.height);
    };

    update() {
        // Horizontal movement
        this.position.x += this.velocity.x;
        this._check_horizontal_collision();
        this._apply_gravity();
        this._check_vertical_collision();
    };

    render(context) {
        this.update();
        this.draw(context);
    };
}