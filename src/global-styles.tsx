import { createGlobalStyle, ThemeProps } from 'styled-components'

import { Theme } from './theme'

const GlobalStyle = createGlobalStyle<ThemeProps<Theme>>`
  #__next,
  html,
  body,
  #root {
    height: 100%;
    width: 100%;
    padding: 0;
    margin: 0;
    font-weight: normal;
    -webkit-font-smoothing: antialiased;
    color: #FFFFFF;
    font-family: ${({ theme }) => theme.ralewayFont};
    font-size: 14px;
  }
  
  button, input, textarea {
    font-family: ${({ theme }) => theme.ralewayFont};
  }
  
  * {
    box-sizing: border-box;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  
  li {
    margin: 0;
    padding: 0;
  }

  ::-webkit-scrollbar{
      width: 4px;
      height: 4px;
  }

  ::-webkit-scrollbar-thumb{
      background-color: rgba(255,255,255,.7);
  }
`

export default GlobalStyle
