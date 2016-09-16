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

Template.game.events({
  "click .js-attack" ( e, instance ) {
    if ( attackStack ) {
      --attackStack;

      let newSquare = Game.add.sprite( Lines.attack.a, 600, 'square');

      Game.physics.arcade.enable( newSquare );
      newSquare.body.collideWorldBounds = true;
      newSquare.outOfBoundsKill = true;
      Squares.attacking[ e.target.dataset.line ].push( newSquare );
      console.log(Squares.attacking.a);
    }
  }
});

attackStack = 2;

intervalId = setInterval( () => {
  if ( attackStack < 2 ) {
    attackStack++;
  }
}, 1000);
