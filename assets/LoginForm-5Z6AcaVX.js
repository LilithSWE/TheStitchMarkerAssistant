import{u as E,r as c,j as e}from"./index-DBiGbhcg.js";import{B as l}from"./Button-Cq6hTME8.js";import{H as L}from"./Headline-CBtUAaj2.js";import{s as y}from"./supabaseClient-D0YvXYgE.js";import{v as P}from"./validateEmail-BIDw8Q-C.js";import{v}from"./validatePassword-5G1YVJAs.js";import{L as T}from"./Loader-B3sZb3M8.js";const R=()=>{const g=E(),n=document.getElementById("errorMsg"),[r,p]=c.useState({email:"",password:""}),[x,d]=c.useState(!0),[w,m]=c.useState(!1),u=t=>{p({...r,[t.target.name]:t.target.value}),t.target.classList.remove("error"),r.email&&r.password&&d(!0)},j=(t,o)=>{if(n){if(t&&o)return;if(n.innerText="Please edit in the following fields: [",!t){n.innerText+=" Email ";const s=document.getElementById("loginEmailInput");s==null||s.classList.add("error")}if(!o){n.innerText+="Password ";const s=document.getElementById("loginPasswordInput");s==null||s.classList.add("error")}d(!1),n.innerText+="]"}},C=async(t,o)=>{m(!0);const{data:s,error:i}=await y.auth.signInWithPassword({email:t,password:o});return i?(console.error("Error signing in:",i.message),setTimeout(()=>{const a=document.getElementById("loader");a==null||a.classList.add("fadeOut")},650),setTimeout(()=>{m(!1)},750),null):(setTimeout(()=>{const a=document.getElementById("loader");a==null||a.classList.add("fadeOut")},650),setTimeout(()=>{m(!1)},750),{user:s.user})},f=()=>{const t=P(r.email),o=v(r.password);if(r.email===""&&r.password===""){d(!1),n&&(n.innerText="Please write something in the fields above.");const s=document.getElementById("loginEmailInput");s==null||s.classList.add("error");const i=document.getElementById("loginPasswordInput");i==null||i.classList.add("error");return}j(t,o),t&&o&&C(r.email,r.password).then(s=>{s?(localStorage.setItem("user_id",s.user.id),h()):(console.error("Sign-in failed."),n&&(n.innerText="Wrong Email and/or Password!"))})},I=()=>{setTimeout(()=>{g("/forgotPassword")},300)},h=()=>{setTimeout(()=>{g("/")},300)};return e.jsxs(e.Fragment,{children:[w?e.jsx(T,{}):e.jsx(e.Fragment,{}),e.jsxs("section",{className:"firstView",children:[e.jsx(L,{}),e.jsxs("form",{children:[e.jsx("h5",{children:"Email"}),e.jsx("input",{type:"email",name:"email",id:"loginEmailInput",value:r.email,onChange:u}),e.jsx("h5",{children:"Password"}),e.jsx("input",{type:"password",name:"password",id:"loginPasswordInput",value:r.password,onChange:u}),e.jsx("p",{id:"errorMsg"})]}),e.jsxs("div",{className:"primaryBtnContainer",children:[x?e.jsx(l,{bgColor:"primary",onClick:f,children:e.jsx(e.Fragment,{children:"Log In"})}):e.jsx(l,{bgColor:"disabled",onClick:f,children:e.jsx(e.Fragment,{children:"Log In"})}),e.jsx(l,{bgColor:"secondary",onClick:I,children:e.jsx(e.Fragment,{children:"Forgot Password"})}),e.jsx(l,{bgColor:"return",onClick:h,children:e.jsx(e.Fragment,{children:"Return"})})]})]})]})};export{R as Loginform};
