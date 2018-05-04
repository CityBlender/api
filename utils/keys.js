require('dotenv').config();

// SongKick
sk_keys = [
  process.env.SK_KEY_1,
  process.env.SK_KEY_2,
  process.env.SK_KEY_3,
  process.env.SK_KEY_4
]

exports.getSongkickKey = function () {
  var random_key = sk_keys[Math.floor(Math.random() * sk_keys.length)];
  return random_key;
};
