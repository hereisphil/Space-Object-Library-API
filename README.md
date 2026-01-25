# Space Object Library API

This is a RESTful API built with Node.js, Express, and Sequelize ORM to manage Galaxies, Stars, and Planets, including many-to-many relationships.

## 🔗 YouTube Demo

Watch the full walkthrough of CRUD operations using cURL:

👉 <https://youtu.be/4MDmc1oSNpI>

## 🚀 Features

- **Galaxies** – Create, Read, Update, Delete
- **Stars** – Create, Read, Update, Delete
- **Planets** – Create, Read, Update, Delete
- **Many-to-Many**: Planets can be linked to multiple Stars

## 🛠 Tech Stack

- Node.js
- Express
- Sequelize ORM
- MySQL

## 📌 Run the Server

```bash
docker compose up
```

Server runs on: <http://localhost:3000>

📍 Routes

Galaxies

```bash
GET    /galaxies
POST   /galaxies
GET    /galaxies/:id
PUT    /galaxies/:id
DELETE /galaxies/:id
```

Stars

```bash
GET    /stars
POST   /stars
GET    /stars/:id
PUT    /stars/:id
DELETE /stars/:id
```

Planets

```bash
GET    /planets
POST   /planets
GET    /planets/:id
PUT    /planets/:id
DELETE /planets/:id
POST   /planets/:id/stars/:starId
```

📌 Example cURL

Create a planet:

```bash
curl -X POST -H "Content-Type: application/json" \
  -d '{"name":"Earth","mass":123456,"size":10033,"isGasGiant":false,"description":"Habitable planet"}' \
  http://localhost:3000/planets
```

---

## 👋 Author

Hi! I’m Phillip Cantu, a current [Full Sail University](https://www.fullsail.edu/) web development student, _expected graduation February 2027_, and a [4Geeks Academy Full Stack](https://www.phillipcantu.com/certificate.pdf) bootcamp graduate.

- **GitHub:** [hereisphil](https://github.com/hereisphil)
- **LinkedIn:** [phillipcantu](https://www.linkedin.com/in/phillipcantu/)
- **Email:** [thereisphil@gmail.com](mailto:thereisphil@gmail.com)
