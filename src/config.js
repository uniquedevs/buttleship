export const BOARD_SIZE = 10;
export const L_SHIP_ASPECT_RATIO = 0.5;
// export const STATE_MAP = {
//     0: 'empty',
//     [BOARD_SIZE * BOARD_SIZE + 1] : 'sink',
//     [BOARD_SIZE * BOARD_SIZE + 2] : 'missed'
// };

export const STATE_MAP = {
    'empty' : 0,
    'sink' : BOARD_SIZE * BOARD_SIZE + 1,
    'missed' : BOARD_SIZE * BOARD_SIZE + 2
};