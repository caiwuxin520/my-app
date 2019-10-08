
//设置本地存储
export function setLocalStorage(key, value){
    var curTime = new Date().getTime();
    localStorage.setItem(key,JSON.stringify({data:value,time:curTime}));
}

//动态请求地址
let location = window.location
 //export const url = location.protocol + '//' + location.host + '/'

 export const url = 'http://39.98.251.244/'

//获取本地存储
export function getLocalStorage(key){
    let exp = 24*60*60*1000  //过期时间 一天
    var data = localStorage.getItem(key);
    var dataObj = data?JSON.parse(data):data;
    if(dataObj){
        if (new Date().getTime() - dataObj.time>exp) {
            localStorage.removeItem(key)
            return false;
            //alert("信息已过期")
        }else{
          
            return dataObj;
        }
    }else{
        return false
    }
}