Functions = {};

Game = {};

Squares = {
  attacking: {
    a: [],
    b: [],
    c: []
  },

  defending: {
    a: [],
    b: [],
    c: []
  }
};

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

Stats = {
  attack: {
    speed         : 350,
    number        : 2000,
    strength      : 1500,
    stackingTime  : 2000,
    stackMax      : 3000
  },

  defense: {
    duration      : 750,
    strength      : 1000,
    stackMax      : 3000,
    stackingTime  : 2000
  },

  player: {
    life: 10000
  }
};

PixelOffset = {
  square  : 4,
  defense : 16
};

Ennemy = new ReactiveDict("ennemy");
Ennemy.set( 'life', Stats.player.life );
Ennemy.set( 'attackStrength', Stats.attack.strength );
Ennemy.set( 'defenseStrength', Stats.defense.strength );
Ennemy.set( 'attackStackMax', Stats.attack.stackMax );
Ennemy.set( 'defenseStackMax', Stats.defense.stackMax );
Ennemy.set( 'currentAttackStack', Stats.attack.stackMax );
Ennemy.set( 'currentDefenseStack', Stats.defense.stackMax );

Me = new ReactiveDict("myself");
Me.set( 'life', Stats.player.life );
Me.set( 'attackStrength', Stats.attack.strength );
Me.set( 'defenseStrength', Stats.defense.strength );
Me.set( 'attackStackMax', Stats.attack.stackMax );
Me.set( 'defenseStackMax', Stats.defense.stackMax );
Me.set( 'currentAttackStack', Stats.attack.stackMax );
Me.set( 'currentDefenseStack', Stats.defense.stackMax );
