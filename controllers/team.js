const express = require("express");
const router = express.Router();
const models = require("../models");

router.get("/getUserIdTeam/:id", (req, res) => {
  let id = req.params.id;
  models.User.findOne({
    include: [
      {
        model: models.Team,
        where: {
          id: id
        }
      }
    ]
  })
    .then(result => {
      res.status(200).json(result);
    })
    .catch(error => {
      console.log(error);
    });
});

router.post("", (req, res) => {
  const { sex, count, age, comment, teamname, locationId, userId } = req.body;

  models.Team.create({
    //팀생성, post
    sex: sex,
    count: count,
    age: age,
    comment: comment,
    teamname: teamname,
    locationId: locationId, //각각 location마다 팀이 있으므로 locationId를 외래키로 가져오기 위해 넣음
    userId: userId, // 팀 생성한 user
    createdAt: Date(),
    updatedAt: Date()
  })
    .then(result => {
      res.status(200).json(result);
    })
    .catch(error => {
      console.log(error);
    });
});

router.get("/:getStore", async (req, res) => {
  let getStore = req.params.getStore;

  models.Team.findAll({
    include: [
      {
        model: models.Location,
        where: {
          store: getStore
        }
      },
      {
        model: models.Teamimage,
        attributes: ["imgUrl"]
      }
    ]
  })
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      console.log(err);
    });
});

router.get("/district/:getDistrict", (req, res) => {
  let getDistrict = req.params.getDistrict;
  models.Team.findAll({
    include: [
      {
        model: models.Location,
        where: {
          district: getDistrict
        }
      },
      {
        model: models.Teamimage,
        attributes: ["imgUrl"]
      }
    ]
  })
    .then(result => {
      res.status(200).json(result);
    })
    .catch(error => {
      console.log(error);
    });
});

router.put("/change", async (req, res, next) => {
  const { count, age, comment, teamname, userId, locationId } = req.body;

  await models.Team.update(
    {
      count: count,
      age: age,
      comment: comment,
      teamname: teamname,
      locationId: locationId
    },
    {
      where: {
        userId: userId
      }
    }
  )
    .then(result => {
      console.log("팀 수정했다 새끼야");
      res.status(200).json(result);
    })
    .catch(error => {
      console.log(error);
    });
});
module.exports = router;
