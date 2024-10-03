const argon2 = require('argon2');

export async function verifyPassword(hash :string, plainPassword :string) {
  try {
    if (await argon2.verify(hash, plainPassword)) {
      console.log('Password matches');
      return true
    } else {
      console.log('Password does not match');
      return false
    }
  } catch (err) {
    console.error('Error verifying password:', err);
    return false
  }
}