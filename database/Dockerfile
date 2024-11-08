# Use the official MySQL image as the base
FROM mysql:8

# Copy initialization SQL script to the MySQL entrypoint directory
COPY ./init.sql /docker-entrypoint-initdb.d/

# Environment variables for MySQL configuration
ENV MYSQL_ROOT_PASSWORD=rootpassword
ENV MYSQL_DATABASE=web_hacking
ENV MYSQL_USER=testuser
ENV MYSQL_PASSWORD=testpassword

# Expose MySQL port (optional, typically done in docker-compose.yml)
EXPOSE 3306
