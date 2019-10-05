const md5 = require("md5");
const uuid = require("uuid");
const crypted = {
  hashPassword(cryptMethod, password, times) {
    return cryptMethod.hashSync(password, times);
  },
  comparePassword(cryptMethod, password, hashPassword) {
    return cryptMethod.compareSync(password, hashPassword);
  }
};

const customCrypt = {
  hashSync(password, times, salt) {
    const sauce = salt || uuid();
    let hash= md5(`${sauce}$${times}$${password}`);
    for (let i = 0; i < 2 ** times; i++) {
      hash = md5(hash);
    }
    hash = `$${sauce}$${times}$${hash}`
    return hash;
  },
  compareSync(password, hashPassword) {
    const passwordArray = hashPassword.split("$");
    const salt = passwordArray[1];
    const times = passwordArray[2];
    const encryptedPassword = customCrypt.hashSync(password, times, salt);
    return encryptedPassword === hashPassword
  }
};
module.exports = {
  crypted,
  customCrypt
};
