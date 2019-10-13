const { pbkdf2Sync } = require('crypto');

const encrypt = password => {
  const hash = pbkdf2Sync(
    password,
    process.env.PASSWORD_SALT,
    Number(process.env.PASSWORD_ITERATIONS),
    Number(process.env.PASSWORD_KEYLEN),
    process.env.PASSWORD_DIGEST
  );

  if (!hash) {
    throw new Error('Ocorreu um erro ao tentar cryptografar a senha');
  }

  return hash.toString('hex');
};

const isValidPassword = (password, hash) => {
  return hash === encrypt(password);
};

module.exports = {
  encrypt: encrypt,
  isValidPassword: isValidPassword
};
