var express = require('express');
var router = express.Router();
// const {connection} =require('..database/db')
var Room = require("../models/room");
const Booking=require("../models/booking");
var User = require("../models/user");

router.get("/getallrooms", async (req, res) => {
    try {
        const rooms = await Room.find({})
        //findOne({_id: room_id})
        //  return res.json({rooms});
        res.send(rooms);
    } catch (error) {

        return res.status(400).json({ message: error })
    }
    //roomid for booking
});
router.post("/getroombyid", async (req, res) => {

    const roomid = req.body.roomid;
    try {
        const room = await Room.findOne({ _id: roomid })
        //findOne({_id: room_id})
        //  return res.json({rooms});
        res.send(room);
    } catch (error) {

        return res.status(400).json({ message: error })
    }

});
router.post('/addroom', async (req, res) => {
    try {
        const newroom = new Room(req.body)
        await newroom.save()
        res.send('New Room Added ')

    } catch (error) {
        return res.status(400).json({ error });
    }
})

module.exports = router;