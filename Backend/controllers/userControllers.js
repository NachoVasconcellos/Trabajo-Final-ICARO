const bcrypt = require("bcrypt");
const User = require("../models/index").User;
const createAccount = (req, res) => {
  const { ...newUser } = req.body;
  const { Name, Surname, Email, Address, Password, Telephone } = newUser;
  if (!Name || !Surname || !Email || !Address || !Password || !Telephone) {
    return res.status(500).json({
      message:
        "Debes ingresar Nombre, Apellido, Email, Dirección, Contraseña y Telefono",
    });
  }
  const saltRounds = 10;
  bcrypt.hash(Password, saltRounds, (error, hashedPassword) => {
    if (error) {
      return res.status(500).json({ message: "Error al hashear contraseña" });
    }
    const user = User.create({ ...newUser, Password: hashedPassword });
    res.json({ message: "Usuario creado exitosamente", data: user });
  });
};
const login = async (req, res) => {
  const { Email, Password } = req.body;
  const user = await User.findOne({ where: { Email } });
  bcrypt.compare(Password, user.Password, (error, result) => {
    if (error) {
      return res
        .status(400)
        .json({ message: "Error al comparar la contraseña" });
    }
    if (!result) {
      return res.status(400).json({ message: "Credenciales invalidas" });
    }
    res.status(200).json({
      message: "Inicio de sesión exitoso",
      data: { Email: user.Email, Telephone: user.Telephone, Name: user.Name, Surname: user.Surname, Address: user.Address, Id: user.id, isAdmin: user.isAdmin },
    });
  });
};
module.exports = { createAccount, login };