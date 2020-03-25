CREATE DATABASE project;

\c project;

CREATE TABLE users
(
  id serial PRIMARY KEY,
  name VARCHAR,
  email VARCHAR,
  password VARCHAR
);

CREATE TABLE members
(
  id serial PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR,
  age VARCHAR,
  location VARCHAR
);

CREATE TABLE vendors
(
  id serial PRIMARY KEY,
  name VARCHAR
);

CREATE TABLE stores
(
  id serial PRIMARY KEY,
  vendor_id INTEGER REFERENCES vendors(id) ON DELETE CASCADE,
  location VARCHAR,
  capacity VARCHAR
);

CREATE TABLE customers
(
  id serial PRIMARY KEY,
  name VARCHAR,
  age VARCHAR
);

CREATE TABLE reservations
(
  id serial PRIMARY KEY,
  store_id INTEGER REFERENCES stores(id) ON DELETE CASCADE,
  customer_id INTEGER REFERENCES customers(id) ON DELETE CASCADE,
  visting_day INTEGER,
  visting_hour INTEGER
);


INSERT INTO users
  (
  name, email, password)
VALUES
  (
    'Devin Sanders', 'tristanjacobs@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');


INSERT INTO users
  (
  name, email, password)
VALUES
  (
    'Devin Sanders', 'tristanjacobs@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');
INSERT INTO users
  (
  name, email, password)
VALUES
  (
    'Iva Harrison', 'allisonjackson@mail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');
