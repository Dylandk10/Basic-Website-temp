var userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

var Player = mongoose.model('player', userSchema);
module.exports = {
  Player
};
