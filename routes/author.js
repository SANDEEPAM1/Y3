const express = require('express')
const router = express.Router()
const Author = require('../models/author')
// all author routes

router.get('/', async (req,res)=>{
    let searchOptions = {}
    if(req.query.name != null & req.query.name !== ''){
        searchOptions.name = new RegExp(req.query.name,'i')
    }

    try {
        const authors = await Author.find(searchOptions)
        res.render('author/index', {
            authors:authors, 
            errorMessage: null, 
            searchOptions:req.query})
    } catch (error) {
        res.redirect('/')
    }
   
})

// new author 
router.get('/new',(req,res)=>{
    res.render('author/new', {author: new Author(), errorMessage: null})
})

// create user
router.post('/', async (req,res)=>{
const author = new Author({
        name: req.body.name
})   

try {
    
    const newAuthor = await author.save()
    res.redirect('authors')

} catch {
    res.render('author/new',{
        author:author, 
        errorMessage:'Error creating Author'})
}

})


module.exports = router