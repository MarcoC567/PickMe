import * as SQLite from "expo-sqlite";

// Initialisiert die Datenbank
export const initDB = async () => {
  console.log("initDB");
  try {
    const db = await SQLite.openDatabaseAsync("PickMe");
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS User (
        user_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE,
        username TEXT NOT NULL,
        email TEXT NOT NULL,
        password TEXT NOT NULL
      );
  
      CREATE TABLE IF NOT EXISTS Cart (
        cart_id INTEGER PRIMARY KEY NOT NULL,
        user_id INTEGER NOT NULL,
        total_price REAL NOT NULL,
        FOREIGN KEY (user_id) REFERENCES User(user_id)
      );
  
      CREATE TABLE IF NOT EXISTS CartItem (
        cart_item_id INTEGER PRIMARY KEY NOT NULL,
        cart_id INTEGER NOT NULL,
        product_id INTEGER NOT NULL,
        quantity INTEGER NOT NULL,
        FOREIGN KEY (cart_id) REFERENCES Cart(cart_id),
        FOREIGN KEY (product_id) REFERENCES Product(product_id)
      );
  
      CREATE TABLE IF NOT EXISTS "Order" (
        order_id INTEGER PRIMARY KEY NOT NULL,
        user_id INTEGER NOT NULL,
        date TEXT NOT NULL,
        location TEXT,
        FOREIGN KEY (user_id) REFERENCES User(user_id)
      );
  
      CREATE TABLE IF NOT EXISTS Payment (
        payment_id INTEGER PRIMARY KEY NOT NULL,
        order_id INTEGER NOT NULL,
        payment_date TEXT NOT NULL,
        payment_method TEXT NOT NULL,
        payment_status TEXT NOT NULL,
        FOREIGN KEY (order_id) REFERENCES "Order"(order_id)
      );
  
      CREATE TABLE IF NOT EXISTS OrderDetail (
        detail_id INTEGER PRIMARY KEY NOT NULL,
        order_id INTEGER NOT NULL,
        product_id INTEGER NOT NULL,
        quantity INTEGER NOT NULL,
        FOREIGN KEY (order_id) REFERENCES "Order"(order_id),
        FOREIGN KEY (product_id) REFERENCES Product(product_id)
      );
  
      CREATE TABLE IF NOT EXISTS Product (
        product_id INTEGER PRIMARY KEY NOT NULL,
        category_id INTEGER NOT NULL,
        name TEXT NOT NULL,
        description TEXT NOT NULL,
        price REAL NOT NULL,
        evaluation INTEGER,
        FOREIGN KEY (category_id) REFERENCES Category(category_id)
      );
  
      CREATE TABLE IF NOT EXISTS Category (
        category_id INTEGER PRIMARY KEY NOT NULL,
        name TEXT NOT NULL,
        description TEXT NOT NULL
      );
    `);
  } catch (e) {
    console.error("error!: ", e);
  }
  console.log("TESTEST");
};
export const insertDB = async () => {
  console.log("insert stuff");
  try {
    const db = await SQLite.openDatabaseAsync("PickMe");
    const result = await db.execAsync(`
    INSERT OR IGNORE INTO Category (category_id, name, description) VALUES
    (1, 'Electronics', 'Devices and gadgets'),
    (2, 'Clothing', 'Apparel and fashion'),
    (3, 'Books', 'Printed or digital books');
    -- Insert into Product
    INSERT OR IGNORE INTO Product (product_id, category_id, name, description, price, evaluation) VALUES
    (1, 1, 'Smartphone', 'Latest model smartphone with amazing features', 599.99, 4),
    (2, 1, 'Laptop', 'High performance laptop for gaming and work', 999.99, 5),
    (3, 2, 'T-shirt', 'Cotton t-shirt with cool designs', 19.99, 3),
    (4, 3, 'The Great Gatsby', 'Classic novel by F. Scott Fitzgerald', 10.99, 5);
    -- Insert into User
    INSERT OR IGNORE INTO User (user_id, username, email, password) VALUES
    (1, 'john_doe', 'john.doe@example.com', 'securepassword123'),
    (2, 'jane_smith', 'jane.smith@example.com', 'anotherpassword456');
    -- Insert into Cart
    INSERT OR IGNORE INTO Cart (cart_id, user_id, total_price) VALUES
    (1, 1, 639.98),
    (2, 2, 1020.98);
    -- Insert into CartItem
    INSERT OR IGNORE INTO CartItem (cart_item_id, cart_id, product_id, quantity) VALUES
    (1, 1, 1, 1),
    (2, 1, 3, 1),
    (3, 2, 2, 1),
    (4, 2, 4, 1);
    -- Insert into Order
    INSERT OR IGNORE INTO "Order" (order_id, user_id, date, location) VALUES
    (1, 1, '2024-12-11', '123 Main St, Cityville'),
    (2, 2, '2024-12-10', '456 Elm St, Townsville');
    -- Insert into Payment
    INSERT OR IGNORE INTO Payment (payment_id, order_id, payment_date, payment_method, payment_status) VALUES
    (1, 1, '2024-12-11', 'Credit Card', 'Completed'),
    (2, 2, '2024-12-10', 'PayPal', 'Pending');
    -- Insert into OrderDetail
    INSERT OR IGNORE INTO OrderDetail (detail_id, order_id, product_id, quantity) VALUES
    (1, 1, 1, 1),
    (2, 1, 3, 1),
    (3, 2, 2, 1),
    (4, 2, 4, 1);
  `);
  } catch (e) {
    console.log("error: ", e);
  }
};

export const checkLoginCredentials = async (email, password) => {
  const db = await SQLite.openDatabaseAsync("PickMe");

  try {
    const result = await db.getFirstAsync(
      "SELECT * FROM User WHERE email = ? AND password = ?",
      [email, password]
    );

    return result; // Wenn der Benutzer existiert, wird der Benutzer zurückgegeben, andernfalls null.
  } catch (error) {
    console.log("Fehler bei der Anmeldung:", error);
    throw new Error("Es gab ein Problem bei der Anmeldung.");
  }
};

export const insertRegistration = async (username, email, password) => {
  const db = await SQLite.openDatabaseAsync("PickMe");
  try {
    // Prüfen, ob die E-Mail oder der Benutzername bereits existieren
    const existingUser = await db.getFirstAsync(
      "SELECT * FROM User WHERE username = ? OR email = ?",
      [username, email]
    );

    if (existingUser) {
      // Wenn die E-Mail oder der Benutzername bereits existieren, breche ab
      return {
        success: false,
        message: "Benutzername oder E-Mail-Adresse existieren bereits.",
      };
    }

    // Wenn die E-Mail und der Benutzername noch nicht existieren, füge sie ein
    const result = await db.runAsync(
      "INSERT INTO User (username, email, password) VALUES (?,?,?)",
      [username, email, password]
    );

    // Hole das eingefügte Objekt basierend auf der letzten eingefügten ID
    const insertedUser = await db.getFirstAsync(
      "SELECT * FROM User WHERE user_id = ?",
      [result.lastInsertRowId]
    );

    console.log("Eingefügter Benutzer:", insertedUser);

    return {
      success: true,
      user: insertedUser, // Gebe das eingefügte Objekt zurück
    };
  } catch (error) {
    console.log("Fehler bei der Registrierung:", error);
    return {
      success: false,
      message: error.message,
    };
  }
};

// Funktion zum Abrufen der Bestellungen eines bestimmten Nutzers
export const getOrdersByUser = async (userId, isAscending = true) => {
  const db = await SQLite.openDatabaseAsync("PickMe");

  try {
    // Bestimmen der Sortierreihenfolge basierend auf dem Wert von isAscending
    const orderBy = isAscending ? "ASC" : "DESC";

    // SQL-Abfrage zum Abrufen der Bestellungen für den angegebenen user_id, sortiert nach Datum
    const result = await db.getAllAsync(
      `
      SELECT * FROM "Order"
      WHERE user_id = ?
      ORDER BY date ${orderBy}
    `,
      [userId]
    );

    return result.rows._array; // Gibt die Bestellungen als Array zurück
  } catch (error) {
    console.error("Fehler beim Abrufen der Bestellungen:", error);
    return [];
  }
};
