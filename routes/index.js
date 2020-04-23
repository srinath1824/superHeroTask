const express = require("express");
const mongoose = require("mongoose");
const validateSchema = require("validate");
const router = express.Router();
const { connect } = require("../mongoDB");
require("dotenv").config();

//connects to mongoDB in memory database
const connection = connect();

const teamSchema = new mongoose.Schema({
  name: String,
  alignment: String,
  members: Array,
});

const superHeroSchema = new mongoose.Schema({
  name: String,
  alignment: String,
  team: Array,
});

const Team = mongoose.model("team", teamSchema);
const SuperHero = mongoose.model("superHero", superHeroSchema);

const createTeam = async (data) => {
  const team = new validateSchema({
    name: {
      type: String,
      required: true,
      message: "name is required",
    },
    alignment: {
      type: String,
      // required: true,
      enum: ["GOOD", "BAD", "NEUTRAL", ""],
    },
    members: {
      type: Array,
    },
  });

  const errors = team.validate(data);
  if (errors.length > 0) {
    return { message: errors[0].message };
  } else {
    const team = await Team.findOne({ name: data.name });
    if (team) return { message: `team with name ${data.name} already exist` };
    if (data.alignment === "") {
      data.alignment = "NEUTRAL";
    }
    const teamData = new Team(data);
    const result = await teamData.save();
    return result;
  }
};

const removeTeam = async (id) => {
  let res = await Team.findByIdAndRemove({ _id: id });
  if (!res) return { message: "TeamId is invalid" };
  return res;
};

const createSuperHero = async (data) => {
  const hero = new validateSchema({
    name: {
      type: String,
      required: true,
      message: "name is required",
    },
    alignment: {
      type: String,
      required: true,
      enum: ["GOOD", "BAD", "NEUTRAL"],
    },
    team: {
      type: String,
    },
  });

  const errors = hero.validate(data);
  if (errors.length > 0) {
    return { message: errors[0].message };
  } else {
    const hero = await SuperHero.findOne({ name: data.name });
    if (hero)
      return { message: `super hero with name ${data.name} already exist` };
    const superHeroData = new SuperHero(data);
    const result = await superHeroData.save();
    return result;
  }
};

const retriveTeamById = async (id) => {
  let res = await Team.findOne({ _id: id });
  if (!res) return { message: "TeamId is invalid" };
  return res;
};

const retriveSuperHeroById = async (id) => {
  let res = await SuperHero.findOne({ _id: id });
  if (!res) return { message: "Super Hero Id is invalid" };
  return res;
};

const changeAlignment = async (team) => {
  let superHeros = await SuperHero.find();
  let alignment = superHeros.map((obj) => obj.alignment);
  if (alignment.length > 0) {
    let goodCount = alignment.filter((a) => a === "GOOD").length;
    let badCount = alignment.filter((a) => a === "BAD").length;
    if (goodCount > badCount) {
      team.alignment = "GOOD";
    } else if (badCount > goodCount) {
      team.alignment = "BAD";
    } else {
      team.alignment = "NEUTRAL";
    }
  } else {
    team.alignment = "NEUTRAL";
  }
};

const addSuperHeroToTeam = async (superHeroId, teamId) => {
  try {
    const team = await Team.findById(teamId);
    const hero = await SuperHero.findOne({ _id: superHeroId });
    if (!team) return { message: "TeamId is invalid" };
    if (!hero) return { message: "Super Hero Id is invalid" };
    await changeAlignment(team);
    team.members.push(superHeroId);
    const result = await team.save();
    return result;
  } catch (ex) {
    console.log("Error while adding super hero to team", ex);
  }
};

const removeSuperHeroFromTeam = async (superHeroId, teamId) => {
  try {
    const team = await Team.findById(teamId);
    const hero = await SuperHero.findOne({ _id: superHeroId });
    if (!team) return { message: "TeamId is invalid" };
    if (!hero) return { message: "Super Hero Id is invalid" };
    await changeAlignment(team);
    let index = team.members.indexOf(superHeroId);
    team.members.splice(index, 1);
    await team.save();
    let teams = await Team.find();
    await changeAlignment(teams);
    return teams;
  } catch (ex) {
    console.log("Error while removing super hero from team", ex);
  }
};

const removeSuperHero = async (id) => {
  const hero = await SuperHero.findOneAndRemove({ _id: id });
  if (!hero) return { message: "Super Hero Id is invalid" };
  const teams = await Team.find();
  let teamId;
  let updatedTeam;
  teams.map((t) => {
    let memberId = t.members.find((hero) => hero === id);
    if (memberId) {
      teamId = t._id;
      let index = t.members.indexOf(memberId);
      t.members.splice(index, 1);
      updatedTeam = t;
    }
  });
  await Team.findOneAndUpdate({ _id: teamId }, updatedTeam);
  return SuperHero.find();
};

router.get("/showTeams", async (req, res) => {
  let teams = await Team.find();
  changeAlignment(teams);
  res.status(200).send(teams);
});

router.get("/showSuperHeros", async (req, res) => {
  let superHeros = await SuperHero.find();
  res.status(200).send(superHeros);
});

router.post("/createTeam", async (req, res) => {
  req.body["alignment"] = req.body.alignment.toUpperCase();
  let result = await createTeam(req.body);
  res.status(200).send(result);
});

router.post("/removeTeam", async (req, res) => {
  const { id } = req.body;
  if (id.length > 0) {
    let result = await removeTeam(req.body.id);
    res.status(200).send(result);
  } else {
    res.status(200).send({ message: "ID is invalid" });
  }
});

router.post("/createSuperHero", async (req, res) => {
  req.body["alignment"] = req.body.alignment.toUpperCase();
  let result = await createSuperHero(req.body);
  res.status(200).send(result);
});

router.post("/addSuperHeroToTeam", async (req, res) => {
  const { superHeroId, teamId } = req.body;
  let result = await addSuperHeroToTeam(superHeroId, teamId);
  res.status(200).send(result);
});

router.post("/removeSuperHeroFromTeam", async (req, res) => {
  const { superHeroId, teamId } = req.body;
  let result = await removeSuperHeroFromTeam(superHeroId, teamId);
  res.status(200).send(result);
});

router.post("/removeSuperHero", async (req, res) => {
  const { id } = req.body;
  let result = await removeSuperHero(id);
  res.status(200).send(result);
});

router.get("/retriveTeam/:id", async (req, res) => {
  let result = await retriveTeamById(req.params.id);
  res.status(200).send(result);
});

router.get("/retriveSuperHeroById/:id", async (req, res) => {
  let result = await retriveSuperHeroById(req.params.id);
  res.status(200).send(result);
});

module.exports = router;
