const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const mongoose = require("mongoose");
const collectionF = require("../model/Fmodel");
const collectionM = require("../model/Mmodel");
const collectionA = require("../model/Amodel");
const collectionC = require("../model/Cmodel");
const collectionMsg = require("../model/messages");

app.use(express.json());
app.use(cors());


mongoose.connect("mongodb://localhost:27017/JobDone");

// get requests //

app.get("/home/:userId/tasks", async (req, res) => {
  const requests = await collectionC.findOne({
    UserName: req.params.userId,
  });

  res.send(requests);
});

app.get("/freelancer/:fUser", async (req, res) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json({ message: "Token required" });
  }

  jwt.verify(token, "mySecret", async (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid token" });

    const freelancer = await collectionF.findOne({ UserName: decoded.data });
    res.send(freelancer);
  });
});

app.get("/admin/:aUser", (req, res) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json({ message: "Token required" });
  }

  jwt.verify(token, "mySecret", async (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid token" });

    const admin = await collectionA.findOne({ UserName: decoded.data });
    res.send(admin);
  });
});

app.get("/manager/:mUser", (req, res) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json({ message: "Token required" });
  }

  jwt.verify(token, "mySecret", async (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid token" });

    const manager = await collectionM.findOne({ UserName: decoded.data });
    res.send(manager);
  });
});

app.get("/home/:userId", (req, res) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json({ message: "No token" });
  }

  jwt.verify(token, "mySecret", async (err, decoded) => {
    if (err) res.status(403).json({ message: "Invalid Token" });
    if (decoded?.data) {
      const user = await collectionC.findOne({ UserName: decoded.data });
      const freelancer = await collectionF.find();
      res.send({ user, freelancer });
    } else res.send(false);
  });
});

app.get("/freelancer/:fUser/tasks/:userId/messages", async (req, res) => {
  const msgUpdate = await collectionMsg.findOne({
    lancerId: req.params.fUser,
    clientId: req.params.userId,
  });
  res.send(msgUpdate);
});

app.get("/home/:userId/tasks/:fUser/messages", async (req, res) => {
  const msgUpdate = await collectionMsg.findOne({
    lancerId: req.params.fUser,
    clientId: req.params.userId,
  });
  res.send(msgUpdate);
});

// post requests //

app.post("/login", async (req, res) => {
  const { UserName, Password } = req.body;
  const freelancer = await collectionF.findOne({ UserName: UserName });
  const client = await collectionC.findOne({ UserName: UserName });
  const admin = await collectionA.findOne({ UserName: UserName });
  const manager = await collectionM.findOne({ UserName: UserName });

  if (!freelancer && !admin && !manager && !client) {
    res.send("NoUser");
  } else if (freelancer) {
    if (!(await bcrypt.compare(Password, freelancer.Password))) {
      res.send("check");
    } else {
      const token = jwt.sign(
        {
          data: freelancer.UserName,
        },
        "mySecret",
        { expiresIn: "1hr" }
      );

      res.send({ token, freelancer });
    }
  } else if (admin) {
    if (!(await bcrypt.compare(Password, admin.Password))) {
      res.send("check");
    } else {
      const token = jwt.sign(
        {
          data: admin.UserName,
        },
        "mySecret",
        { expiresIn: "1hr" }
      );
      res.send({ token, admin });
    }
  } else if (client) {
    if (!(await bcrypt.compare(Password, client.Password))) {
      res.send("check");
    } else {
      const token = jwt.sign(
        {
          data: client.UserName,
        },
        "mySecret",
        { expiresIn: "1hr" }
      );
      res.send({ token, client });
    }
  } else if (manager) {
    if (!(await bcrypt.compare(Password, manager.Password))) {
      res.send("check");
    } else {
      const token = jwt.sign(
        {
          data: manager.UserName,
        },
        "mySecret",
        { expiresIn: "1hr" }
      );
      res.send({ token, manager });
    }
  }
});

app.post("/signUp/freelancer", async (req, res) => {
  const { UserName } = req.body;
  const FuserCheck = await collectionF.findOne({ UserName: UserName });
  const AuserCheck = await collectionA.findOne({ UserName: UserName });
  const MuserCheck = await collectionM.findOne({ UserName: UserName });
  const CuserCheck = await collectionC.findOne({ UserName: UserName });

  if (!FuserCheck && !AuserCheck && !MuserCheck && !CuserCheck) {
    req.body.Password = await bcrypt.hash(req.body.Password, 10);
    const data = await collectionF.create(req.body);
    res.send(data.UserName);
  } else {
    const set = false;
    res.send(set);
  }
});

