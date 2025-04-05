# XYZ - Servidor API

Este es el backend de **XYZ**, una red social sencilla diseñada para permitir a los usuarios crear contenido, interactuar entre sí y manejar su cuenta de manera segura. Proporciona una API REST robusta para ser consumida por cualquier cliente compatible.

Está desarrollado con **Express.js** y se conecta a una base de datos **MongoDB** para almacenar usuarios, publicaciones, comentarios y más.

---

## 🚀 Características

- **API RESTful**: Endpoints claros y bien estructurados para manejar todas las operaciones.
- **Autenticación con JWT**: Acceso seguro mediante tokens.
- **Gestión de usuarios y publicaciones**: Registro, login, CRUD de posts, comentarios y likes.
- **Recuperación de contraseña vía email**: Sistema de recuperación simple mediante tokens y correo electrónico.
- **Rutas protegidas**: Middleware para restringir el acceso a ciertos endpoints según autenticación.
- **Despliegue independiente**: Diseñado para funcionar por separado del frontend, ideal para arquitecturas desacopladas.

---

## 🛠️ Tecnologías Utilizadas

- **Node.js**
- **Express.js**
- **MongoDB + Mongoose**
- **JWT**
- **Nodemailer**
- **dotenv**
- **CORS + cookie-parser**
