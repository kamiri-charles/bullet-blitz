import Player from './modules/Player';
import Terrain from './modules/Terrain';
import Enemy from './modules/Enemy';
import { globals } from './utils';
import pyramid_loc from './assets/maps/pyramid/pyramid.png';
import test_map_loc from './assets/maps/test/test_map.png';
import { pyramid_platform_data } from './assets/maps/pyramid/data';
import { test_map_platform_data, test_map_surface_data } from './assets/maps/test/data';

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
        down: {pressed: false},
        fire_weapon: {pressed: false}
    };
    
    const map = new Terrain(test_map_loc);
    map.load({
        surface_data: test_map_surface_data,
        platform_data: test_map_platform_data
    });    
    
    const player = new Player({
        position: {x: 100, y: canvas.height - 100},
        surface_blocks: map.surface_blocks,
        platform_blocks: map.platform_blocks
    });

    const enemy = new Enemy({
        position: {
            x: 100,
            y: 100
        },
        surface_blocks: map.surface_blocks,
        platform_blocks: map.platform_blocks
    });

    setInterval(() => {
        enemy.fire_weapon();
    }, 2000);

    const animate = () => {
        requestAnimationFrame(animate);

        map.render(ctx);
        player.render(ctx, globals.BULLETS);
        enemy.render(ctx, globals.BULLETS);



        // Player movement
        if (keys.right.pressed) {
            player.direction = 'right';
            if (player.velocity.x < globals.MAX_PLAYER_SPEED) {
                player.velocity.x += globals.ACCELERATION;
            };
        } else if (keys.left.pressed) {
            player.direction = "left";
            if (player.velocity.x > -globals.MAX_PLAYER_SPEED) {
              player.velocity.x -= globals.ACCELERATION;
            };
        };

        // Fire bullet
        if (keys.fire_weapon.pressed) player.fire_weapon();


        // Update globals-bullets
        globals.BULLETS.forEach(bullet => {
            if (bullet.position.x < -bullet.width || bullet.position.x > globals.GAME_WIDTH + bullet.width) bullet.marked_for_deletion = true
        });
        globals.BULLETS = globals.BULLETS.filter(bullet => !bullet.marked_for_deletion);
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

            case 's':
            case 'ArrowDown':
                keys.down.pressed = true;
                player.platform_drop();
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

        case "s":
        case "ArrowDown":
          keys.down.pressed = false;
          break;

        case "p":
          keys.fire_weapon.pressed = false;
          break;
      }
    });
});