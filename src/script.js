import Player from './modules/Player';
import test_map_loc from './assets/maps/test/test_map.png';
import { globals } from './utils';
import Terrain from './modules/Terrain';
import { surface_data } from './assets/maps/test/data';

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');
    /** @type {CanvasRenderingContext2D} */
    const ctx = canvas.getContext('2d');

    canvas.width = globals.GAME_WIDTH;
    canvas.height = globals.GAME_HEIGHT;

    const resize_canvas = () => {
        let scale_factor_x = window.innerWidth / canvas.width;
        let scale_factor_y = window.innerHeight / canvas.height;
        let scale_factor = Math.min(scale_factor_x, scale_factor_y);

        canvas.style.width = canvas.width * scale_factor + 'px';
        canvas.style.height = canvas.height * scale_factor + 'px';
    };

    window.addEventListener('resize', resize_canvas);
    resize_canvas();

    const keys = {
        up: {pressed: false},
        right: {pressed: false},
        down: {pressed: false},
        left: {pressed: false}
    };

    
    
    const test_map = new Terrain(test_map_loc);
    test_map.load(surface_data);
    
    
    const player = new Player({
        position: {x: 100, y: canvas.height - 100},
        surface_blocks: test_map.surface_blocks
    });

    const animate = () => {
        requestAnimationFrame(animate);

        // Render background
        ctx.fillStyle = 'rgba(255, 0, 0, 0.8)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);


        // Render surface
        //ctx.fillStyle = 'black';
        //ctx.fillRect(0, canvas.height - 100, canvas.width, canvas.height);
        test_map.render(ctx);

        player.render(ctx);


        // Player movement
        if (keys.right.pressed) {
            player.velocity.x = 5
        } else if (keys.left.pressed) {
            player.velocity.x = -5
        } else {
            player.velocity.x = 0;
        }
    };

    animate();

    // Controls
    window.addEventListener('keydown', e => {
        switch (e.key) {
            case 'w':
            case 'ArrowUp':
                keys.up.pressed = true
                player.velocity.y = -10;
                break;

            case 'd':
            case 'ArrowRight':
                keys.right.pressed = true;
                break;

            case 's':
            case 'ArrowDown':
                keys.down.pressed = true;
                break;

            case 'a':
            case 'ArrowLeft':
                keys.left.pressed = true;
                break;
        };
    });

    window.addEventListener('keyup', e => {
      switch (e.key) {
        case "w":
        case "ArrowUp":
          keys.up.pressed = false;
          break;

        case "d":
        case "ArrowRight":
          keys.right.pressed = false;
          break;

        case "s":
        case "ArrowDown":
          keys.down.pressed = false;
          break;

        case "a":
        case "ArrowLeft":
          keys.left.pressed = false;
          break;
      }
    });
});