import SQLite from "react-native-sqlite-storage";
import { CREATE_TOUR_LIST_QUERY, CREATE_USER_TOUR_LIST_QUERY, SELECT_TABLE_DATA } from "src/library/db/query.js";

const errorCB = error => {
  console.log("SQL DATABASE OPENED ERROR", err);
};

const openCB = () => {
  console.log("SQL DATABASE OPEN SUCCESS");
};

export const openDB = () => {
  const db = SQLite.openDatabase("tourListDB", openCB, errorCB);
  return db;
};

export const createTourListTable = db => {
  db.transaction(tx => {
    tx.executeSql(CREATE_TOUR_LIST_QUERY, []);
  });
};

export const createUserTourListTable = db => {
  db.transaction(tx => {
    tx.executeSql(CREATE_USER_TOUR_LIST_QUERY);
  });
};

export const selectTableDatas = (db, tableName) => {
  db.transaction(tx => {
    tx.executeSql(SELECT_TABLE_DATA(tableName), [], (tx, result) => {
      console.log("[SQLITE] SELECT_TABLE_DATA RESULT", result);
      return result;
    });
  });
};
