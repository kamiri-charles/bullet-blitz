import Player from "./Player";
import { globals } from "../utils";

export default class Enemy extends Player{
    constructor({position, surface_blocks, platform_blocks}) {
        super({position, surface_blocks, platform_blocks});
    };
};