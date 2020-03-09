
import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase("db.db");

export default class Database {
  setDataUpToDate() {
    return new Promise(resolve => {
      db.transaction(tx => {
        tx.executeSql(
          `select * from topics;`,
          [],
          (_, { rows: { _array } }) => resolve(_array)
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
          tx.executeSql("SELECT * FROM topics WHERE topicName = (?)", [topic],
            (_, { rows: { _array } }) => resolve(_array)
          );
        },
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
testUpdate() {
  let topic = 'fire';
  let verses = 'Jer 5|Jn 5|Mk 7: 3';
  db.transaction(tx => {
    tx.executeSql(
      `UPDATE topics SET verses = '${verses}' WHERE topicName = '${topic}'`,
      [],
      null
    );
  })
}
 addVerseFor(topic, newVerse) {
   this.findTopic(topic).then(results => {
     console.log("this.findTopic(topic).then(results => ", results)
     return results[0].verses ? `${results[0].verses}|${newVerse}` : newVerse;
   }).then((totalVerses) => {
     console.log(".then((totalVerses) => ", totalVerses)
     db.transaction(tx => {
       tx.executeSql(
         `UPDATE topics SET verses = '${totalVerses}' WHERE topicName = '${topic}'`,
         [],
         null
       );
     });
   })
 }
 clearDB() {
   db.transaction(
               tx => {
                 tx.executeSql(`DELETE FROM topics`);
               },
               null,
               null
             )
 }
}
