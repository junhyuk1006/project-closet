import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import prettierConfig from 'eslint-config-prettier';
import pluginPrettier from 'eslint-plugin-prettier';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.{js,mjs,cjs,jsx}'], // ESLint를 적용할 파일 패턴
    languageOptions: {
      globals: globals.browser, // 브라우저 환경의 글로벌 변수 설정
    },
    plugins: {
      prettier: pluginPrettier, // Prettier 플러그인 추가
    },
    rules: {
      'prettier/prettier': 'error', // Prettier 규칙을 ESLint로 적용
    },
    settings: {
      react: {
        version: 'detect', // React 버전 자동 감지
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: true, // 사용되지 않는 ESLint 비활성화 지시어 경고
    },
  },
  pluginJs.configs.recommended, // JavaScript 권장 설정
  pluginReact.configs.flat.recommended, // React 권장 설정
  {
    rules: {
      'react/react-in-jsx-scope': 'off', // React를 스코프에 명시적으로 가져오지 않아도 에러 발생하지 않도록
      'react/jsx-uses-react': 'off', // JSX에서 React 사용 여부 확인 비활성화
    },
  },
  prettierConfig, // Prettier 설정 추가 (ESLint와 충돌 방지)
];
