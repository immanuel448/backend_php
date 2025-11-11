# 🛡️ backend_php

Sistema de acceso seguro en PHP para el proyecto **“Una Historia Simple?”**.

## 🔧 Características
- Autenticación mediante contraseña hasheada (`password_hash` / `password_verify`).
- Protección de páginas con sesiones (`$_SESSION`).
- Cierre de sesión manual y por inactividad.
- Compatible con hosting gratuito (InfinityFree, 000webhost, etc.).
- Sin dependencias externas: solo PHP 8+ y SQLite opcional.

## 📂 Estructura
backend_php/
│
├── acceso.php # Página de login
├── index.php # Página principal protegida
├── salir.php # Cierre de sesión
├── includes/
│ └── db.php # Configuración o acceso a hash/BD
└── assets/
├── css/
├── js/
└── img/

## ⚙️ Requisitos
- PHP 8 o superior  
- Servidor local (XAMPP, Laragon, etc.)

## 🚀 Ejecución
```bash
php -S localhost:8000
Luego abre http://localhost:8000/acceso.php



