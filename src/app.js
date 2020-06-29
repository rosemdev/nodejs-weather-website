const path = require('path')
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express();

const port = process.env.PORT || 8080

//define path for express configs
const publicDir = path.join(__dirname, '../public');
const viewsDir = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//setup hbs and veiws location
app.set('view engine', 'hbs');
app.set('views', viewsDir);
hbs.registerPartials(partialsPath);

//st static directory to serve
app.use(express.static(publicDir));


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'rosem'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'rosem'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Do you need any help?',
        name: 'rosem'
    });
});

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'The address is required!'
        });
    }

    geocode(req.query.address, (error, {lat, lon, location} = {}) => {
        
        if (error) {
            return res.send({ error });
        }

        forecast(lat, lon, (error, data) => {

            if (error) {
                return res.send({ error });
            }
            
            res.send({
                forecast: data,
                location,
                address: req.query.address
            })

        });

    });

});


app.get('/help/*', (req, res) => {
    res.render('notFound', {
        message: 'Help article not found!',
        name: 'rosem'
    });
});

app.get('*', (req, res) => {
    res.render('notFound', {
        message: 'The page you are looking for doensn*t exist!',
        name: 'rosem'
    });
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}...`);
})