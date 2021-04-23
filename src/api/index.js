import axios from 'axios';
import URL from './URL';

const appkey = 'andy_1602658532786';

const ajax = axios.create({
  baseURL: URL.baseURL,
  params: {
    appkey,
  },
});

// 响应拦截器，在得到响应之前对数据做一些处理
ajax.interceptors.response.use((data) => {
  const newData = data.data;
  if (newData.status === 'success') {
    return newData;
  }
  return Promise.reject(newData.msg);
});

const login = (data) => ajax.post(URL.login, `appkey=${appkey}&${data}`);
const logon = (data) => ajax.post(URL.logon, `appkey=${appkey}&${data}`);

// 获取第几页的学生信息
const getStu = (page, size) => ajax.get(URL.getStu, {
  params: {
    page,
    size,
  },
});

const updateStu = (options) => ajax.get(URL.updateStu, {
  params: {
    ...options,
  },
});

const delStu = (sNo) => ajax.get(URL.delStu, {
  params: {
    sNo,
  },
});

const addStu = (options) => ajax.get(URL.addStu, {
  params: {
    ...options,
  },
});

export default {
  login,
  logon,
  getStu,
  updateStu,
  delStu,
  addStu,
};
