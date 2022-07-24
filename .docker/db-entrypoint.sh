echo 'Creating database with username and password'

mongo ${MONGO_DB_NAME} \
  --host localhost \
  --port ${MONGO_DB_PORT} \
  -u ${MONGO_INITDB_ROOT_USERNAME} \
  -p ${MONGO_INITDB_ROOT_PASSWORD} \
  --authenticationDatabase admin \
  --eval "db.createUser({user: '${MONGO_DB_USERNAME}', pwd: '${MONGO_DB_PASSWORD}', roles:[{role:'dbOwner', db: '${MONGO_DB_NAME}'}]});"
