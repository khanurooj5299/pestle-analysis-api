const mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
    "end_year": Number,
    "intensity": Number,
    "sector": String,
    "topic": String,
    "insight": String,
    "url": String,
    "region": String,
    "start_year": Number,
    "impact": Number,
    "added": Date,
    "published": Date,
    "country": String,
    "relevance": Number,
    "pestle": String,
    "source": String,
    "title": String,
    "likelihood": Number
});

const ArticleModel = mongoose.model('articles', articleSchema);

module.exports = ArticleModel;