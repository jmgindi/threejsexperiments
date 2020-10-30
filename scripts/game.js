import BoardController from './boardController.js';

export default class Game {
    constructor(options) {
        this.options = options || {};
        this.boardController = null;
    }

    init() {
        this.boardController = new BoardController({
            containerE1: this.options.containerE1,
            assetsUrl: this.options.assetsUrl
        });

        this.boardController.drawBoard();
    }
};
