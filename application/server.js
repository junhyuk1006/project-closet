const express = require('express');
const path = require('path');
const app = express();

// 이미지 디렉터리 경로를 static으로 설정
app.use('/images', express.static(path.join(__dirname, 'images')));

// React 정적 파일 서빙
app.use(express.static(path.join(__dirname, '../frontend/build')));

// API 예시
app.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello from the backend!' });
});

// React 라우팅: 없는 라우트 요청은 React의 index.html로 전달
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

// 서버 실행
const PORT = process.env.PORT || 3000; // 원하는 포트로 변경 가능
app.listen(PORT, () => {
    console.log(`Server running on http://13.209.5.239:${PORT}`);
});