import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        outline: none;
        box-sizing: border-box;
    }
    body {
        background-color: #05323c;
    }
    a {
        text-decoration: none;
    }
    button {
        cursor: pointer;
    }
`;
