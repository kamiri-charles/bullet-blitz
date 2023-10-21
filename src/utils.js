export const globals = {
    GAME_WIDTH: 800,
    GAME_HEIGHT: 640,
    PLAYER_SPEED: 10,
    PLAYER_JUMP_HEIGHT: 15,
    GRAVITY: 0.9,
    MAX_JUMPS: 2,
    DIRECTION: 'right'
};

export const detect_rect_collision = ({object_1, object_2}) => {
    return (
        object_1.position.x <= object_2.position.x + object_2.width &&
        object_1.position.x + object_1.width >= object_2.position.x &&
        object_1.position.y <= object_2.position.y + object_2.height &&
        object_1.position.y + object_1.height >= object_2.position.y
    );
};


export const detect_platform_collision = ({object_1, object_2}) => {
    return (
        object_1.position.x <= object_2.position.x + object_2.width &&
        object_1.position.x + object_1.width >= object_2.position.x &&
        object_1.position.y + object_1.height <= object_2.position.y + object_2.height &&
        object_1.position.y + object_1.height >= object_2.position.y
    );
};


