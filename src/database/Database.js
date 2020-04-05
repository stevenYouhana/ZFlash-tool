
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
      setTimeout(() => {
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
      }, 50);
  }
  add(topic) {
   if (topic === null || topic === "") {
     return false;
   }
   db.transaction(
     tx => {
       tx.executeSql("insert into topics (topicName) values (?)",
       [topic.trim()]);
       tx.executeSql("select * from topics", [], (_, { rows }) =>
         console.log("topic added: "+topic)
       );
     },
     null,
     () => console.log("result added!")
   );
 }
 addVerseFor(topic, newVerse) {
   this.findTopic(topic).then(results => {
     return results[0].verses ? `${results[0].verses}|${newVerse.trim()}` :
      `|${newVerse.trim()}`;
   }).then((totalVerses) => {
     db.transaction(tx => {
       tx.executeSql(
         `UPDATE topics SET verses = "${totalVerses}" WHERE topicName = (?)`,
         [topic],
         null,
         err => console.log("SQL EROR: ",err)
       );
     });
   }).catch(err => {
     console.log("addVerseFor(topic, newVerse): ",err.message)
     alert("Database error. Contact developer");
   })
 }
 deleteAVerseFrom(topic, verseRef) {
   this.findTopic(topic).then(results => {
     return results[0].verses;
   }).then(currentVerses => {
     const updatedVerses = currentVerses.replace(`|${verseRef}`, '');
     db.transaction(tx => {
       tx.executeSql(
         `UPDATE topics SET verses = '${updatedVerses}' WHERE topicName = (?)`,
         [topic],
         null
       );
     });
   });
 }
 editTopicnName(topic, newName) {
   db.transaction( tx => {
     tx.executeSql(`UPDATE topics SET topicName = (?) WHERE topicName = (?)`,
     [newName.trim(), topic],
     null
    );
  });
 }
 deleteATopic(topicName) {
   db.transaction( tx =>
     tx.executeSql(`DELETE FROM topics WHERE topicName = (?)`,
       [topicName],
       console.log("deleted!"),
       err => console.log("error deleting topic", err)
     )
   );
 }
 clearDB() {
   console.log("clearDB() ...");
   db.transaction(
               tx => {
                 tx.executeSql(`DELETE FROM topics`);
               },
               null,
               null
             )
 }
}
