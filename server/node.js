const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

let contentList = JSON.parse(fs.readFileSync('data/contentList.json'));
let faqList = JSON.parse(fs.readFileSync('data/faqList.json'));
let quizList = JSON.parse(fs.readFileSync('data/quizList.json'));

app.post('/api/chat', (req, res) => {
    let query = req.body.query.toLowerCase();
    let response = '';

    // 콘텐츠 추천 로직
    for (let content of contentList) {
        if (content.title.toLowerCase().includes(query) || content.tags.some(tag => query.includes(tag))) {
            response = `Title: ${content.title}, Creator: ${content.creator}, Tags: ${content.tags.join(', ')}, Summary: ${content.summary}`;
            break;
        }
    }

    // FAQ 검색 로직
    if (!response) {
        for (let faq of faqList) {
            if (faq.question.toLowerCase().includes(query) || faq.answer.toLowerCase().includes(query)) {
                response = faq.answer;
                break;
            }
        }
    }

    // 기본 응답
    if (!response) {
        response = "Sorry, I couldn't find any information on that.";
    }

    res.json({ response: response });
});

app.get('/api/quiz', (req, res) => {
    let randomQuiz = quizList[Math.floor(Math.random() * quizList.length)];
    res.json({ quiz: randomQuiz.question });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
