//import './boardController.js';

BOARDGAME = (options) => {
    'use strict';

    options = options || {};

    const boardController = null;

    function init() {
        boardController = new BOARDGAME.BoardController({
            containerE1: options.containerE1,
            assetsUrl: options.assetsUrl
        });

        boardController.drawBoard();
    }

    init();
};