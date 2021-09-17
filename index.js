require('dotenv').config();

const express=require('express');
const bodyParser= require('body-parser');
const cors=require("cors");
const MongoClient= require('mongodb').MongoClient;



const app=express();
const url="mongodb://localhost:27017/"

app.use(cors())
app.use(bodyParser.json())
const client= new MongoClient(url);

//database connection
client.connect().then(console.log("successfully connected")).catch(()=>{console.log("ERR")});
const database= client.db("Lib")


class Book{
    id
    #bookName
    #author
    #issueStatus
    #collection=database.collection("books")

    async createBook(id,bookName,author){
        this.id=id
        this.#bookName=bookName
        this.#author=author
        this.#issueStatus =0
       const data= await this.#collection.insertOne({
            "id":this.id,
            "bookName": this.#bookName,
            "Author": this.#author,
            "issued":this.#issueStatus
        })
        
    }
   async  getBook(){
       const books= await this.#collection.find().toArray()
        return books
    }
    async  getBookById(){
      const book= await this.#collection.find({"id":this.id}).toArray()
        return book
    }
   async setBook(){
        let data={}
       await this.getBookById(this.id).then(async (result)=>{
                await this.#collection.updateOne( { _id: result[0]._id, },
                    { $set: { issued: 1 }}).then(()=>{
                this.#bookName =result[0].bookName
                this.#author =result[0].Author
                this.#issueStatus=result[0].issued
                data={"Name":this.#bookName,"Auther":this.#author,"id":this.id}
            })
         }).catch(()=>console.log("error in updation"))
        return data

}

}
class User{
    #collection=database.collection("users");
    name;
    async IssueBook(id,Username){
        this.name=Username
        const B_obj = new Book()
        B_obj.id=id;
        const data =await B_obj.setBook()
        await this.#collection.insertOne({
            "userName":this.name,
            "book":data
        }) 
       
    }
}

// to get all the books in library
app.get("/api/book/view/",(req,res)=>{
    const B1=new Book()
    B1.getBook().then((result)=>res.status(200).json(result)).catch(()=>console.log("err"))
})
// to register new books in library
app.post("/api/book/reg/",(req,res)=>{
    const B1=new Book()
    B1.createBook(req.body.id,req.body.bookName,req.body.Author).then(()=>res.sendStatus(200)).catch(()=>{res.status(400).json({"error":"Can not insert document"})})
})
//to issue book
app.post("/api/book/issue/",(req,res)=>{
    const U1=new User()
    U1.IssueBook(req.body.id,req.body.userName).then(()=>res.sendStatus(200)).catch(()=>{res.status(400).json({"error":"Can not insert document"})})
})

const port=process.env.PORT|| 8000;

app.listen(port,()=>{
    console.log(`http :${port}`);
});
