import { globals } from "../utils";
import SurfaceBlock from "./SurfaceBlock";

export default class Terrain {
    constructor(image_src) {
        this.image = new Image();
        this.image.src = image_src;
        this.map2d = [];
        this.surface_blocks = [];
    };

    load(map_data) {
        for (let i = 0; i < map_data.length; i += 50) {
            this.map2d.push(map_data.slice(i, i + 50));
        };

         this.map2d.forEach((row, y) => {
           row.forEach((box, x) => {

            if (box !== 0) {
                this.surface_blocks.push(
                  new SurfaceBlock({
                    position: {
                      x: x * 16,
                      y: y * 16,
                    },
                  })
                );
            }
           });
         });

    };
    
    render(context) {
        context.drawImage(this.image, 0, 0, globals.GAME_WIDTH, globals.GAME_HEIGHT);

        // Draw translucent boxes over surface blocks
       this.surface_blocks.forEach(block => block.render(context));
    };
};