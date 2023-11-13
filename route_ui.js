const express = require('express');
const path = require('path')
const port = 3030;
const app = express();


const router = express.Router();
app.use('/', express.static(path.join(__dirname, '/html')));
app.use('/js', express.static(path.join(__dirname, '/js')));
app.use(router);
router.get('/', (req, res) => {
    res.sendFile(path.join(`${__dirname}/html/Homepage.html`))
});
router.get('/aboutus', (req, res) => {
    res.sendFile(path.join(`${__dirname}/html/aboutus.html`))
    console.log('Visited on port 3000, About us page')
});
router.get('/login', (req, res) => {
    res.sendFile(path.join(`${__dirname}/html/login.html`))
});
//router post login
router.get('/signup', (req, res) => {
    res.sendFile(path.join(`${__dirname}/html/signup.html`))
});
//router post signup
router.get('/productmanage', (req, res) => {
    res.sendFile(path.join(`${__dirname}/html/productmanage.html`))
});
//router post product manage
router.get('/usermanage', (req, res) => {
    res.sendFile(path.join(`${__dirname}/html/usermanage.html`))
});
router.get('/welcome', (req, res) => {
    res.sendFile(path.join(`${__dirname}/html/welcome.html`))
});
router.get('/search', (req, res) => {
    res.sendFile(__dirname + '/html/search.html');
});

// router.get('/searchresult', (req, res) => {
//     res.sendFile(path.join(`${__dirname}/html/searchresult.html`))
// });
// router.get('/detail1', (req, res) => {
//     res.sendFile(path.join(`${__dirname}/html/detail1.html`))
// });
// router.get('/detail2', (req, res) => {
//     res.sendFile(path.join(`${__dirname}/html/detail2.html`))
// });
// router.get('/detail3', (req, res) => {
//     res.sendFile(path.join(`${__dirname}/html/detail3.html`))
// });
// router.get('/detail4', (req, res) => {
//     res.sendFile(path.join(`${__dirname}/html/detail4.html`))
// });
// router.get('/detail5', (req, res) => {
//     res.sendFile(path.join(`${__dirname}/html/detail5.html`))
// });
router.use((req, res, next) => {
    res.status(404)
    console.log("404: Invalid accessed")
})
app.listen(port, function () {
    console.log(`Server listening on port: ${port}`)
    console.log(`Server for ui_website `)
});
// -------------------------------------------------------------------------











