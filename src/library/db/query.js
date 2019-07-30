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
	PRIMARY KEY("id")
);
`;

export const CREATE_USER_TOUR_LIST_QUERY = `
CREATE TABLE "user_tour_list" (
	"id"	INTEGER NOT NULL UNIQUE,
	"title"	INTEGER,
	"description"	INTEGER,
	"image_uri"	INTEGER,
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
