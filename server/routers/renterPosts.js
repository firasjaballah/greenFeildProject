const express = require("express");
const router = express.Router();
const RenterPost =require('../models/renterPost');



const RenterPostsController = require("../controllers/renterPosts");
const { Router } = require("react-router-dom");

// prettier-ignore
router.route("/")
    .get(RenterPostsController.find_All)
    .post(RenterPostsController.create_A_New_One)

// prettier-ignore
router.route("/:renterPostId")
    .get(RenterPostsController.find_One)
    .put(RenterPostsController.update_One)
    .patch(RenterPostsController.view_Plus_PLUS)
    .delete(RenterPostsController.remove_One)

router.post('/api/commentpost',(req,res)=>{
    RenterPost.findByIdAndUpdate(req.body.postUser._id, { $push: {comments:{comment:req.body}}}, (err,res)=>{
        if(err){
            console.log(err)
        }
        else{
            console.log(res)
        }
    })
    
    })

module.exports = router;
