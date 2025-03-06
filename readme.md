## Express.js Authentication

Authentication adalah proses untuk memverifikasi identitas pengguna. Proses ini biasanya melibatkan:

1. Login: Pengguna memasukkan kredensial seperti username dan password.
2. Verifikasi: Server memeriksa kredensial tersebut terhadap data yang tersimpan (misalnya, di database).
3. Token: Jika kredensial valid, server mengirimkan token (seperti JWT) atau membuat session yang menandakan bahwa pengguna telah terautentikasi.

### JWT (JSON Web Token)

[JWT](https://datatracker.ietf.org/doc/html/rfc7519) adalah suatu standar untuk mengirimkan data dengan aman antara 2 pihak.

Terdapat 3 bagian dari JWT:

1. Header: Berisi informasi tentang tipe token dan algoritma yang digunakan.
2. Payload: Berisi data atau informasi tentang pengguna.
3. Signature: Digunakan untuk memastikan bahwa token tidak diubah.

#### Kapan menggunakan JWT

JWT didesain untuk stateless app, yang berarti aplikasi tsb tidak menyimpan state di dalamnya, sebagai contoh aplikasi mobile atau aplikasi front-end yang memiliki server sendiri (seperti Next.js, SPA (single page application)).

Sedangkan aplikasi berbasis website tradisional umumnya menggunakan session cookie.

#### Cara kerja JWT

Ketika server membuat JWT, dia menandatangani token tersebut menggunakan algoritma kriptografi (seperti HMAC SHA256 atau RSA). Tanda tangan ini memastikan bahwa data dalam token tidak dapat diubah tanpa diketahui.

#### Implementasi JWT di Express.js

1. Install dependency dan dev-dependency

```
npm install jsonwebtoken && npm install --save-dev @types/jsonwebtoken
```

2. Buat helper untuk generate dan sign JWT

https://www.npmjs.com/package/jsonwebtoken#usage

`./src/helper/jwt.ts`

```typescript
import jwt from 'jsonwebtoken'

const generateToken = (payload, expiresIn) => {
  return jwt.sign(payload, 'secret_key', {
    expiresIn,
  })
}

const verifyToken = (token: string) => {
  return jwt.verify(token, 'secret_key')
}

export {
  generateToken,
  verifyToken,
}

```

Fungsi di atas berjalan secara synchronous, agar tidak membebani server, kita bisa ubah menjadi asynchronous dengan menggunakan `Promise`

```typescript
import jwt from 'jsonwebtoken'

const generateToken = async (payload, expiresIn) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, 'secret_key', {
      expiresIn,
    }, (err, encoded) => {
      if (err) {
        return reject(err)
      }
      resolve(encoded)
    })
  })
}

const verifyToken = async (token: string) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, 'secret_key', (err, decodeToken) => {
      if (err) {
        return reject(err)
      }
      resolve(decodeToken)
    })
  })
}

export {
  generateToken,
  verifyToken,
}

```

4. Buat router

`./src/routes/jwt.ts`
```typescript
import express from 'express'
import jwt from '../helpers/jwt'

const jwtRoutes = express.Router()

const user = { id: 1, username: 'user' }

jwtRoutes.post('/login', async (req, res) => {
  const token = await jwt.generateToken(user, '1d')
  res.json({ token })
})

jwtRoutes.post('/verify', express.json(), async (req, res) => {
  const token = req.body.token
  const decoded = await jwt.verifyToken(token)
  res.json({ decoded })
})

export default jwtRoutes
```

5. Sesuaikan app.ts

### Session Cookie

Session-cookie-based authentication adalah metode autentikasi di mana informasi sesi pengguna disimpan di server setelah pengguna berhasil login, kemudian dikirim ke client dalam bentuk cookie.

#### Cara Kerja Session-Cookie-Based Authentication

1. Login: Pengguna memasukkan kredensial (seperti username dan password) untuk login.
2. Membuat Sesi: Jika kredensial valid, server membuat sesi untuk pengguna tersebut dan menyimpan informasi sesi di memori atau database.
3. Mengirim ID Sesi: Server mengirimkan ID sesi ke klien (browser) dalam bentuk cookie.
4. Menggunakan ID Sesi: Setiap kali pengguna mengirim permintaan ke server, cookie yang berisi ID sesi dikirim bersama permintaan tersebut.
5. Memverifikasi Sesi: Server memverifikasi ID sesi yang diterima dari klien. Jika ID sesi valid, server menganggap pengguna sudah terautentikasi dan memproses permintaan.

#### Implementasi Session-cookie di Express.js

1. Install dependency dan dev-dependency

```
npm i express-session && npm i -D @types/express-session
```

2. Buat routes untuk session

`./src/routes/session.ts`

```typescript
import express, { Request, Response } from 'express'
import session from 'express-session'

const sessionRoutes = express.Router()

const user = { id: 1, username: 'user' }

sessionRoutes.use(session({
  secret: 'secret_key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 1 day
    httpOnly: true,
  },
}))

declare module 'express-session' {
  interface SessionData {
    userId: number
  }
}

sessionRoutes.post('/login', (req, res) => {
  req.session.userId = user.id
  res.json({ user })
})

sessionRoutes.post('/verify', (req: Request, res: Response) => {
  if (req.session.userId) {
    res.json({
      user,
    })
    return
  }
  res.status(401).json({ message: 'Unauthorized: Please login' })
})

sessionRoutes.post('/logout', (req: Request, res: Response) => {
  if (req.session.userId) {
    req.session.destroy((err) => {
      if (err) {
        res.status(500).json({ message: 'Error logging out' })
        return
      }
      res.clearCookie('connect.sid')
      res.json({ message: 'Logout successful' })
      return
    })
  } else {
    res.status(401).json({ message: 'Unauthorized: Please login' })
  }
})

export default sessionRoutes
```

## Struktur project

Alih-alih menempatkan semua kode di dalam 1 file, project yang baik memiliki stuktur yang memudahkan developer-nya dalam manajemen kode.

### Clean Architecture

Clean Architecture dipopulerkan oleh Uncle Bob, inti dari clean architecture adalah modularisasi kode.

Modularisasi kode adalah praktik memecah kode program menjadi bagian-bagian kecil yang disebut modul, di mana setiap modul memiliki tanggung jawab atau fungsi spesifik.

Manfaat dari clean architecture:

1. Pemisahan Tanggung Jawab:

Setiap modul memiliki tugas atau fungsi spesifik, sehingga memudahkan pengelolaan dan pemahaman kode.

2. Reusabilitas:

Modul dapat digunakan kembali di berbagai bagian aplikasi atau bahkan di proyek lain, mengurangi redundansi dan meningkatkan efisiensi.

3. Pemeliharaan:

Memudahkan pemeliharaan kode karena perubahan pada satu modul tidak mempengaruhi modul lain. Ini juga memudahkan debugging dan pengujian.

4. Kolaborasi Tim:

Memungkinkan beberapa pengembang untuk bekerja pada modul yang berbeda secara bersamaan tanpa menyebabkan konflik kode.

5. Skalabilitas:

Memudahkan penambahan fitur baru atau perubahan pada aplikasi tanpa mengganggu struktur yang ada.

6. Testabilitas:

Memungkinkan pengujian modul secara terpisah, sehingga lebih mudah untuk menemukan dan memperbaiki bug.

Contoh: https://github.com/masfahru/open-forum-api

### Mainstream Express.js modularization

Project Express.js umumnya menggunakan sistem modularisasi yang terdiri dari pemisahan kode-kode berikut:

- routes/: berisi route.
- middlewares/: berisi middleware.
- controllers/: berisi route handler yang menangani request dan response.
- services/: berisi logika yang dibutuhkan oleh controller.
- repository/: berisi data manajemen yang dibutuhkan oleh controller.
- models/: berisi model yang mendefinisikan data structure pada database.
- configs/: berisi konfigurasi untuk aplikasi.
- helpers/: berisi fungsi-fungsi pembantu yang bisa dipakai di seluruh aplikasi.
- app.ts: aplikasi Express.js

### Struktur folder untuk modular architecture

Dengan mengikuti modularisasi sebelumnya, maka bisa kita buat folder seperti berikut ini:

```
./src
├── app.ts
├── configs
│   ├── env.ts
│   └── postgres
│       └── db.ts
├── controllers
│   └── users
│       ├── user-controller.ts
│       └── user-validation.ts
├── helpers
│   └── custom-errors
│       ├── custom-error.ts
│       └── not-found-error.ts
├── middlewares
│   └── auth-middleware.ts
├── models
│   └── user.ts
├── repositories
│   └── use-repository.ts
├── routes
│   └── user-routes.ts
└── services
    └── user-service.ts
```

### Struktur folder untuk feature-based modularization

Feature-based modularization adalah modularisasi yang memetakan kode sesuai feature namun masih menerapkan modularisasi.

Contoh:

```
./src
├── config
│   ├── database.js         # Database configuration
│   ├── environment.js      # Environment variables configuration
│   └── index.js            # Exports all configs
├── features
│   ├── user
│   │   ├── controllers
│   │   │   ├── authController.js     # User authentication logic
│   │   │   └── userController.js     # User CRUD operations
│   │   ├── middlewares
│   │   │   ├── isAuthenticated.js    # Authentication check middleware
│   │   │   └── validateUser.js       # User data validation
│   │   ├── models
│   │   │   └── User.js               # User data model
│   │   ├── routes
│   │   │   ├── authRoutes.js         # Authentication routes
│   │   │   └── userRoutes.js         # User CRUD routes
│   │   ├── services
│   │   │   ├── authService.js        # Authentication business logic
│   │   │   └── userService.js        # User business logic
│   │   └── index.js                  # Exports all user feature components
│   ├── product
│   │   ├── controllers
│   │   │   └── productController.js
│   │   ├── middlewares
│   │   │   └── validateProduct.js
│   │   ├── models
│   │   │   └── Product.js
│   │   ├── routes
│   │   │   └── productRoutes.js
│   │   ├── services
│   │   │   └── productService.js
│   │   └── index.js
│   └── order
│       ├── controllers
│       │   └── orderController.js
│       ├── middlewares
│       │   └── validateOrder.js
│       ├── models
│       │   └── Order.js
│       ├── routes
│       │   └── orderRoutes.js
│       ├── services
│       │   └── orderService.js
│       └── index.js
├── utils
│   ├── logger.js           # Logging utility
│   ├── errors.js           # Error handling utilities
│   └── validators.js       # Common validation helpers
├── middlewares
│   ├── authMiddleware.js   # Authentication middleware
│   ├── errorHandler.js     # Global error handling middleware
│   └── requestLogger.js    # Request logging middleware
├── app.js                  # Express application setup
```

### Naming convention

Penamaan folder dan file pada project Express.js harus konsisten, misalkan jika formatnya adalah `kebab-case` maka semua penamaan folder dan file menggunakan format tsb.
