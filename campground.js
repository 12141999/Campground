var express = require("express");
var path=require('path');
var methodOverride = require("method-override");
/*var catMe = require("cat-me");
catMe();*/
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
var Camp = require("./campground_association");
var Comment = require("./campground_association_comment");
var seedDB = require("./camp_comment");
mongoose.connect("mongodb://localhost/camp_ground");
app.use(bodyParser.urlencoded({extended : true}));
app.use('', express.static(path.join(__dirname + '')));
app.set('views', path.join(__dirname, 'views'));
seedDB();

app.post("/addnew",function(req,res){
   var name = req.body.name;
   var image= req.body.image;
   var des = req.body.description;
   var newdata = {name : name , image : image , description : des};
   Camp.create(newdata,function(err,data){
      if(err)
      {
      	console.log(err);
      }else{
      	res.redirect("/home");
      	  }
   });
});

app.get("/campground/:id",function(req,res){
	Camp.findById(req.params.id,function(err,foundblog){
		if(err)
		{
			console.log(err);
		}else{
			console.log(foundblog);
            res.render("more.ejs",{campground : foundblog});
		}
	});
});

app.get("/campground/:id/comments/new",function(req,res){
   Camp.findById(req.params.id,function(err,getschema){
      if(err){
      	console.log(err);
      }else{
      	res.render("add4.ejs",{p : getschema});
      }
   });
});

app.post("/campground/:id/comments",function(req,res){
    Camp.findById(req.params.id,function(err,campground){
        if(err)
        {
        	console.log(err);
        	res.redirect("/home");
        }else{

        	Comment.create(req.body.comment,function(err,comment){
                if(err){
                	console.log(err);
                }else{
                	campground.comments.push(comment);
                	campground.save();
                	res.redirect("/campground/" + campground._id);
                }
        	});
       
        }
    });
});

app.get("/newcamp",function(req,res){
   res.render("add3.ejs");
});

app.get("/home",function(req,res){
	Camp.find({},function(err,found){
       if(err)
       {
       	console.log(err);
       }else{
       	  res.render("home5.ejs",{p : found});
       }

	});
});

app.post("/deleted",function(req,res){
    var name = req.body.name;
    Camp.remove({name : name} , function(err){
       if(err)
       {
       	console.log(err);
       }else{
       	console.log("succesfully deleted");
       	res.redirect("/home");
       }
    });
});



app.post("/updated",function(req,res){
   var name = req.body.name;
   var image = req.body.image;
   var des = req.body.description;
   Camp.update({name : name},{image : image , description : des},function(err,result){
       if(err)
       {
       	console.log(err);
       }else{
       	console.log(result);
       	res.redirect("/home");
       }
   });
});

app.get("/addcomment",function(req,res){
    res.render("add4.ejs");
}); 

app.get("/update",function(req,res){
    res.render("update3.ejs");
}); 

app.get("/delete",function(req,res){
    res.render("delete3.ejs");
}); 

app.get("/header",function(req,res){
     res.render("header.ejs");
});

app.get("/footer",function(req,res){
     res.render("footer.ejs");
});

app.listen('5066',function(){
	console.log("sever is started");
});