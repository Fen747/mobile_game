let _squares,
    _mySquares = [],
    _cursors;

const _worldWidth = 800,
      _worldHeight = 600;

const preload = ( ) => {
  Game.stage.disableVisibilityChange = true;

  Game.load.spritesheet('square', '/square.png', 8, 8);
  Game.load.spritesheet('defenseBlock', '/defense.png', 8, 32);
};

const create = ( ) => {
  // FPS
  Game.time.desiredFps = 60;

  _cursors = Game.input.keyboard.createCursorKeys();

  Game.physics.startSystem( Phaser.Physics.ARCADE );
  Game.stage.backgroundColor = "#EEEEEE";

  _squares = Game.add.group();
  _squares.enableBody = true;

  // On définit la taille du monde
  Game.world.setBounds( 0, 0, _worldWidth, _worldHeight );
  Game.canvas.oncontextmenu = event => { event.preventDefault(); };

  // On fait en sorte que le jeu se redimensionne selon la taille de l'écran
	Game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	Game.scale.setShowAll();
	window.addEventListener( 'resize', () => { Game.scale.refresh(); } );
	Game.scale.refresh();
};

const update = ( ) => {
  let i = -1,
      currenItem,
      killedThisTurn = [];

  for ( let line in Squares.attacking ) {
    while ( Squares.attacking[ line ][ ++i ] ) {
      Squares.attacking[ line ][ i ].body.velocity.y = -Stats.attack.speed;

      if ( !Squares.attacking[ line ][ i ].position.y ) {
        Squares.attacking[ line ][ i ].destroy();
        Squares.attacking[ line ][ i ] = null;

        let isThereDefenses = false,
            attackIsValid = false,
            attackStrength = Stats.attack.strength,
            j = -1;

        while ( Squares.defending[ line ].length > ++j ) {
          if ( Squares.defending[ line ] ) {
            isThereDefenses = true;
            break;
          }
        }

        if ( isThereDefenses ) {
          if ( Squares.defending[ line ][ j ] ) {
            Squares.defending[ line ][ j ].destroy();
            Squares.defending[ line ][ j ] = null;
            console.log("defended");
          } else {
            throw new Meteor.Error( 'Tried to destroy a already null defense block' );
          }

          if ( Me.get('attackStrength') > Ennemy.get('defenseStrength') ) {
            // if the attack strength is higher than the defense's,
            // then substract the delta to player's life
            attackIsValid = true;
            attackStrength = Me.get('attackStrength') - Ennemy.get('defenseStrength');
          }
        } else if ( Ennemy.get('life') > 0 ) {
          attackIsValid = true;
        }

        if ( attackIsValid ) {
          Ennemy.set( 'life', Math.floor( Ennemy.get('life') - attackStrength ) );
          console.log( Ennemy.get('life') );

          if ( Ennemy.get('life') <= 0 ) {
            alert( "you won!" );
          }
        }
      }
    }
    _.pull( Squares.attacking[ line ], null );
    _.pull( Squares.defending[ line ], null );
  }
};

Functions = {
  preload,
  create,
  update
};
