import express from 'express'
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { MongoClient } from 'mongodb';
import cors from 'cors';


const app = express();
const port = 3000;

app.use(cors());
app.use(express.json())

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


///////// Middleware function
app.use((req, res, next) => {
    console.log('Requête reçue à :', Date.now())
    console.log(`Route demandée: ${req.url}`);
    next()
})

/////////// Les 3 routes
app.get('/route1', (req, res) => {
    res.send('Hello route1');
});

app.get('/route2', (req,res) => {
    res.send('Hello route2')
});

app.get('/route3', (req,res) => {
    res.send('Hello route3')
});

//////////// Get about
app.get('/about', (req, res) => {
    if (req.method !== 'GET') {
        console.log('Abort');
    }
    console.log('Envoie des infos');
    res.send({author: 'kouss'});
});

////////// Get Home
app.get('/', (req, res) => {
    res.send('Welcome')
});

///////// Get private
app.get('/private', (req, res) => {
    res.send('You are in private ;)')
});

///////// Get private mine
app.get('/private/mine', (req, res) => {
    res.send('You are in private mine ;)')
});

///////// Get pictures
app.get('/pictures', (req, res) => {
    const imgPath = path.join(__dirname, 'img', 'github.png');
    res.download(imgPath, 'github.png');
});


///////// Get cours dynamique
// app.get('/cours/:numeroducours/dscr', (req, res) => {
//     const numeroCours = req.params.numeroducours;
//     res.send(`Vous avez demandé le cours numéro ${numeroCours}`);
// });

/////////// Le moteur de vue EJS
app.set('view engine', 'ejs');

//////////// Dossier des vues
app.set('views', path.join(__dirname, 'views'));



app.get('/cours', (req, res) => {
    const titre = 'Introduction à Node.js';
    const descriptif = 'Ce cours couvre les bases de Node.js, y compris les modules, les événements et le système de fichiers.';
    const enseignants = ['Ahmed', 'Bob', 'Kouss'];

    res.render('cours', {
        titre: titre,
        descriptif: descriptif,
        enseignants: enseignants
    });
});


const coursData = [
    {
        numero: 1,
        titre: 'Introduction à Node.js',
        descriptif: 'Ce cours couvre les bases de Node.js, y compris les modules, les événements et le système de fichiers.',
        enseignants: ['Alice', 'Bob', 'Charlie']
    },
    {
        numero: 2,
        titre: 'Python',
        descriptif: 'Ce cours ........',
        enseignants: ['Momo', 'Hakim', 'Modest']
    },
    {
        numero: 3,
        titre: 'Programmation en Python',
        descriptif: 'Ce cours couvre les bases de la programmation en Python, y compris les structures de données, les fonctions et les modules.',
        enseignants: ['Ines', 'Eve', 'Frank']
    },
    {
        numero: 4,
        titre: 'Programmation en Php',
        descriptif: 'Ce cours .',
        enseignants: ['Ines', 'Fateh', 'Frank']
    }
];

app.get('/cours/:numeroducours/dscr', (req, res) => {
    const numeroCours = parseInt(req.params.numeroducours, 10);
    const cours = coursData.find(c => c.numero === numeroCours);

    if (cours) {
        res.render('cours', {
            titre: cours.titre,
            descriptif: cours.descriptif,
            enseignants: cours.enseignants
        });
    } else {
        res.status(404).send('Cours non trouvé');
    }
});

////////// Post form
app.post('/form', async function (req,res){
    const data = req.body
    const uri='mongodb+srv://koceilaHk:4xSBU3-HTxfa5da@cluster0.hk97rdt.mongodb.net/';
    const  client = new MongoClient(uri);

    await client.connect();

    const dbname ='users';
    const collectionName = 'Users';

    const database = client.db(dbname);
    const collection = database.collection(collectionName)

    const users =[]
    users.push(data)

    const insert= await collection.insertMany(recipes)
})


///////// Middleware error
app.use((req, res, next) => {
    res.status(404).send('URL non existante!')
})

app.listen(port, () => {
    console.log(`I'm here ${port}`);
})

// 4xSBU3-HTxfa5da

