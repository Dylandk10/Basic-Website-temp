//this is the hold player function and match random player function
var hold = [];
var sendToGame = [];
var playerHolder = (user) {
  hold.push(user)
  if(hold.length >= 2) {
    playerMatch();
  } else {
    console.log('Waiting for player');
  }
};
var playerMatch = () => {
  var random1 = Math.random() * hold.length + 1;
  var random2 = Math.random() * hold.length + 1;
  for(var i = 0; i < hold.length; i++) {
    return sendToGame.push(hold[random1], hold[random2]);
  }

};
module.export = {
  playerHolder,
  playerMatch
}
