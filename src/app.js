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
        required: true
    },
    city: String,
    age: Number,
    role: String,
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
            // const firstEmp = new Mymodel({
            // name: "Tanu",
            // city: "Bangalore",
            // age: 23,
            // role: "Back End Developer",
            // active: true
            // })  

//Insert multiple document
            const secondEmp = new Mymodel({
            name: "Sarthak",
            city: "Bangalore",
            age: 23,
            role: "Front End Developer",
            active: true
            })  

            const thirdEmp = new Mymodel({
            name: "Ayush",
            city: "Bangalore",
            age: 23,
            role: "Back End Developer",
            active: true
            })

            const forthEmp = new Mymodel({
            name: "Sourabh",
            city: "Bangalore",
            age: 23,
            role: "Back End Developer",
            active: true
            })

            //Calling one document
            // const result = await firstEmp.save();
            // console.log(result); 

            //Calling many documents
            const result = await Mymodel.insertMany([secondEmp, thirdEmp, forthEmp])
            console.log(result);  
             

    }catch(err){
            console.log(err);
    }
}

// createDocument();

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
    console.log(result);
    console.log(result2);
    console.log(result3);
    }catch(err){
        console.log(err);
    }
}

getDocument();



