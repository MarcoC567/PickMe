import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import * as SQLite from "expo-sqlite";

const initDB = async () => {
  console.log("initDB");
  try {
    const db = await SQLite.openDatabaseAsync("PickMe");
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS User (
        user_id INTEGER PRIMARY KEY NOT NULL UNIQUE,
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
};

const insertDB = async () => {
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

const selectUser = async () => {
  console.log("Select User");
  try {
    const db = await SQLite.openDatabaseAsync("PickMe");

    const allUsers = await db.getAllAsync("SELECT * FROM User");
    const allCategorys = await db.getAllAsync("SELECT * FROM Category");
    const allProducts = await db.getAllAsync("SELECT * FROM Product");
    const allCart = await db.getAllAsync("SELECT * FROM Cart");
    const allCartItems = await db.getAllAsync("SELECT * FROM CartItem");
    const allOrders = await db.getAllAsync('SELECT * FROM "Order"');
    const allPayments = await db.getAllAsync("SELECT * FROM Payment");
    const allOrderDetails = await db.getAllAsync("SELECT * FROM OrderDetail");

    // console.log("allUsers: ", allUsers);
    // console.log("allCategorys: ", allCategorys);
    // console.log("allProducts: ", allProducts);
    // console.log("allCart: ", allCart);
    // console.log("allCartItems: ", allCartItems);
    // console.log("allOrders: ", allOrders);
    // console.log("allPayments: ", allPayments);
    // console.log("allOrderDetails: ", allOrderDetails);
    // for (const row of allRows) {
    //   console.log(row.id, row.value, row.Value, row.Value);
    // }
    const tables = [
      { name: "User", columns: ["user_id", "username", "email", "password"] },
      { name: "Category", columns: ["category_id", "name", "description"] },
      {
        name: "Product",
        columns: [
          "product_id",
          "category_id",
          "name",
          "description",
          "price",
          "evaluation",
        ],
      },
      { name: "Cart", columns: ["cart_id", "user_id", "total_price"] },
      {
        name: "CartItem",
        columns: ["cart_item_id", "cart_id", "product_id", "quantity"],
      },
      { name: '"Order"', columns: ["order_id", "user_id", "date", "location"] }, // "Order" benötigt Anführungszeichen
      {
        name: "Payment",
        columns: [
          "payment_id",
          "order_id",
          "payment_date",
          "payment_method",
          "payment_status",
        ],
      },
      {
        name: "OrderDetail",
        columns: ["detail_id", "order_id", "product_id", "quantity"],
      },
    ];

    // Daten aus allen Tabellen abrufen und ausgeben
    for (const table of tables) {
      const rows = await db.getAllAsync(`SELECT * FROM ${table.name}`);
      console.log(`Data from ${table.name}:`);
      for (const row of rows) {
        console.log(
          table.columns.map((col) => `${col}: ${row[col]}`).join(", ")
        );
      }
    }
  } catch (e) {
    console.log("error: ", e);
  }
};

export default function App() {
  return (
    <View style={styles.container}>
      <Text>TESTESTEST</Text>
      <View style={styles.btn}>
        <Button style={styles.btn} title="INIT DB" onPress={() => initDB()} />
      </View>

      <View style={styles.btn}>
        <Button
          style={styles.btn}
          title="INSERT DB"
          onPress={() => insertDB()}
        />
      </View>

      <View style={styles.btn}>
        <Button
          style={styles.btn}
          title="Select User"
          onPress={() => selectUser()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  btn: {
    width: "90%",
    height: 50,
  },
});
