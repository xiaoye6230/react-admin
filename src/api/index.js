import jsonp from 'jsonp';
import ajax from './ajax';

const prefix = process.env.NODE_ENV === 'development' ? '' : 'http://localhost:5000';
//请求登录函数
export const reqLogin = (username, password) => {
    return ajax(prefix + '/login', { username, password }, 'POST');
}

//通过jsonp请求天气函数
export const reqWeather = (city) => {
    return new Promise((resolve, reject) => {
        jsonp(
            `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`,
            (err, data) => {
                if (!err) {
                    const { dayPictureUrl, weather } = data.results[0].weather_data[0]
                    resolve({ weather, weatherImg: dayPictureUrl })
                } else {
                    reject('请求失败，网络不稳定！')
                }
            }
        )
    })
}

//请求分类列表数据函数
export const reqGetCategories = (parentId) => ajax(prefix + '/manage/category/list', {parentId});

//请求添加分类函数
export const reqAddCategory = (parentId, categoryName) => ajax(prefix + '/manage/category/add',{parentId,categoryName},'POST');
