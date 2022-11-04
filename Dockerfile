FROM mysql:8
ADD --chown=mysql:mysql https://raw.githubusercontent.com/datacharmer/test_db/master/sakila/sakila-mv-schema.sql /docker-entrypoint-initdb.d/0_ddl.sql
ADD --chown=mysql:mysql https://raw.githubusercontent.com/datacharmer/test_db/master/sakila/sakila-mv-data.sql /docker-entrypoint-initdb.d/1_dml.sql
