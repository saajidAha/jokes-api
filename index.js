import express from 'express';
import ejs from 'ejs';
import axios from 'axios';

const API_URL = ' https://v2.jokeapi.dev/joke';
const port = 3000;
const app = express();

app.use(express.urlencoded({extended: true}));

app.get('/', (req, res)=>{
    res.render('index.ejs',{content: 'waiting for data.............'})
})

app.post('/generate', async(req, res)=>{
    const category = req.body.type;
    console.log(category)
    if(category ==='misc' || category==='programming' || category==='dark' || category==='pun'){
        try{
            const response = await axios.get(`${API_URL}/${category}`);
            console.log(response);
            const data =  response.data.setup;
            console.log(data);
            res.render('index.ejs',{content: data});
        }
        catch(error){
            console.log(error);
            res.sendStatus(500).render('index.ejs', {content: 'small error with the server. please try again later.'})
        }
    }else{res.render('index.ejs',{content: 'invalid category. please try again.'})}
})

app.listen(port,()=>{
    console.log(`listening at port ${port}`)
})