app.post("/signUp/user", async (req, res) => {
  const { UserName } = req.body;
  const FuserCheck = await collectionF.findOne({ UserName: UserName });
  const AuserCheck = await collectionA.findOne({ UserName: UserName });
  const MuserCheck = await collectionM.findOne({ UserName: UserName });
  const CuserCheck = await collectionC.findOne({ UserName: UserName });

  if (!FuserCheck && !AuserCheck && !MuserCheck && !CuserCheck) {
    req.body.Password = await bcrypt.hash(req.body.Password, 10);
    const data = await collectionC.create(req.body);
    res.send(data.UserName);
  } else {
    const set = false;
    res.send(set);
  }
});

app.post("/admin/:aUser/managersInfo", async (req, res) => {
  const { UserName } = req.body;
  const FuserCheck = await collectionF.findOne({ UserName: UserName });
  const AuserCheck = await collectionA.findOne({ UserName: UserName });
  const MuserCheck = await collectionM.findOne({ UserName: UserName });
  const CuserCheck = await collectionC.findOne({ UserName: UserName });

  console.log("234");

  if (!FuserCheck && !AuserCheck && !MuserCheck && !CuserCheck) {
    req.body.Password = await bcrypt.hash(req.body.Password, 10);
    const data = await collectionM.create(req.body);
    console.log("managerCreated");
    res.send(data.UserName);
  } else {
    const set = false;
    res.send(set);
  }
});

app.post("/home/:userId", async (req, res) => {
  const { searchSkill } = req.body;
  const searchLancerSkill = await collectionF.find({ Skill: searchSkill });
  const searchLancerId = await collectionF.findOne({ UserName: searchSkill });

  if (!searchLancerSkill && !searchLancerId) {
    res.send("");
  } else if (searchLancerSkill) {
    res.send(searchLancerSkill);
  } else {
    res.send(searchLancerId);
  }
});

app.post("/home/:userId/tasks", async (req, res) => {
  const { lancerIds } = req.body;

  const updateLancer = await collectionF.findOneAndUpdate(
    {
      UserName: lancerIds,
      bufferRequests: { $elemMatch: { clientIds: req.params.userId } },
    },
    { $pull: { bufferRequests: { clientIds: req.params.userId } } }
  );
  if (!updateLancer) {
    res.send("alreadyAccepted");
  } else {
    const updateClient = await collectionC.findOneAndUpdate(
      { UserName: req.params.userId },
      { $pull: { bufferRequests: { lancerIds: lancerIds } } }
    );
    res.send("requestCancel");
  }
});

app.post("/home/:userId/:fUser/requestPage", async (req, res) => {
  const { lancerId, clientId, taskName, taskDescription } = req.body;

  const connectionCheck = await collectionF.findOne({
    UserName: lancerId,
    bufferRequests: { $elemMatch: { clientId: clientId } },
  });

  const clientConnectionCheck = await collectionC.findOne({
    UserName: clientId,
    bufferRequests: { $elemMatch: { lancerId: lancerId } },
  });

  if (!connectionCheck) {
    const freelancer = await collectionF.findOneAndUpdate(
      { UserName: lancerId },
      {
        $push: {
          bufferRequests: {
            clientIds: clientId,
            taskName: taskName,
            taskDescription: taskDescription,
          },
        },
      }
    );
  }

  if (!clientConnectionCheck) {
    const user = await collectionC.findOneAndUpdate(
      { UserName: clientId },
      {
        $push: {
          bufferRequests: {
            lancerIds: lancerId,
            taskName: taskName,
            taskDescription: taskDescription,
          },
        },
      }
    );
  }

  res.send("Ok");
});

