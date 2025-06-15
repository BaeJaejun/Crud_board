# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# 🧱 프로젝트 아키텍처 (CRUD 게시판)

## 라우팅 구조

| 경로        | 설명        |
| ----------- | ----------- |
| `/`         | 게시글 목록 |
| `/new`      | 게시글 작성 |
| `/post/:id` | 게시글 상세 |
| `/login`    | 로그인      |
| `/signup`   | 회원가입    |

## 디렉터리 구조

- `pages/`: 페이지 단위 화면
- `components/`: 재사용 가능한 UI
- `api/`: 서버 통신 함수 (axios 사용)
