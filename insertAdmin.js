const bcrypt = require('bcrypt');
const mysql = require('mysql2/promise');

// 🔐 Hardcoded admin credentials
const email = 'admin@example.com';
const password = 'YourSecurePassword123';

// 🔧 Hardcoded database configuration
const dbConfig = {
  host: 'localhost',       // 👉 Your DB host
  user: 'root',            // 👉 Your DB user
  password: 'root', // 👉 Your DB password
  database: 'admin_microservices_backend'  // 👉 Your DB name
};

const insertAdmin = async () => {
  try {
    const connection = await mysql.createConnection(dbConfig);

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await connection.execute(
      `INSERT INTO admins (email, password_hash) VALUES (?, ?)`,
      [email, hashedPassword]
    );

    console.log(`✅ Admin inserted with ID: ${result.insertId}`);
    await connection.end();
  } catch (error) {
    console.error('❌ Error inserting admin:', error.message);
  }
};

// 🚀 Run
insertAdmin();
