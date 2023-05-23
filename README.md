# Beatstar Server

This server is meant to handle version control and scores coming from the Beatstar mod.

# Requirements
- Docker
- Node.JS

# Running
1. Clone this repo
2. Run `npm install` inside of the repo folder to download dependencies
3. Fill in .env with values for your database
4. Run `docker compose up -d` to run the server in the background
5. Run `npm run dev` to start the server

# Using the server
To use the server with your device you'll need to provide a settings file pointing to the server. An example of this is

```{
  "ip": "192.168.0.1",
  "port": 6000
}
```

This needs to be placed in your `beatstar` folder and the game must have full file permissons for it to be read. If you receive a message stating `Modified server configuration detected. Do not report bugs that occur from this.` then your settings file has been read correctly.

Your device and PC must be on the same network and the IP must be the local IP address of the device hosting the server.

# .env
There are 4 values you must fill in before running the server.

`DATABASE_URL`: The connection string for the database. An example string is `postgresql://user:password@localhost:5432/beatstar?schema=public`

`PGDATABASE`: The name of the database. This must match the value in the `DATABASE_URL` string

`PGPASSWORD`: The password for the database

`PGPORT`: The port the database is hosted on
