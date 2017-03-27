import mongo from 'mongodb';

const MongoClient = mongo.MongoClient,
  db = {
    connection: null,
    get() {
        return this.connection;
    },
    connect(dbname, callback) {
      let cacheConnection = (err, db) => {
        this.connection = db;
        return callback(err);
      };
      try {
        return MongoClient.connect(dbname, cacheConnection);
      } catch (exception) {
        return callback(exception);
      }
    },
    close() {
      if (this.connection) {
        this.connection.close();
        this.connection = null;
      }
    }
};

export default db;