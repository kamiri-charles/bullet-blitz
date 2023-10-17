import Player from './modules/Player';

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');
    /** @type {CanvasRenderingContext2D} */
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const keys = {
        up: {pressed: false},
        right: {pressed: false},
        down: {pressed: false},
        left: {pressed: false}
    };

    const player = new Player({
        canvas: canvas,
        position: {x: 100, y: 100}
    });

    const animate = () => {
        requestAnimationFrame(animate);

        // Render background
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Render surface
        ctx.fillStyle = 'black';
        ctx.fillRect(0, canvas.height - 100, canvas.width, canvas.height);

        player.render(ctx);


        // Player movement
        if (keys.right.pressed) {
            player.velocity.x = 10
        } else if (keys.left.pressed) {
            player.velocity.x = -10
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
                player.velocity.y = -15;
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