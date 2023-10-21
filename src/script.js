import Player from './modules/Player';
import Terrain from './modules/Terrain';
import { globals } from './utils';
import test_map_loc from './assets/maps/test/test_map.png';
import { surface_data } from './assets/maps/test/data';
import { platform_data } from './assets/maps/test/data';

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
        right: {pressed: false},
        left: {pressed: false}, 
        fire_weapon: {pressed: false}
    };
    
    const test_map = new Terrain(test_map_loc);
    test_map.load({
        surface_data: surface_data,
        platform_data: platform_data
    });    
    
    const player = new Player({
        position: {x: 100, y: canvas.height - 100},
        surface_blocks: test_map.surface_blocks,
        platform_blocks: test_map.platform_blocks
    });

    const animate = () => {
        requestAnimationFrame(animate);

        test_map.render(ctx);
        player.render(ctx);


        // Player movement
        if (keys.right.pressed) {
            globals.DIRECTION = 'right';
            player.velocity.x = globals.PLAYER_SPEED;
        } else if (keys.left.pressed) {
            globals.DIRECTION = "left";
            player.velocity.x = -globals.PLAYER_SPEED;
        } else {
            player.velocity.x = 0;
        };


        // Fire bullet
        if (keys.fire_weapon.pressed) player.fire_weapon();
    };

    animate();

    // Controls
    window.addEventListener('keydown', e => {
        switch (e.key) {
            case 'w':
            case 'ArrowUp':
                if (player.jumps < globals.MAX_JUMPS) {
                    player.jumps++;
                    player.velocity.y = -globals.PLAYER_JUMP_HEIGHT;
                };
                break;

            case 'd':
            case 'ArrowRight':
                keys.right.pressed = true;
                break;

            case 'a':
            case 'ArrowLeft':
                keys.left.pressed = true;
                break;

            case 'p':
                keys.fire_weapon.pressed = true;
                break
        };
    });

    window.addEventListener('keyup', e => {
      switch (e.key) {
        case "d":
        case "ArrowRight":
          keys.right.pressed = false;
          break;

        case "a":
        case "ArrowLeft":
          keys.left.pressed = false;
          break;

        case "p":
          keys.fire_weapon.pressed = false;
          break;
      }
    });
});