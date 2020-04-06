const bcrypt = require('bcryptjs')

const encrypt = (password) => {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(myPlaintextPassword, salt);
}