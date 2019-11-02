Front end repo: https://github.com/BJorgen/card_share_client

## Database Setup

1. Set up a pg database
Type the following command to connect to your postgres server:
`psql -U vagrant -d template1`

Run the following SQL commands to create the necessary objects in the DB:

```sql
CREATE ROLE <rolename> WITH LOGIN password '<password>';
CREATE DATABASE <dbname> OWNER <rolename>;
```

2. Run the migrations and seed the database
```
knex migrate:latest
knex seed:run
```

- To rollback the last batch of migrations: `knex migrate:rollback`
- To rollback all the completed migrations: `knex migrate:rollback --all`
- To run the next migration that has not yet been run: `knex migrate:up`
- To undo the last migration that was run: `knex migrate:down`
