const express = require('express');
const route = express.Router();

const { mongoose } = require('./database/mongo');

const userSchema = new mongoose.Schema({
    nome: String,
    email: String,
    password: String,
});
  
const User = mongoose.model('User', userSchema);

route.get('/', (req, res) => {
    return res.render('login');
});

route.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log({email, password})
    await User.findOne({ email, password }, (err, user) => {
        if(err) return res.status(400).json({ error: e });
        if(user === null) return res.status(400).render('404');

		return res.status(200).render('success');
    })
});

route.get('/register', (req, res) => {
    return res.render('register');
});


// Home
route.get('/home', async (req, res) => {
	try {
		await User.find((err, users) => {
            if(err) return res.status(400).json({error: e});

			return res.status(200).render('home', { users })
		})

	} catch (e) {
		return res.status(400).json({ err: e });
	}
});

route.post('/home', async (req, res) => {
    try {
        const { nome, email, password } = req.body;

        
        const user = User({
          nome, email, password
        });
  
        await user.save((err, userSalvo) => {
          if (err) return res.status(400).json(err);
        
          return res.status(200).json(userSalvo)
        });

    } catch(e) {
        console.log(e)
        return res.status(400).json({error: e})
    }
});

module.exports = route;