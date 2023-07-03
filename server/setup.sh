#!/bin/bash

docker compose exec prest prestd migrate up auth

docker compose exec postgres psql -d prest -U prest -c "INSERT INTO prest_users (name, username, password) VALUES ('root', 'root', MD5('password'))"

docker compose exec postgres psql -d prest -U prest -c "CREATE TABLE public.heroes (
    \"HeroID\" INTEGER,
    \"Rank\" VARCHAR(255),
    \"Class\" VARCHAR(255),
    \"Name\" VARCHAR(255),
    \"Gender\" VARCHAR(255),
    \"Abilities\" VARCHAR(255)
)"

docker compose exec postgres psql -d prest -U prest -c "
COPY heroes(\"HeroID\", \"Rank\", \"Class\", \"Name\", \"Gender\", \"Abilities\") FROM '/heroes.csv' DELIMITER ',' CSV HEADER; 
"