const eslint = {
    env: {
        es6: true,
        node: true
    },
    parserOptions: {
        ecmaVersion: 2019,
        sourceType: 'module'
    },
    extends: [
        'airbnb-base',
        'eslint:recommended'
    ],
    globals: {
        Define: true,
        ENV: true,
        CustomError: true
    },
    rules: {
        'import/no-dynamic-require': 0, // 다이나믹 require 허용
        indent: ['error', 4, { SwitchCase: 1 }], // js indent 관련 기존 사용 규칙 따르도록
        'linebreak-style': 0, // CRLF, LF 이슈 Cross-OS 확인 후 되살림 혹은 유지 필요
        'no-sparse-arrays': 0, // [, 1, 2] <- 이와 같은 배열 내 뛰어넘기 가능토록
        'global-require': 0, // require를 변수 선언 시 외에 사용 가능토록
        'no-param-reassign': ['error', { props: false }], // 매개 변수 객체 내용 변경 허용
        'no-plusplus': 0, // 증감 연산자 허용
        'comma-dangle': ['error', 'never'], // [eslint] 마지막 comma 없는 것으로
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off', // 추가 설정 확인 요망
        'no-debugger': 'error', // [default] debugger 사용 불가
        'max-len': ['error', {
            code: 100, // [default-airbnb] 1줄에 100자 이내로 작성
            ignoreComments: true, // [eslint] 주석은 max-len 적용 안함
            ignoreTrailingComments: true, // [eslint] 코드 뒤에 붙은 주석도 max-len 적용 안함
            ignoreUrls: true, // [eslint] url은 max-len 적용 안함
            ignoreStrings: true, // [eslint] 문자열 max-len 적용 안함
            ignoreTemplateLiterals: true, // [eslint] `` 을 사용한 문자열 max-len 적용 안함
            ignoreRegExpLiterals: true // [eslint] 정규식 max-len 적용 안함
        }],
        'no-undef-init': 'error', // [default] undefined 로 초기화 불가
        'no-else-return': 'off', // [회의] else return 허용
        'keyword-spacing': ['error', { before: true }], // [eslint] web과 동일하게 맞추기 위해 적용
        // 'no-restricted-syntax': 0, // Object.keys, values 함수 사용 시 __proto__ 내 내용을 가져오지 못 하기에 사용 필수
        // 'guard-for-in': 0, // 해당 옵션 사용 시 for in 문 내 조건문이 무조건 존재해야 됨
        'object-property-newline': ['error', { allowAllPropertiesOnSameLine: true }] // [회의] 한 줄에 모든 property를 적거나 아니면 한 줄에 1개만
    },
    settings: {
        'import/resolver': {
            alias: [
                ['@', '.']
            ]
        }
    }
};

module.exports = eslint;
