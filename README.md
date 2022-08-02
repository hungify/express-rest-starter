# Express API Starter With JWT

## Docker setup

The back-end has support for Docker Compose. So if you want to run the back-end in a container, you need do:

1. Setup environment variables in `.env` file. Note when you use Docker setup and run the database in localhost (host machine)

2. Run command `yarn install` or `npm install`

3. Run container

    - `docker compose up`

4. Stop and remove containers and networks

    - `docker compose down`

## **If you want connecting to MongDB inside docker container with GUI, use connection string below**

`mongodb://*yourUser*:**yourPass**@localhost:27017/**yourDbName**?authSource=**yourDbName**`
