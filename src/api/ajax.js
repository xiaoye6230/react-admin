import axios from 'axios';
import { message } from 'antd';

export default function ajax(url, data, method = 'GET') {
    method = method.toLocaleUpperCase();

    let promise = null;
    if (method === 'GET') {
        promise = axios.get(url, { params: data })
    } else {
        promise = axios.post(url, data)
    }
    return promise
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            console.log('---请求失败---');
            console.log(err);
            console.log('---请求失败---');
            message.error('网络异常，请刷新重试',2);
        })
}
