import * as SQLite from 'expo-sqlite';

// Initialisiert die Datenbank
export const initDB = async () => {
  console.log('initDB');
  try {
    const db = await SQLite.openDatabaseAsync('PickMe');
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS User (
        user_id INTEGER PRIMARY KEY NOT NULL UNIQUE,
        username TEXT NOT NULL,
        email TEXT NOT NULL,
        password TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS Category (
        category_id INTEGER PRIMARY KEY NOT NULL,
        name TEXT NOT NULL,
        description TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS Product (
        product_id INTEGER PRIMARY KEY NOT NULL,
        category_id INTEGER NOT NULL,
        name TEXT NOT NULL,
        description TEXT NOT NULL,
        price REAL NOT NULL,
        evaluation INTEGER
      );
    `);
    console.log('Tables initialized successfully');
  } catch (e) {
    console.error('Error initializing DB:', e);
  }
};

// Fügt initiale Daten in die Datenbank ein
export const insertDB = async () => {
  console.log('insertDB');
  try {
    const db = await SQLite.openDatabaseAsync('PickMe');
    await db.execAsync(`
      INSERT OR IGNORE INTO User (user_id, username, email, password) VALUES
      (1, 'john_doe', 'john.doe@example.com', 'securepassword123'),
      (2, 'jane_smith', 'jane.smith@example.com', 'anotherpassword456');
      INSERT OR IGNORE INTO Category (category_id, name, description) VALUES
      (1, 'Electronics', 'Devices and gadgets'),
      (2, 'Clothing', 'Apparel and fashion'),
      (3, 'Books', 'Printed or digital books');
    `);
    console.log('Data inserted successfully');
  } catch (e) {
    console.error('Error inserting data:', e);
  }
};

// Wählt alle Benutzer aus der Tabelle "User" aus
export const selectUser = async () => {
  console.log('selectUser');
  try {
    const db = await SQLite.openDatabaseAsync('PickMe');
    const result = await db.getAllAsync('SELECT * FROM User');
    console.log('User Table:', result);
  } catch (e) {
    console.error('Error selecting users:', e);
  }
};
