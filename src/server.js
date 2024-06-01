import express from 'express';

import { connectToDb, db } from './db.js';

const app = express();
app.use(express.json());

app.get('/api/articles/:name', async (req, res) => {
    const { name } = req.params;

    const article = await db.collection('articles').findOne({ name });

    if (article) {
        res.json(article);
    } else {
        res.sendStatus(404);
    }
});

app.put('/api/articles/:name/upvote', async (req, res) => {
    const { name } = req.params;

    await db.collection('articles').updateOne({ name }, {
        $inc: { upvotes: 1 },
    });
    const article = await db.collection('articles').findOne({ name });

    if (article) {
        res.send(`The ${name} article now has ${article.upvotes} upvotes!!!`);
    } else {
        res.send('That article doesn\'t exist');
    }
});

app.post('/api/articles/:name/comments', async (req, res) => {
    const { name } = req.params;
    const { postedBy, text } = req.body;

    await db.collection('articles').updateOne({ name }, {
        $push: { comments: { postedBy, text } },
    });
    const article = await db.collection('articles').findOne({ name });

    if (article) {
        res.send(article.comments);
    } else {
        res.send('That article doesn\'t exist!');
    }
});

connectToDb(() => {
    console.log('Successfully connected to database!');
    app.listen(8000, () => {
        console.log('Server is listening on port 8000');
    });
})

/*

import express from 'express';

=======

>>>>>>> 43d4227e815c647eb95d0e37731be80898f29cc9
import { connectToDb, db } from './db.js';

const app = express();

app.use(express.json());

app.get('/api/articles/:name', async (req, res) => {
    const { name } = req.params;

<<<<<<< HEAD
=======

>>>>>>> 43d4227e815c647eb95d0e37731be80898f29cc9

    const article = await db.collection('articles').findOne({ name });//to use specific id

    if (article) {
        res.json(article);
    }
    else {
        res.sendStatus(404);
    }

})

app.put('/api/articles/:name/upvote', async (req, res) => {
    const { name } = req.params;

    // const article = articlesInfo.find(a => a.name === name);



    db.collection('articles').updateOne({ name }, {
        $inc: { upvotes: 1 },
    })

    const article = await db.collection('articles').findOne({ name });

    if (article) {
        res.send(`The ${name} article now has ${article.upvotes} upvotes`);
    }
    else {
        res.send('That article doesn\'t exist');
    }
});

app.post('/api/articles/:name/comments', async (req, res) => {

    const { name } = req.params;
    const { postedBy, text } = req.body;



    await db.collection('articles').updateOne({ name }, {
        $push: { comments: { postedBy, text } },
    })

    const article = await db.collection('articles').findOne({ name });

    if (article) {
        res.send(article.comments);
    }
    else {
        res.send("The article doesn't exist");
    }

})

connectToDb(() => {
    console.log('Successfully connected to database!!')
    app.listen(8000, () => {
        console.log("Server is listening on port 8000");
    });
})
<<<<<<< HEAD

*/