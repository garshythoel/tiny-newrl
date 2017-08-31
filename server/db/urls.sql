DROP DATABASE IF EXISTS urls;
CREATE DATABASE urls;

\c urls;

CREATE TABLE idurlmap (
  ID SERIAL PRIMARY KEY,
  URL TEXT
);

INSERT INTO idurlmap(url)
  VALUES ('localhost.bitch');
