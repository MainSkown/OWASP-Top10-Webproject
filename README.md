# OWASP-Top10-Webproject

A webproject designed with security flaws from OWASP Top Ten, for exercise purposes.

## Running the project

### docker-compose

It's a default way to run the project.
Copy the repository and than run the following command:

```bash
docker compose up
# or
docker compose up -d # to run in background
# if running in the background
docker compose logs -f # to see the logs
```

### manual

To run the project manualy you need to run following commands:

```bash
# in frontend directory
yarn install 
yarn dev

# in backend directory
yarn install
yarn start

# in database directory
docker build -t owasp-top10-db .
docker run -d -p 3306:3306 --name owasp-top10-db owasp-top10-db
```

## Attacking the web-app

The web-page is running on port 3000 on localhost.
`localhost:3000`
There are two pages '/' and '/admin'.

API is running on port 3001 on localhost.
`localhost:3001`

Database is running on port 3306 on localhost.

## Restarting the project

### docker-compose

To restart the project you only need to rebuild the images and run the containers again.

```bash
docker compose down
docker compose up --build # or -d to run in background
```

### manual

To restart the project manualy you need to run following commands:

```bash
# in database directory
docker stop owasp-top10-db
docker rm owasp-top10-db
docker build -t owasp-top10-db .
docker run -d -p 3306:3306 --name owasp-top10-db owasp-top10-db
```

## Stopping the project

### docker-compose

To stop the project you only need to run the following command:

```bash
docker compose down -v --rmi all
# -v deletes volumes, --rmi all deletes all the images
```

### manual

To stop the project manualy terminate the running processes and remove the database container.

```bash
docker rm -f owasp-top10-db
```

## Possible vectors of attack

Read this part only if you are stuck and need a hint.

<details>
<summary>Expand for hints</summary>

### SQL Injection
- Inputs can be used to inject sql queries.
- Try to use ') at the beginning of the input.

### XSS (Cross Site Scripting)
- Try to inject a script in the input.
- Try to use `<img>` tag with `onerror` attribute.

### Broken Authentication
- Try to use the same session id in different browser.

### Broken Token Verification
- Try to temper with the token, change the values

### Brute force
- Try to brute force the login page.
</details>
