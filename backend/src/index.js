// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';


// ReactDOM.render( 
//     <App/> ,
//     document.getElementById('root')
// );

import dva from 'dva';
import App from "@/containers"
import login from "./store/login"
const createBrowserHistory = require("history").createBrowserHistory


const app = dva({
    history: createBrowserHistory()
});
//store 挂载
app.model(login)
app.router(App);
app.start("#root"); //public中节点  #root