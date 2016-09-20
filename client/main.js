import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import { percentage } from '/imports/library/functions.js';

import './main.html';

$( document ).ready( event => {
  Game = new Phaser.Game( GAME_WIDTH, GAME_HEIGHT, Phaser.AUTO, 'divGame', {
    preload : Functions.preload,
    create  : Functions.create,
    update  : Functions.update
  } );

  window.addEventListener( 'resize', () => { Game.scale.refresh(); });
});

Template.game.helpers({
  myLife () {
    return ( Math.floor( percentage( Me.get('life'), Stats.player.life ) ) );
  },

  ennemyLife () {
    return ( Math.floor ( percentage( Ennemy.get('life'), Stats.player.life ) ) );
  },

  myCurrentAttackStack () {
    return ( Me.get('currentAttackStack') );
  },

  myCurrentDefenseStack () {
    return ( Me.get('currentDefenseStack') );
  }
});

Template.game.events({
  "click .js-attack" ( e, instance ) {
    if ( Me.get('currentAttackStack') ) {
      Me.set('currentAttackStack', Me.get('currentAttackStack') - 1000 );

      let newSquare = Game.add.sprite( ( Lines.attack.a - PixelOffset.square ), 600, 'square');

      Game.physics.arcade.enable( newSquare );
      newSquare.body.collideWorldBounds = true;
      newSquare.outOfBoundsKill = true;
      Squares.attacking[ e.target.dataset.line ].push( newSquare );
      //console.log( Squares.attacking.a );
    }
  },

  "click .js-defend" ( e, instance ) {
    if ( Me.get('currentDefenseStack') ) {
      Me.set('currentDefenseStack', Me.get('currentDefenseStack') - 1000 );

      let newSquare = Game.add.sprite( ( Lines.attack.a - PixelOffset.defense ), 10, 'defenseBlock');

      Game.physics.arcade.enable( newSquare );
      newSquare.body.collideWorldBounds = true;
      newSquare.outOfBoundsKill = false;
      Squares.defending[ e.target.dataset.line ].push( newSquare );
      //console.log( Squares.defending.a );

      setTimeout( () => {
        let i = -1;

        while ( Squares.defending[ e.target.dataset.line ].length > ++i ) {
          if ( Squares.defending[ e.target.dataset.line ][ i ] === newSquare) {
            Squares.defending[ e.target.dataset.line ][ i ] = null;
          }
        }
        newSquare.destroy();
        newSquare = null;
        //Squares.defending[ e.target.dataset.line ].find( el => ( el === newSquare ) );
      }, Stats.defense.duration );
    }
  },
});

const intervalIdAttack = setInterval( () => {
  if ( Me.get('currentAttackStack') < Me.get('attackStackMax') ) {
    Me.set('currentAttackStack', Me.get('currentAttackStack') + 1000 );
  }
  //console.log("attackStack", attackStack);
}, Stats.attack.stackingTime);

const intervalIdDefense = setInterval( () => {
  if ( Me.get('currentDefenseStack') < Me.get('defenseStackMax') ) {
    Me.set('currentDefenseStack', Me.get('currentDefenseStack') + 1000 );
  }
  //console.log("defenseStack", defenseStack);
}, Stats.defense.stackingTime);
