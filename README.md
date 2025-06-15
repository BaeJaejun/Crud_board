# 📝 CRUD Board (Fullstack Project)

간단한 게시판 기능을 갖춘 풀스택 웹 애플리케이션입니다.

---

## 📁 프로젝트 구조

```
crud_board/
├── frontend/ # React + Vite + Tailwind 기반 프론트엔드
│ ├── src/
│ │ ├── pages/ # 라우팅 대상 페이지 (게시글 목록, 작성, 로그인 등)
│ │ ├── components/ # 재사용 가능한 UI 컴포넌트
│ │ ├── api/ # 서버 API 호출 함수
│ │ ├── App.jsx # 라우터 설정
│ │ ├── main.jsx # React 렌더링 시작점
│ │ └── index.css # TailwindCSS import 포함
│ └── vite.config.js # Vite 설정 파일
│
├── backend/ # Node.js + Express 기반 백엔드
│ ├── routes/ # RESTful API 라우트
│ ├── controllers/ # 요청 처리 로직
│ ├── models/ # 데이터 모델 (예: JSON, MongoDB 등)
│ ├── server.js # 서버 실행 진입점
│ └── ... # 필요한 기타 설정
│
├── .gitignore
├── README.md
└── package.json # 루트에 필요하면 작성 (혹은 frontend/backend 개별 관리)
```

---

## 🚀 주요 기능

- 회원가입 / 로그인
- 게시글 목록 보기
- 게시글 상세 보기
- 게시글 작성
- 댓글 작성

---

## 🛠️ 기술 스택

| 영역     | 기술                                    |
| -------- | --------------------------------------- |
| Frontend | React, Vite, React Router, Tailwind CSS |
| Backend  | Node.js, Express                        |
| 기타     | Git, GitHub                             |

---

## 📦 설치 및 실행 방법

### 1. 프론트엔드

```bash
cd frontend
npm install
npm run dev
```

### 2. 백엔드

```bash
cd backend
npm install
node server.js
```
