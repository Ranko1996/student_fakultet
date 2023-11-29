-- Kreiranje baze podataka i ubacivanje podataka u tablice
CREATE DATABASE IF NOT EXISTS fortuno_api;
USE fortuno_api;

CREATE TABLE IF NOT EXISTS fakultet (
    id INT AUTO_INCREMENT PRIMARY KEY,
    naziv VARCHAR(255),
    opis TEXT,
    mjesto VARCHAR(100),
    adresa VARCHAR(255)
);

INSERT INTO fakultet (naziv, opis, mjesto, adresa)
VALUES
    ('Fakultet A', 'Opis fakulteta A', 'Grad A', 'Adresa A'),
    ('Fakultet B', 'Opis fakulteta B', 'Grad B', 'Adresa B');

CREATE TABLE IF NOT EXISTS student (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ime_prezime VARCHAR(255),
    adresa VARCHAR(255),
    mjesto VARCHAR(100),
    postanski_broj VARCHAR(20),
    datum_rodjenja DATE,
    aktivan BOOLEAN,
    fakultet_id INT,
    FOREIGN KEY (fakultet_id) REFERENCES fakultet(id)
);

INSERT INTO student (ime_prezime, adresa, mjesto, postanski_broj, datum_rodjenja, aktivan, fakultet_id)
VALUES
    ('Student 1', 'Adresa 1', 'Grad 1', '12345', '1990-01-01', 1, 1),
    ('Student 2', 'Adresa 2', 'Grad 2', '54321', '1995-05-05', 0, 2);
