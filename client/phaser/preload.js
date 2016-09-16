let _squares,
    _mySquares = [],
    _cursors;

const _speed = 250,
      _worldWidth = 800,
      _worldHeight = 600;

Lines = {
  attack: {
    a: 600,
    b: 550,
    c: 650
  },

  defense: {
    a: 200,
    b: 150,
    c: 250
  }
};

const preload = ( ) => {
  Game.stage.disableVisibilityChange = true;

  //Game.load.image('background', 'assets/background.png');
  Game.load.spritesheet('square', '/square.png', 8, 8);
};

const create = ( ) => {
  // FPS
  Game.time.desiredFps = 40;

  _cursors = Game.input.keyboard.createCursorKeys();

  Game.physics.startSystem( Phaser.Physics.ARCADE );
  Game.stage.backgroundColor = "#EEEEEE";

  /*
  _mySquares = Game.add.sprite( Lines.attack.a, 600, 'square');
  Game.physics.arcade.enable( _mySquares );
  _mySquares.body.collideWorldBounds = true;
  */
  //mySquare.body.gravity.y = 300;

  _squares = Game.add.group();
  _squares.enableBody = true;

  // On définit la taille du monde
  Game.world.setBounds(0, 0, _worldWidth, _worldHeight);
  Game.canvas.oncontextmenu = event => { event.preventDefault(); };

  // On fait en sorte que le jeu se redimensionne selon la taille de l'écran
	Game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	Game.scale.setShowAll();
	window.addEventListener( 'resize', () => { Game.scale.refresh(); });
	Game.scale.refresh();
};

const update = ( ) => {
  /*
  _mySquares.body.velocity.x = 0;
  _mySquares.body.velocity.y = -_speed;
  */
  let i = -1;
  let currenItem,
      killedThisTurn = [];

  for ( let line in Squares.attacking ) {
    while ( Squares.attacking[ line ][ ++i ] ) {
      Squares.attacking[ line ][ i ].body.velocity.y = -_speed;

      if ( !Squares.attacking[ line ][ i ].position.y ) {
        Squares.attacking[ line ][ i ].destroy();
        Squares.attacking[ line ][ i ] = null;
      }
    }
    _.pull( Squares.attacking[ line ], null );
  }
};

Functions = {
  preload,
  create,
  update
};
