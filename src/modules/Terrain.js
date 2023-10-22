import { globals } from "../utils";
import SurfaceBlock from "./SurfaceBlock";
import PlatformBlock from "./PlatformBlock";

export default class Terrain {
	constructor(image_src) {
		this.image = new Image();
		this.image.src = image_src;
		this.map2d = [];
		this.surface_blocks = [];
		this.platform_blocks = [];
	};
	
	load_surface(surface_data) {
		this.map2d = [];
		for (let i = 0; i < surface_data.length; i += 50) {
			this.map2d.push(surface_data.slice(i, i + 50));
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
		
	load_platforms(platform_data) {
			this.map2d = [];
			for (let i = 0; i < platform_data.length; i += 50) {
				this.map2d.push(platform_data.slice(i, i + 50));
			}
			
			this.map2d.forEach((row, y) => {
				row.forEach((box, x) => {
					if (box !== 0) {
						this.platform_blocks.push(
							new PlatformBlock({
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
			
			
	load({surface_data = [], platform_data = []}) {
		this.load_surface(surface_data);
		this.load_platforms(platform_data);	
	};
			
	render(context) {
		context.drawImage(this.image, 0, 0, globals.GAME_WIDTH, globals.GAME_HEIGHT);
		
		// Draw translucent boxes over surface blocks
		//this.surface_blocks.forEach(block => block.render(context));
		//this.platform_blocks.forEach(block => block.render(context));
	};
};