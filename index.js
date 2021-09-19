require('dotenv').config();

const express=require('express');
const bodyParser= require('body-parser');
const cors=require("cors");
const MongoClient= require('mongodb').MongoClient;
const {ObjectId} = require('mongodb')



const app=express();
const url="mongodb://localhost:27017/"

app.use(cors())
app.use(bodyParser.json())
const client= new MongoClient(url);

//database connection
client.connect().then(console.log("successfully connected")).catch(()=>{console.log("ERR")});
const database= client.db("Lib")
   
const bookCollection = database.collection("books")
const userCollection = database.collection("users")

class Book{
    constructor(opt){

        this.name=opt.name;
        this.author= opt.author;
        opt.issueStatus==null?this.issuedStatus=0:this.issuedStatus=opt.issueStatus;
    }
    async save(){
       const data= await bookCollection.insertOne({"Name":this.name,"Author":this.author,"IssueStatus":this.issuedStatus})
       return data
    }
    static async isExisting(id){
        return await bookCollection.findOne({_id:ObjectId(id)})?true:false;
    }
    static async isIssued(id){
        return await bookCollection.findOne({_id:ObjectId(id),IssueStatus:0})?true:false;
        
    }

    static async find(id){
        const book1=await bookCollection.findOne({'_id':ObjectId(id)})
        const book = new Book({name:book1.Name,author:book1.Author,issueStatus:book1.IssueStatus})
 

        return book;

    }
    static async listAll(){
        const book1= await bookCollection.find().toArray()
        return book1;

    }
    static async listAvailable(){
        const book1= await bookCollection.find({"IssueStatus":0}).toArray()
        return book1;

    }
    static async update(id, data){
        const bid =ObjectId(id)
        console.log(data)
        const s= await bookCollection.updateOne({"_id":bid},{$set:data});
        console.log(s)
    }
}
class User{
    constructor(opt){
        this.name=opt.name;
        this.phone=opt.phoneno
    }
    async save(){
        const data= await userCollection.insertOne({"Name":this.name,"phone":this.phone});
        return data
     }
     static async listAll(){
        const users= await userCollection.find().toArray()
        return users;

    }
     static async issueBook(userId,bookId){
         let status =true
         const uId=ObjectId(userId)
        await Book.isIssued(ObjectId(bookId)).then(async (data)=>{
           if(data){
            await Book.update(bookId,{"IssueStatus":1}).then(async ()=>{
                await userCollection.updateOne({_id:uId},{$set:{"bookId":ObjectId(bookId)}}).catch(()=>{console.log("error in user updation");status=false})
            }).catch(()=>{console.log("error in book updation");status=false})
        }
        else{
            status=false
        }

         }).catch(()=>{console.log("error in validation of book");status=false})
         return status;
        
    
   
     }
    
}

//book routes
app.get("/api/book/all",async (req,res)=>{
                 await Book.listAll().then((data)=>{res.status(200).json(data);}).catch(()=>res.sendStatus(400))
                
        })
app.get("/api/book/available",async (req,res)=>{
                 await Book.listAvailable().then((data)=>{res.status(200).json(data);}).catch(()=>res.sendStatus(400))
                
        })
app.get("/api/book/:bookId",async (req,res)=>{
    const id= req.params.bookId;
    await Book.find(id).then((data)=>{res.status(200).json({"Name":data.name,"Author":data.author,"IssueStatus":data.issuedStatus});}).catch(()=>res.sendStatus(400))
    
})
app.post("/api/book/register",async (req,res)=>{
                const book = new Book(req.body);
                book.save().then((data)=>res.status(200).json(data)).catch(()=>res.status(400))
        })

// user routes
app.post("/api/user/register",async (req,res)=>{
                const user = new User(req.body);
                user.save().then((data)=>res.status(200).json(data)).catch(()=>res.status(400))
        })
app.get("/api/user/all",async (req,res)=>{
            await User.listAll().then((data)=>{res.status(200).json(data);}).catch(()=>res.sendStatus(400))
           
   })
app.patch("/api/:userId/issue/:bookId",async (req,res)=>{
    await User.issueBook(req.params.userId,req.params.bookId).then((data)=>{
        if(data){
            res.status(200).json({data})}
            else{
                res.status(400).json({"msg":"Book already Issued"})
            }
        })
        .catch(()=>{res.status(500).json({"msg":"Issued failed"})})
})

const port=process.env.PORT|| 8000;

app.listen(port,()=>{
    console.log(`http :${port}`);
});
