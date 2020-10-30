//import * as THREE from 'three';
// import '../js/three.js';
//import board from './board.js';
import Game from './game.js';



(function () {
    'use strict';

    const game = new Game ({
        containerE1: document.getElementById('boardContainer'),
        assetsURL: 'assets/'
    });

    game.init();
}) ();
