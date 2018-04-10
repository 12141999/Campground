var mongoose = require("mongoose");
var Camp = require("./campground_association");
var Comment = require("./campground_association_comment");

var data=[
{
   name : "horse",
   image :  "https://sp.yimg.com/ib/th?id=OIP.Kn-I3Hu6Q304p94Kb4ZENwHaFj&pid=15.1",
   description : "The essential joy of being with horses is that it brings us in contact with the rare elements of grace, beauty, spirit and freedom"
},
{
	name : "rabbit",
	image : "https://tse1.mm.bing.net/th?id=OIP.MSaoXnTUnGFtHQZP5cYa9gHaFj&pid=15.1&P=0&w=234&h=176",
	description  : "I loved 'Roger Rabbit' growing up "
},
{
	name : "house",
	image : "http://powerpictures.crystalgraphics.com/photo/3d_rendering_christmas_decorated_porch_with_little_trees_and_cg2p12245510c_th.jpg",
	description : "Houses are like people - some you like and some you don't like - and once in a while there is one you love "
}
]

function seedDB(){
       Camp.remove({},function(err){
          if(err)
          {
            console.log(err);
          }else{
            console.log("remove all campgrounds");
          }
       });
      	 data.forEach(function(seed){
    Camp.create(seed,function(err,campground){
        if(err)
        {
        	console.log(err);
        }else{
        	console.log("added new campgrounds");
        	Comment.create({
        		text : "this is very beautiful",
        		author : "james bond"
        	},function(err,comment){
               if(err)
               {
               	console.log(err);
               }else{
               	console.log("add a comment");
               	campground.comments.push(comment);
               	campground.save();
               }
        	});
      }
      });
   });
      
}

module.exports = seedDB;