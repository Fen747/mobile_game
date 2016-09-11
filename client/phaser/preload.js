let _squares;

const preload = ( ) => {
  Game.stage.disableVisibilityChange = true;

  Game.load.image('background', 'assets/background.png');
  Game.load.spritesheet('square', 'assets/square.png', 32, 48);
};

const create = ( ) => {
  // FPS
  Game.time.desiredFps = 25;

  Game.physics.startSystem( Phaser.Physics.ARCADE );
  game.add.sprite(0, 0, 'background');

  _squares = Game.add.group();
  _squares.enableBody = true;

  // On définit la taille du monde
  Game.world.setBounds(0, 0, 1920, 600);
  Game.canvas.oncontextmenu = event => { event.preventDefault(); };

  // On fait en sorte que le jeu se redimensionne selon la taille de l'écran
	Game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	Game.scale.setShowAll();
	window.addEventListener( 'resize', () => { Game.scale.refresh(); });
	Game.scale.refresh();
};

const update = ( ) => {

};

Functions = {
  preload,
  create,
  update
};
