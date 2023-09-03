const express = require('express');
const bcrypt = require('bcrypt');
const app = express();

const cors = require('cors');
const { mongoose } = require('mongoose');
const User = require('./models/User');
const Post = require('./models/Post');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const uploadMiddleware = multer({ dest: 'uploads/' });
const fs = require('fs');

const secret = 'dfghdfghdfghsjonsdfvbsfinb';

app.use(cors({credentials: true,origin: "http://localhost:3000"}));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads',express.static(__dirname + '/uploads'));

const mongoUrl = "mongodb://127.0.0.1:27017/blogApp";

const mongodb = async () => {

    mongoose.connect(mongoUrl)
    .then(() => {
        console.log("Connected");
    }).catch((e) => {
        console.log(e);
    });

}

mongodb();

app.post('/register', async (req,res) => {

    const { username,password} = req.body;

    const userDoc = await User.create({
        username,
        password
    })
    .then((data) => {
        res.json(data)
    }).catch((e) => {
        res.status(400).json(e)
    })
    ;

    res.json(userDoc);

});

app.post('/login', async (req,res) => {

    const { username,password } = req.body;
    const userDoc = await User.findOne({username});
    const passOk = bcrypt.compareSync(password,userDoc.password);
    if(passOk) {

        // Login
        jwt.sign({username,id: userDoc._id},secret,{},(err,token) => {

            if(err) throw err;
            res.cookie('token',token).json({
                id:userDoc._id,
                username
            });

        });
        // res.json()

    } else {
        res.status(400).json("Wrong Credential");
    }

});

app.get('/profile',(req,res) => {
    
    const {token} = req.cookies;

    jwt.verify(token,secret,{},(err,info) => {
        if (err) throw err;
        res.json(info);
    })

});

app.post('/logout',(req,res) => {
    res.cookie('token','').json('ok');
});

app.post('/post',uploadMiddleware.single('file'), async (req,res) => {

    const {originalname,path} = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path + '.' + ext;
    console.log(newPath)
    fs.renameSync(path,newPath);

    const {token} = req.cookies;
    jwt.verify(token,secret,{}, async (err,info) => {
        if (err) throw err;
        const {title,summary,content} = req.body;
        const postDoc = await Post.create({
            title,
            summary,
            content,
            cover: newPath, 
            author: info.id
        });
    
        res.json(postDoc);
    })
});

app.get('/post',async (req,res) => {
    res.json(await Post.find().populate('author',['username']));
})

app.get('/post/:id', async (req,res) => {
    const {id} = req.params;
    const postData = await Post.findById(id).populate('author',['username']);
    res.json(postData);
});

app.put('/post',uploadMiddleware.single('file'), async (req,res) => {
    
    let newPath = null;

    if(req.file) {    
        const {originalname,path} = req.file;
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        newPath = path + '.' + ext;
        fs.renameSync(path,newPath);
    }

    const {token} = req.cookies;
    jwt.verify(token,secret,{}, async (err,info) => {
        if (err) throw err;
        const test = req.body;
        const {id,title,summary,content} = req.body;
        const postDoc = await Post.findById(id);

        const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);

        if(!isAuthor) {
            return res.status(400).json('you are not the Author')
        }

        await postDoc.updateOne({
            title,
            summary,
            content,
            cover: newPath ? newPath : postDoc.cover,
        });
    
        res.json(postDoc);
    })

});

app.listen('4000',(err) => {
    if(!err) return console.log("Connected on Port 3000");
    console.log(err);
});