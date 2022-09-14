import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }

  body {
    // align-items: center;
    background-color: ${({ theme }) => theme.body};

    // display: flex;
    // flex-direction: column;
    // justify-content: center;
    // height: 100vh;
    // margin: 0;
    // padding: 0;
    // font-family: BlinkMacSystemFont, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    // transition: all 0.25s linear;
  }
  p{
    color: ${({ theme }) => theme.text};
  }
  span{
    color: ${({ theme }) => theme.text};
  
  }
  h6{
    color: ${({ theme }) => theme.text}
  }
  h2{
    color: ${({ theme }) => theme.text}
  }
  h3{
    color: ${({ theme }) => theme.text}
  }
  label{
    color: ${({ theme }) => theme.text}
  }
  card{
    background-color: ${({ theme }) => theme.Card}
  }
  input{
    background-color: ${({ theme }) => theme.input}
  }
  div{
    color: ${({ theme }) => theme.div}
  }
  .shadow{
    background-color: ${({ theme }) => theme.shadow};
    color: ${({ theme }) => theme.shadowButton}
    border-radius: 20px
  }
  input[type= "text"]{
    background-color: ${({ theme }) => theme.input};
    outline:none;
    color: ${({ theme }) => theme.inputcolor}
  }
  input[type= "email"]{
    background-color: ${({ theme }) => theme.input};
    outline:none;
    color: ${({ theme }) => theme.inputcolor}

  }
  input[type= "password"]{
    background-color: ${({ theme }) => theme.input};
    outline:none;
    color: ${({ theme }) => theme.inputcolor}
  }

.logo-img{
  fill: ${({ theme }) => theme.iamge} !important;
}

.icon-color{
  color: ${({ theme }) => theme.icon}
}

.modal-color{
  background-color: ${({ theme }) => theme.modal}
}
.nav-color{
  background-color: ${({ theme }) => theme.navColor}
}
.login-main-heading{
  color: ${({ theme }) => theme.accounttext}
}
.lable-text{
  color: ${({ theme }) => theme.labelText}
}
.react-iconss{

}
  `;
