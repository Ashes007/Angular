var express 	= require('express');  
var path 		= require("path");   
var bodyParser 	= require('body-parser');  
var mongo 		= require("mongoose"); 
var fs 			= require('fs');
var im 			= require('imagemagick');
const multer 	= require('multer');
const gm 		= require('gm');

const width = 300;
const height = 400;


var db = mongo.connect("mongodb://localhost:27017/sampledb", function(err, response){   // "sampledb" Database name
   if(err){ console.log( err); }  
   else{ 
   			//console.log('Connected to ' + db, ' + ', response); 
		}  
}); 

const DIR = '../src/assets/uploads';
const DIR_THUMB = '../src/assets/uploads/thumb';

var app = express()  
app.use(bodyParser());  
app.use(bodyParser.json({limit:'5mb'}));   
app.use(bodyParser.urlencoded({extended:true}));  
   
  
app.use(function (req, res, next) {        
     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');    
     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');    
     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');      
     res.setHeader('Access-Control-Allow-Credentials', true);       
     next();  
 });

var productImage; 
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, DIR);
    },
    filename: (req, file, cb) => {
      productImage = file.originalname;
      //console.log(file.originalname);
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
let upload = multer({storage: storage});

var Schema = mongo.Schema;  
  
var UsersSchema = new Schema({      
 fname: { type: String   },       
 lname: { type: String   },   
},{ versionKey: false });  
  
 var ProductSchema = new Schema({
 	productName: { type: String},
 	price: { type: String},
 	description: { type: String},
 	image: {type: String}
 }); 
  
var model = mongo.model('users', UsersSchema);  
var product = mongo.model('products',ProductSchema);
  
app.post("/api/SaveUser",function(req,res){   
	//console.log(req.body);
	var userData = { fname: req.body.firstName, lname: req.body.lastName };

 var mod = new model(userData);  

 if(req.body.mode =="Save")  
 {  
    mod.save(function(err,data){  
    	//console.log(data);
      if(err){  
         res.send(err);                
      }  
      else{        
          res.send({data:"Record has been Inserted..!!"});  
      }  
 });  
}  
else   
{  
 model.findByIdAndUpdate(req.body.id, userData,  
   function(err,data) {  
   if (err) {  
   res.send(err);         
   }  
   else{        
          res.send({data:"Record has been Updated..!!"});  
     }  
 });  
  
  
}  
}) 

 app.get("/api/getUser",function(req,res){  
    model.find({},function(err,data){  
              if(err){  
                  res.send(err);  
              }  
              else{                
                  res.send(data);  
                  }  
          });  
  }) 

 app.get("/api/getSingleUser/:id",function(req,res){  
    model.findOne({_id:req.params.id},function(err,data){  
              if(err){  
                  res.send(err);  
              }  
              else{         
                  res.send(data);  
              }  
          });  
  }) 

app.post("/api/deleteUser",function(req,res){   
    model.remove({ _id: req.body.id }, function(err) {    
     if(err){    
         res.send(err);    
     }    
     else{      
            res.send({data:"Record has been Deleted..!!"});               
        }    
 	});    
}) 
//upload.array("photo[]", 12)
app.post("/api/saveProduct",upload.single('img'),function(req,res){

	if(req.file == undefined)
		var imgName = '';
	else{
		var imgName = req.file.filename;	


	      	  fs.readFile(req.file.path, function (err, data) {
				    //var imgName = req.file.image.name
				    /// If there's an error
				    if(!imgName){
				      console.log("There was an error")
				      res.redirect("/");
				      res.end();
				    } else {
				      	var newPath = __dirname + "/"+DIR+"/" + imgName;
      					var thumbPath = __dirname + "/"+DIR_THUMB+"/" + imgName;
				      // write file to uploads/fullsize folder
				      fs.writeFile(newPath, data, function (err) {
				        // write file to uploads/thumbs folder
				        im.resize({
				          srcPath: newPath,
				          dstPath: thumbPath,
				          width:   200
				        }, function(err, stdout, stderr){
				          if (err) throw err;
				          console.log('resized image to fit within 200x200px');
				        });
				        
				      });
				    }
				  });



		}

	var productData = { productName: req.body.productName, 
						price: req.body.price, 
						description: req.body.description,
						image: imgName 
					  };
	var productModel = new product(productData);
	productModel.save(function(err,data){
		if(err)
		{
			res.send(err);
		}
		else
		{
			res.send({data:'Record added successfully'});
		}
	});
})

app.get("/api/getProduct/", function(req,res){
	product.find({},function(err,data){
		if(err){
			res.send(err);
		}
		else{
			res.send(data);
		}
	});
})

app.get("/api/deleteProduct/:id", function(req,res){
	product.findOne({_id:req.params.id}, function(err,data){
		if(err){
			res.send(err);
		}
		else
		{
			if(data.image != ''){
				var imageName = data.image;
				var imagePath = DIR+"/"+imageName;

				fs.unlink(imagePath, function (err) {
					if (err) {
						res.send(err);
					}					
				});	
			}
			//else{
				product.deleteOne({_id: req.params.id}, function(err,data){
					if(err){
						res.send(err);
					}
					else{			
						res.send({data: "Record deleted successfully"});
					}
				});
			//}

		}
		
	})
	
})



app.get("/api/getSingleProduct/:id", function(req,res){  
    product.findOne({_id:req.params.id}, function(err,data){  
              if(err){  
                  res.send(err);  
              }  
              else{         
                  res.send(data);  
              }  
          });  
  })

app.post("/api/updateProduct", upload.single('img'), function(req,res){

	 product.findOne({_id:req.body.id}, function(err,data){  
              if(err){  
                  res.send(err);  
              }  
              else{         
                  var oldImgName = data.image; 

                  if(req.file == undefined){
						var imgName = oldImgName;
					}
					else{
						var imgName = req.file.filename;
						var imagePath = DIR+"/"+oldImgName;
						fs.unlink(imagePath, function (err) {
									if (err) {
										res.send(err);
									}					
								});
					}

					productData = {productName: req.body.productName, price: req.body.price, description: req.body.description, image: imgName };
					product.update({_id:req.body.id}, productData, function(err,data){
					   if (err) {  
					   		res.send(err);         
					   }  
					   else{        
					          res.send({data:"Record has been Updated..!!"});  
					     }
					});

              }  
          });  

	
})


app.listen(8080, function () {    
 console.log('Example app listening on port 8080!')  
})  