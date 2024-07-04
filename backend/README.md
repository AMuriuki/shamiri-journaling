# Backend

## Project Set-up
To run this project on your local machine follow these instructions

### 1. Clone the repository
- Clone the repo to your local

```sh
$ git clone https://github.com/AMuriuki/shamiri-journaling.git

$ cd shamiri-journaling/backend # navigate to the backend directory 
```

### 2. Set-up a virtual environment
- Create the virtual environment

```sh
$ python3 -m venv venv
```

- Active the virtual environment

```sh
$ venv\Scripts\activate # on Windows
```

```sh
$ source venv/bin/activate # on macOs/Linux
```

### 3. Install project dependencies

```sh
$ pip install -r requirements.txt
```

## DB Set-up
The application runs on a PostgreSQL database. Follow these steps to set-up your DB:

### 1. Install PostgreSQL

Make sure PostgreSQL is installed on your system. Download and follow the installation instructions from the [official PostgresQL website](https://www.postgresql.org/download/)

### 2. Create a PostgreSQL User and Database

- Open the PostgreSQL command line interface and navigate to `psql`.

```sh
$ sudo -u postgres psql
```

- Create a new user

```sql
CREATE USER 'your-preferred-user' WITH PASSWORD 'your-preferred-password';
```

- Create a new database

```sql
CREATE DATABASE 'your-preferred-db-name';
```

- Grant all privileges on the database to the user

```sql
GRANT ALL PRIVILEGES ON DATABASE 'your-database-name' TO 'your-user';
```

- Exit the PostgreSQL command line

```sql
\q
```

## Run the backend service

### 1. Configure environment variables

- Inside the `backend` directory create a `.env` file and fill it with the necessary values

```sh
DATABASE_URL=postgresql+psycopg2://{user-created-in-postgres}:{password-you-created}@localhost:5432/{database-name}
```

### 2. Run the backend service

- Start the server with the command

```sh
$ flask run
```

- The API ought to run in port `5000` incase you cannot use this port, use a desired port number

```sh
$ flask run --port=4000
```


