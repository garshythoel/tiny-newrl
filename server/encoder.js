const en = require('int-encoder');


const encode = id => {
  // encode to base 62
  return en.encode(id, 62);
}

const decode = hash => {
  return en.decode(hash, 62);
}

module.exports = {encode, decode};
