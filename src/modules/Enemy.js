import Player from "./Player";

export default class Enemy extends Player{
    constructor({position, surface_blocks, platform_blocks}) {
        super({position, surface_blocks, platform_blocks});
    };
};