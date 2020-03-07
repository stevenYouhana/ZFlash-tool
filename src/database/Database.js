
import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase("db.db");

export default class Database {
  setDataUpToDate() {
    return new Promise(resolved => {
      db.transaction(tx => {
        tx.executeSql(
          `select * from topics;`,
          [],
          (_, { rows: { _array } }) => resolved(_array)
        );
      });
    });
 }
  initDB() {
    db.transaction(tx => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS topics (id INTEGER PRIMARY KEY AUTOINCREMENT, topicName TEXT, verses TEXT);"
      );
    });
  }

  add(topic) {
   if (topic === null || topic === "") {
     return false;
   }
   db.transaction(
     tx => {
       tx.executeSql("insert into topics (topicName) values (?)", [topic]);
       tx.executeSql("select * from topics", [], (_, { rows }) =>
         console.log(JSON.stringify(rows))
       );
     },
     null,
     () => console.log("result added!")
   );
 }

}
