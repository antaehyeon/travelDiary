export const CREATE_TOUR_LIST_QUERY = `
CREATE TABLE "tour_list" (
	"id"	INTEGER NOT NULL UNIQUE,
	"content_type_id"	INTEGER,
	"latitude"	NUMERIC NOT NULL,
	"longitude"	NUMERIC NOT NULL,
	"address_main"	TEXT,
	"address_sub"	TEXT,
	"created_time"	INTEGER,
	"modified_time"	INTEGER,
	"cat1"	TEXT,
	"cat2"	TEXT,
	"cat3"	TEXT,
	"title"	TEXT,
	"tel"	TEXT,
	"image_uri"	TEXT,
	PRIMARY KEY("id")
);
`;

export const CREATE_USER_TOUR_LIST_QUERY = `
CREATE TABLE "user_tour_list" (
	"id"	INTEGER NOT NULL UNIQUE,
	"title"	TEXT,
	"description"	TEXT,
	"image_uri"	TEXT,
	"created_time"	INTEGER,
	"updated_time"	INTEGER,
	"longitude"	NUMERIC NOT NULL DEFAULT 0.0,
	"latitude"	NUMERIC NOT NULL DEFAULT 0.0,
	PRIMARY KEY("id")
)
`;

export const SELECT_TABLE_DATA = tableName => {
  return `SELECT * FROM ${tableName}`;
};

export const ADD_TOUR_DATA = `INSERT INTO tour_list (id, content_type_id, latitude, longitude, address_main, address_sub, created_time, modified_time, cat1, cat2, cat3, title, tel, image_uri) VALUES (:id, :content_type_id, :latitude, :longitude, :address_main, :address_sub, :created_time, :modified_time, :cat1, :cat2, :cat3, :title, :tel, :image_uri)`;
export const ADD_USER_TOUR_DATA = `INSERT INTO user_tour_list (id, title, description, image_uri, created_time, updated_time, longitude, latitude) VALUES (:id, :title, :description, :image_uri, :created_time, :updated_time, :longitude, :latitude)`;
export const DELETE_ALL_TOUR_LIST = `DELETE FROM tour_list`;
export const DELETE_ALL_USER_TOUR_LIST = `DELETE FROM user_tour_list`;
