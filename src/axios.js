import axios from 'axios';
import el from "element-ui/src/locale/lang/el";
import ElementUI from 'element-ui';
import router from './router'
import store from './store'

axios.defaults.baseURL="http://localhost:9090"

//前置拦截
axios.interceptors.request.use(config=>{

    return config;

})

axios.interceptors.response.use(response=>{
    let res = response.data;
    console.log("===========")
    console.log(res)
    console.log("===========")

    if (res.code === 200){
        return response
    }else{

        ElementUI.Message({message:"密码或者用户名错误，请重试",type:"error",duration: 5*1000,showClose:true,center:true});

        return  Promise.reject(response.data.msg)
    }
},
    error => {

    if (error.response.data){
        error.message = error.response.data.msg
    }

    if(error.response.status === 400){
       store.commit("REMOVE_INFO")
        router.push("/login")
      }
    ElementUI.Message({message:error.message,type:"error",duration: 5*1000,showClose:true,center:true});
    return  Promise.reject(error)

}
)