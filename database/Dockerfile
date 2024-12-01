# Use the official MySQL image as the base
FROM mysql:8

# Copy initialization SQL script to the MySQL entrypoint directory
COPY ./init.sql /docker-entrypoint-initdb.d/

# Environment variables for MySQL configuration
ENV MYSQL_ROOT_PASSWORD=rootpassword
ENV MYSQL_DATABASE=OWASP_database
ENV MYSQL_USER=root
ENV MYSQL_PASSWORD=rootpassword

# Expose MySQL port (optional, typically done in docker-compose.yml)
EXPOSE 3306
