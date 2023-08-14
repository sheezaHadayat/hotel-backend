var express = require('express');
var router = express.Router();
const Room = require("../models/room");
const Booking=require("../models/booking");
var User = require("../models/user");
const moment = require("moment");
const stripe = require('stripe')('sk_test_51NeHo4IWQ9Gu2tLeJXiH29Tyln0GXUIYg7czERgQIlpXPamUyTl7Y13RoWFa1Q36BOdGHAM6cpJD5eZhYd6k0OfI00MaKRnP2l')
const { v4: uuidv4 } = require('uuid');

router.post("/bookroom", async (req, res) => {
    const { room, userid, fromdate, todate, totalamount, totaldays, token } = req.body;
    try {
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id
        })

        const payment = await stripe.charges.create({

            amount: totalamount * 100,
            customer: customer.id,
            currency: "PKR",
            receipt_email: token.email
        }, {
            idempotensykey: uuidv4()
        }
        )
        if (payment) {

           
            const newbooking = new Booking({
                room: room.name,
                roomid: room._id,
                userid,
                fromdate: moment(fromdate).format("DD-MM-YYYY"), // Correct
                todate: moment(todate).format("DD-MM-YYYY"),     // Correct this line
                totalamount,
                totaldays,
                transactionId: "1234",
            });
                const booking = await newbooking.save()
                const roomtemp = await Room.findOne({ _id: room._id });
                roomtemp.currentbookings.push({
                    bookingid: booking._id,
                    fromdate: moment(fromdate).format("DD-MM-YYYY"), // Correct
                    todate: moment(todate).format("DD-MM-YYYY"),     // Correct this line
                    userid: userid,
                    status: booking.status,
                });
                await roomtemp.save()

                
            
        }
        res.send("Payment Successful, Your Room is booked")
    } catch (error) {
        return res.status(400).json({ error })

    }

})

router.post("/getbookingbyuserid", async (req, res) => {
    const userid=req.body.userid

    try {
        const bookings= await Booking.find({userid:userid})
        res.send(bookings)
    } catch (error) {
        return res.status(400).json({ error })
    }



})


router.post("/cancelbooking", async (req, res) => {
    const[bookingid,roomid]=req.body
    try {
        const bookingitem =await Booking.findOne({_id:bookingid})
        bookingitem.status='cancelled'
        await bookingitem.save()
        const room =await Room.findOne({_id:roomid})

        const bookings=room.currentbookings
        const temp = bookings.filter(booking=>booking.bookingid.toString()!==bookingid)
        room.currentbookings=temp
        await room.save()

        res.send("Your Booking Cancelled Successfully")
    } catch (error) {
        return res.status(400).json({ error })
    }

})

router.get("/getallbookings", async (req, res) => {
    try {
        const bookings = await Booking.find()
        res.send(bookings)
    } catch (error) {
        return res.status(400).json({ error })
    }

})
module.exports=router;