app.post("/freelancer/:fUser/tasks", async (req, res) => {
  const { clientIds, requestVal, taskName, taskDescription } = req.body;
  console.log("entered");
  if (requestVal === "accept") {
    console.log("accepted");
    const lancerRequestOp = await collectionF.findOneAndUpdate(
      { UserName: req.params.fUser },
      {
        $pull: {
          bufferRequests: {
            clientIds: clientIds,
            taskName: taskName,
            taskDescription: taskDescription,
          },
        },
      }
    );

    const clientRequestOp = await collectionC.findOneAndUpdate(
      { UserName: clientIds },
      {
        $pull: {
          bufferRequests: {
            lancerIds: req.params.fUser,
            taskName: taskName,
            taskDescription: taskDescription,
          },
        },
      }
    );

    const lancerUpdateReq = await collectionF.findOneAndUpdate(
      { UserName: req.params.fUser },
      {
        $push: {
          tasksAssigned: {
            clientId: clientIds,
            taskName: taskName,
            taskDescription: taskDescription,
          },
        },
      }
    );

    const clientUpdateReq = await collectionC.findOneAndUpdate(
      { UserName: clientIds },
      {
        $push: {
          tasksRequested: {
            lancerId: req.params.fUser,
            taskName: taskName,
            taskDescription: taskDescription,
          },
        },
      }
    );
    const connectionCheck = await collectionMsg.findOne({
      clientId: clientIds,
      lancerId: req.params.fUser,
    });
    if (!connectionCheck) {
      const messageConnection = await collectionMsg.insertMany({
        clientId: clientIds,
        lancerId: req.params.fUser,
      });
    }
  } else if (requestVal === "reject") {
    console.log("rejected");
    const lancerRequestOp = await collectionF.findOneAndUpdate(
      { UserName: req.params.fUser },
      {
        $pull: {
          bufferRequests: {
            clientIds: clientIds,
            taskName: taskName,
            taskDescription: taskDescription,
          },
        },
      }
    );

    const clientRequestOp = await collectionC.findOneAndUpdate(
      { UserName: clientIds },
      {
        $pull: {
          bufferRequests: {
            lancerIds: req.params.fUser,
            taskName: taskName,
            taskDescription: taskDescription,
          },
        },
      }
    );
  }

  res.send("requestDone");
});

app.post("/freelancer/:fUser/tasks/:userId/messages", async (req, res) => {
  const { msgContent } = req.body;
  const msgUpdate = await collectionMsg.findOneAndUpdate(
    {
      lancerId: req.params.fUser,
      clientId: req.params.userId,
    },
    {
      $push: {
        allMessages: {
          userId: req.params.fUser,
          msgContent: msgContent,
          msgDate: Date.now(),
        },
      },
    }
  );
  res.send(msgUpdate);
});

app.post("/home/:userId/tasks/:fUser/messages", async (req, res) => {
  const { msgContent } = req.body;
  const msgUpdate = await collectionMsg.findOneAndUpdate(
    {
      lancerId: req.params.fUser,
      clientId: req.params.userId,
    },
    {
      $push: {
        allMessages: {
          userId: req.params.userId,
          msgContent: msgContent,
          msgDate: Date.now(),
        },
      },
    }
  );
  res.send(msgUpdate);
});

app.post("/freelancer/:fUser/earnings",async(req,res)=>{
  const findLancer = await collectionF.findOne({UserName:req.params.fUser});
  if(!findLancer){
    res.send(null);
  } else{
    const price = req.body.amount;
    const lancerUpdate = await collectionF.findOneAndUpdate({UserName:req.params.fUser},{currAmount:(parseInt(findLancer.currAmount)+parseInt(price))});
    res.send(true);
  }
})

app.post("/updatePassword", async (req, res) => {
  const { OldPassword, NewPassword, ReNewPassword } = req.body;
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json({ message: "Token required" });
  }

  jwt.verify(token, "mySecret", async (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }

    let user;
    user = await collectionF.findOne({ UserName: decoded.data });
    if (!user) user = await collectionA.findOne({ UserName: decoded.data });
    if (!user) user = await collectionC.findOne({ UserName: decoded.data });
    if (!user) user = await collectionM.findOne({ UserName: decoded.data });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(OldPassword, user.Password);
    if (!isMatch) {
      return res.status(400).json({ message: "Old password is incorrect" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(NewPassword, salt);

    user.Password = hashedPassword;
    await user.save();

    return res.status(200).json({ message: "Password updated successfully" });
  });
});

app.listen(5500, () => {
  console.log("Server Running in 5500");
});
