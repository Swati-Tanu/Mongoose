const mongoose = require("mongoose");

//Connecting to the local MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/MasterMongoose",{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Connection Successful..."))
.catch((err) => console.log(err));

//Creating Schema
const mySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    city: {
        type: String,
        uppercase: true, //built-in validation
        trim: true //built-in validation
    },
    age: {
        type: Number,
        enum: [21,22,23,24,25,26,27,28,29,30], //built-in validation
    },
    role: {
        type: String,
        minlength: [2, "Minimum 2 letters required"], //built-in validation
        maxlength: 20, //built-in validation
    },
    active: Boolean,
    date: {
        type: Date,
        default: Date.now
    }
})

//Creating Model/Collection Creation
const Mymodel = mongoose.model("Mycollection", mySchema)

//Create/Insert a document
const createDocument = async () => {
    try{    
            const firstEmp = new Mymodel({
            name: "Tanu",
            city: "Bangalore",
            age: 23,
            role: "Back End Developer",
            active: true
            })  

//Insert multiple document
            const secondEmp = new Mymodel({
            name: "Sarthak",
            city: "Delhi",
            age: 22,
            role: "Front End Developer",
            active: true
            })  

            const thirdEmp = new Mymodel({
            name: "Ayush",
            city: "Gurgaon",
            age: 24,
            role: "Back End Developer",
            active: true
            })

            const forthEmp = new Mymodel({
            name: "Sourabh",
            city: "Noida",
            age: 25,
            role: "Back End Developer",
            active: true
            })

            //Calling one document
            const result = await firstEmp.save();
            console.log(result); 

            //Calling many documents
            const result2 = await Mymodel.insertMany([secondEmp, thirdEmp, forthEmp])
            console.log(result2);  
             

    }catch(err){
            console.log(err);
    }
}

createDocument();

//Read the document
const getDocument = async () => {
    try{
    const result = await Mymodel.find(); //All data
    const result2 = await Mymodel.find({role: "Front End Developer"}); //Applying filter
    //Applying filter, select, skip and limit.
    const result3 = await Mymodel.find({role: "Back End Developer"})
    .select({name:1})
    .skip(1)
    .limit(1)
    const result4 = await Mymodel.find({role: {$in: ["Back End Developer", "Front End Developer"]}})
    const result5 = await Mymodel.find({role: {$in: ["Back End Developer", "Front End Developer"]}})
    const result6 = await Mymodel.find()
    .sort({name: 1})
    console.log(result);
    console.log(result2);
    console.log(result3);
    console.log(result4);
    console.log(result5);
    console.log(result6);
    }catch(err){
        console.log(err);
    }
}

// getDocument();

//Update the document
//Difference between updateOne/updatemany and findByIdAndUpdate is that when we print the result in console, in case of updateOne/updatemany we get the updated value but in case of findByIdAndUpdate we get the previous value while it is updated in the database.
const updateDocument = async (_id) => {
    try{
   const result = await Mymodel.updateOne({_id}, {
    $set: {
        city: "Delhi"
    }
   });
   console.log(result);
}catch(err){
    console.log(err);
}
}

// updateDocument("64203db3800ae4d8a2bc1ef4");

//OR
const updateByFindDocument = async (_id) => {
    try{
   const result = await Mymodel.findByIdAndUpdate({_id}, {
    $set: {
        city: "Pune"
    }
   },{
        useFindAndModify : false
    });
   console.log(result);
}catch(err){
    console.log(err);
}
}

// updateByFindDocument("642038a49cdc1a9c9845c41e");

//Delete a document

const deleteDocument = async (_id) => {
    try{
   const result = await Mymodel.deleteOne({_id});
   console.log(result);
}catch(err){
    console.log(err);
}
}

// deleteDocument("642038a49cdc1a9c9845c410");

//OR
const deleteByFindDocument = async (_id) => {
    try{
   const result = await Mymodel.findByIdAndDelete({_id});
   console.log(result);
}catch(err){
    console.log(err);
}
}

// deleteByFindDocument("642038a49cdc1a9c9845c410")


