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
    console.log("[SQLITE] SELECT_TABLE_DATA RESULT", res);

    for (let i = 0; i < res.rows.length; ++i) {
      const dbData = res.rows.item(i);
      dbData.type = "user";
      dbData.imageUri = dbData.image_uri;
      console.log("[SQLITE] dbData", dbData);
      result.push(dbData);
    }

    console.log("[SQLITE] getTableDatas RESULT", result);

    callback(result);
  };

  const executeSQL = tx => {
    tx.executeSql(SELECT_TABLE_DATA(tableName), [], executeSuccess);
  };

  db.transaction(executeSQL);
};

//(id, content_type_id, latitude, longitude, address_main, created_time, modified_time, cat1, cat2, cat3, title, tel)
export const addTourDataToDB = (db, params) => {
  console.log("[SQLITE] addTourDataToDB params", params);
  const { contentid, contenttypeid, mapy, mapx, addr1, addr2, createdtime, modifiedtime, cat1, cat2, cat3, title, tel, firstimage } = params;
  if (!mapx || !mapx || !firstimage) return;

  db.transaction(tx => {
    tx.executeSql(
      ADD_TOUR_DATA,
      [contentid, contenttypeid, parseInt(mapy), parseInt(mapx), addr1, addr2, createdtime, modifiedtime, cat1, cat2, cat3, title, tel, firstimage],
      (tx, result) => {
        console.log("[SQLITE] ADD_TOUR_DATA RESULT", result);
        return result;
      }
    );
  });
};

export const addUserTourDataToDB = (db, params) => {
  const { id, title, description, imageUri, createdTime, updatedTime, longitude, langitude } = params;

  db.transaction(tx => {
    tx.executeSql(ADD_USER_TOUR_DATA, [id, title, description, imageUri, createdTime, updatedTime, longitude, langitude], (tx, result) => {
      console.log("[SQLITE] ADD_USER_TOUR_DATA RESULT", result);
      return result;
    });
  });
};

export const deleteTourListToDB = db => {
  db.transaction(tx => {
    tx.executeSql(DELETE_ALL_TOUR_LIST, [], (tx, result) => {
      console.log("[SQLITE] DELETE_ALL_TOUR_LIST SUCCESS", result);
    });
  });
};

export const deleteUserTourListToDB = db => {
  db.transaction(tx => {
    tx.executeSql(DELETE_ALL_USER_TOUR_LIST, [], (tx, result) => {
      console.log("[SQLITE] DELETE_ALL_USER_TOUR_LIST SUCCESS", result);
    });
  });
};
