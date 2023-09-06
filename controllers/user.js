// const User = require('../models/User');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const { where } = require('sequelize');

const register = async (req, res) => {
  const { role, name, email, password } = req.body;

  // console.log('Register endpoint reached');
  // console.log('req.body:', req.body);

  try {
    const existingUser = await User.findOne({ where: { email } });
    console.log('existingUser:', existingUser);

    if (existingUser) {
      console.log('User with email already exists');
      return res.status(400).json({ message: 'Email sudah terdaftar.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    // console.log('hashedPassword:', hashedPassword);

    const newUser = await User.create({
      role,
      name,
      email,
      password: hashedPassword
    });
    // console.log('newUser:', newUser);

    res.status(201).json({ message: 'Registrasi berhasil.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Terjadi kesalahan pada server.' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Cari user berdasarkan email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Email atau password salah.' });
    }

    // Verifikasi password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Email atau password salah.' });
    }

    // Buat token JWT
    const token = jwt.sign({ id: user.id, email: user.email }, 'secretKey');

    // Kirim respons dengan token dan data user seperti nama dan email
    res.status(200).json({
      message: 'Login berhasil.',
      token,
      user : {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Terjadi kesalahan pada server.' });
  }
};

// Middleware untuk verifikasi token

const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findOne({where: { id }});

    if (user) {
      return res.status(200).json({
        success: user,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: 'Tidak ada detail data!',
        data: 'Kosong!',
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: 'Terjadi kesalahan pada server.',
    });
  }
};

const changePassword = async (req, res) => {
  try {
    const { user_id, old_password, new_password, confirm_password } = req.body;

    // Cek apakah konfirmasi password sesuai dengan password baru
    if (new_password !== confirm_password) {
      return res.status(400).json({ message: 'Konfirmasi password tidak sesuai' });
    }

    // Cari user berdasarkan ID
    const user = await User.findByPk({user_id, where:{}});

    // Cek apakah user ditemukan
    if (!user) {
      return res.status(404).json({ message: 'User tidak ditemukan' });
    }

    // Cek apakah password lama sesuai
    if (!user.validPassword(old_password)) {
      return res.status(401).json({ message: 'Password lama tidak sesuai' });
    }

    const hashedPassword = await bcrypt.hash(new_password, 10);

    // Update password baru
    user.password = hashedPassword;
    await user.save();

    return res.json({ message: 'Password berhasil diubah' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { role, name } = req.body;

  try {
    const user = await User.findOne({where: { id }});


    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        data: null,
      });
    }

    user.role = role;
    user.name = name;

    await user.save();

    const token = jwt.sign({ id: user.id }, 'secret_key'); // Replace 'secret_key' with your actual secret key

    return res.status(200).json({
      token,
      message: 'Successfully updated data',
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      data: null,
    });
  }
};





module.exports = {
  register, login, getUserById, changePassword,  updateUser
};
