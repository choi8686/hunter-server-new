"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");

const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require("./users")(sequelize, Sequelize);
db.Location = require("./location")(sequelize, Sequelize);
db.Team = require("./team")(sequelize, Sequelize);
db.Teamimage = require("./teamimage")(sequelize, Sequelize);
db.Like = require("./like")(sequelize, Sequelize);
db.Message = require("./message")(sequelize, Sequelize);

db.Location.hasMany(db.Team, {
  foreignKey: "locationId",
  sourceKey: "id"
});
db.Team.belongsTo(db.Location, {
  foreignKey: "locationId",
  targetKey: "id"
});

db.Team.hasMany(db.Teamimage, {
  foreignKey: "teamId",
  sourceKey: "id"
});
db.Teamimage.belongsTo(db.Team, {
  foreignKey: "teamId",
  targetKey: "id"
});

db.User.hasOne(db.Team, { as: "team", foreignKey: "userId" });

db.Team.hasMany(db.Like, { foreignKey: "toLikeId" });
db.Like.belongsTo(db.Team, { foreignKey: "whoLikeId" });

db.Team.hasMany(db.Message, { foreignKey: "toTeamId" });
db.Message.belongsTo(db.Team, { foreignKey: "senderTeamId" });

module.exports = db;
