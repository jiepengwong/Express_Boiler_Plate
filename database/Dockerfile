FROM mysql:latest

# Set environment variables
ENV MYSQL_ROOT_PASSWORD=test
ENV MYSQL_DATABASE=user_database
ENV MYSQL_USER=user
ENV MYSQL_PASSWORD=password

# Copy the SQL script to the container
COPY init-database.sql /docker-entrypoint-initdb.d/

# Expose MySQL port
EXPOSE 3306