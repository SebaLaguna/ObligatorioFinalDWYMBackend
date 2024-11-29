const mongoose = require('mongoose');
const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const bcrypt = require('bcryptjs');

// Conectar a la base de datos
mongoose.connect('mongodb://localhost:27017/instagram', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Conectado a MongoDB'))
.catch((err) => console.error('Error conectando a MongoDB', err));

// Función para crear usuarios
const createUsers = async () => {
  const users = [];
  for (let i = 0; i < 20; i++) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);
    users.push(new User({
      username: `user${i}`,
      email: `user${i}@example.com`,
      password: hashedPassword,
      profilePicture: `https://robohash.org/${i}.png`,
    }));
  }
  await User.insertMany(users);
  console.log('Usuarios creados');
  return users;
};

// Función para crear publicaciones
const createPosts = async (users) => {
  const posts = [];
  for (let i = 0; i < 7; i++) {
    const randomUser = users[Math.floor(Math.random() * users.length)];
    posts.push(new Post({
      user: randomUser._id,
      imageUrl: `uploads\\0${i}.jpeg`,
      caption: `Caption for post ${i}`,
    }));
  }
  await Post.insertMany(posts);
  console.log('Publicaciones creadas');
  return posts;
};

// Función para crear comentarios
const createComments = async (users, posts) => {
  const comments = [];
  for (let i = 0; i < 50; i++) {
    const randomUser = users[Math.floor(Math.random() * users.length)];
    const randomPost = posts[Math.floor(Math.random() * posts.length)];
    comments.push(new Comment({
      user: randomUser._id,
      post: randomPost._id,
      content: `This is comment ${i} on post ${randomPost.caption}`,
    }));

    // Agregar el comentario al post correspondiente
    randomPost.comments.push(comments[i]._id);
    await randomPost.save();
  }
  await Comment.insertMany(comments);
  console.log('Comentarios creados');
};

// Función principal para poblar la base de datos
const seedDatabase = async () => {
  try {
    await User.deleteMany({});
    await Post.deleteMany({});
    await Comment.deleteMany({});

    const users = await createUsers();
    const posts = await createPosts(users);
    await createComments(users, posts);

    console.log('Base de datos poblada');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error poblando la base de datos', error);
    mongoose.connection.close();
  }
};

// Ejecutar la función principal
seedDatabase();
