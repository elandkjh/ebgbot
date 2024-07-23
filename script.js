from flask import Flask, request, jsonify, send_from_directory
import json
import random
import os
import openai
from dotenv import load_dotenv

# .env 파일에서 환경 변수 로드
load_dotenv()

app = Flask(__name__)

# 데이터 로드
with open('data/contentList.json', 'r', encoding='utf-8') as f:
    content_list = json.load(f)

with open('data/faqList.json', 'r', encoding='utf-8') as f:
    faq_list = json.load(f)

with open('data/quizList.json', 'r', encoding='utf-8') as f:
    quiz_list = json.load(f)

# OpenAI API 키 설정
openai.api_key = os.getenv("OPENAI_API_KEY")

def gpt4o_mini_api_call(prompt):
    response = openai.Completion.create(
        model="gpt-4o-mini",
        prompt=prompt,
        max_tokens=100
    )
    return response.choices[0].text.strip()

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/styles.css')
def styles():
    return send_from_directory('.', 'styles.css')

@app.route('/script.js')
def script():
    return send_from_directory('.', 'script.js')

@app.route('/chat', methods=['POST'])
def chat():
    query = request.json.get('query')
    response = ''

    # 콘텐츠 추천 로직
    for content in content_list:
        if query in content['title'] or any(tag in query for tag in content['tags']):
            response = f"제목: {content['title']}, 제작자: {content['creator']}, 태그: {', '.join(content['tags'])}, 요약: {content['summary']}"
            break

    # FAQ 검색 로직
    if not response:
        for faq in faq_list:
            if query in faq['question'] or query in faq['answer']:
                response = faq['answer']
                break

    # GPT-4o Mini API 호출
    if not response:
        response = gpt4o_mini_api_call(query)

    # 응답이 너무 길 경우 줄이기
    if len(response) > 600:
        response = response[:597] + "..."

    return jsonify({'response': response})

@app.route('/quiz', methods=['GET'])
def quiz():
    random_quiz = random.choice(quiz_list)
    return jsonify({'quiz': random_quiz['question']})

if __name__ == '__main__':
    app.run(debug=True)
