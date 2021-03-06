import SQLite from "react-native-sqlite-storage";
import {
  CREATE_TOUR_LIST_QUERY,
  CREATE_USER_TOUR_LIST_QUERY,
  SELECT_TABLE_DATA,
  ADD_TOUR_DATA,
  ADD_USER_TOUR_DATA,
  DELETE_ALL_TOUR_LIST,
  DELETE_ALL_USER_TOUR_LIST
} from "src/library/db/query.js";
import _ from "lodash";

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

export const getTableDatas = (db, tableName, callback) => {
  const result = [];

  const executeSuccess = (tx, res) => {
    for (let i = 0; i < res.rows.length; ++i) {
      const dbData = res.rows.item(i);
      dbData.type = "user";
      dbData.imageUri = dbData.image_uri;
      result.push(dbData);
    }

    callback(result);
  };

  const executeSQL = tx => {
    tx.executeSql(SELECT_TABLE_DATA(tableName), [], executeSuccess);
  };

  db.transaction(executeSQL);
};

export const addTourDataToDB = (db, params) => {
  const { contentid, contenttypeid, mapy, mapx, addr1, addr2, createdtime, modifiedtime, cat1, cat2, cat3, title, tel, firstimage } = params;
  if (!mapx || !mapx || !firstimage) return;

  db.transaction(tx => {
    tx.executeSql(ADD_TOUR_DATA, [
      contentid,
      contenttypeid,
      parseInt(mapy),
      parseInt(mapx),
      addr1,
      addr2,
      createdtime,
      modifiedtime,
      cat1,
      cat2,
      cat3,
      title,
      tel,
      firstimage
    ]);
  });
};

export const addUserTourDataToDB = (db, params) => {
  const { id, title, description, imageUri, createdTime, updatedTime, longitude, latitude } = params;

  db.transaction(tx => {
    tx.executeSql(ADD_USER_TOUR_DATA, [id, title, description, imageUri, createdTime, updatedTime, longitude, latitude]);
  });
};

export const deleteTourListToDB = db => {
  db.transaction(tx => {
    tx.executeSql(DELETE_ALL_TOUR_LIST, []);
  });
};

export const deleteUserTourListToDB = db => {
  db.transaction(tx => {
    tx.executeSql(DELETE_ALL_USER_TOUR_LIST, []);
  });
};
