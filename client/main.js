import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

$( document ).ready( event => {
  Game = new Phaser.Game( GAME_WIDTH, GAME_HEIGHT, Phaser.AUTO, 'divGame', {
    preload : Functions.preload,
    create  : Functions.create,
    update  : Functions.update
  } );
  
  window.addEventListener( 'resize', () => { Game.scale.refresh(); });
});
