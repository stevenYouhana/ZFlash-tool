
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
    // db.transaction(tx => {
    //   tx.executeSql("DROP TABLE topics");
    //   console.log("TABLE DROPPED!");
    // })
    db.transaction(tx => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS topics (id INTEGER PRIMARY KEY AUTOINCREMENT, topicName TEXT UNIQUE, verses TEXT);"
      );
    });
  }
  findTopic(topic) {
    return new Promise(resolve => {
      db.transaction(
        tx => {
          tx.executeSql("SELECT FROM topics WHERE topicName = (?)", [topic], (_, { rows }) => {
            // console.log(JSON.stringify(rows))
            resolve(rows);
          }
        )},
        null,
        null
      );
    });
  }
  add(topic) {
   if (topic === null || topic === "") {
     return false;
   }
   db.transaction(
     tx => {
       tx.executeSql("insert into topics (topicName) values (?)", [topic.toLowerCase()]);
       tx.executeSql("select * from topics", [], (_, { rows }) =>
         console.log("topic added: "+topic)
       );
     },
     null,
     () => console.log("result added!")
   );
 }
 clearDB() {
   db.transaction(
               tx => {
                 tx.executeSql(`DELETE FROM topics`);
               },
               null,
               this.update
             )
 }
}
