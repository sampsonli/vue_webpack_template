/**
 * 默认发生任何异常都返回一个空对象
 * Created by lichun on 2021/5/10.
 */
import axios from 'axios';

const isDev = process.env.NODE_ENV === 'development';
const options = {
    baseURL: '',
    timeout: 20000,
    withCredentials: true,
};
const _axios = axios.create(options);

export const jumpLogin = () => {
    sessionStorage.setItem('_back_url', window.location.href);
    const backUrl = `${window.location.protocol}//${window.location.host}`;
    if (window.location.href.indexOf('.sit.sf-express') > -1) {
        window.location.replace(`https://cas.sit.sf-express.com/cas/login?service=${encodeURIComponent(backUrl)}`);
    } else if (window.location.href.indexOf('.sf-express') > -1) {
        window.location.replace(`https://cas.sf-express.com/cas/login?service=${encodeURIComponent(backUrl)}`);
    } else { // 本地开发环境
        window.location.replace(`https://cas.sit.sf-express.com/cas/login?service=${encodeURIComponent(backUrl)}`);
    }
};

_axios.interceptors.request.use((config) => {
    const token = sessionStorage.getItem('_token');
    if (token) {
        config.headers.token = token;
    }
    return config;
});
_axios.interceptors.response.use((response) => {
    const { code, msg } = response.data;
    if (code === 0) return response;
    if (code === 100000) {
        jumpLogin();
        throw new Error(msg);
    } else if (code === 100001 || code === 100002 || code === 100003 || code === 100004 || code === 100005) { // 用户未在运营管理平台注册
        window.location.href = `${window.location.href.split('#')[0].split('?')[0]}#/user/noauth?title=${encodeURIComponent('暂无权限')}&subTitle=${encodeURIComponent(msg)}`;
        // pushPath('/user/noauth', {title: '暂无权限', subTitle: msg});
        throw new Error(msg);
    }
    return response;
});
export const get = function (url, config) {
    return _axios.get(url, config).then((response) => {
        if (response && response.status === 200) {
            return response.data;
        }
        throw new Error(response.message);
    });
};
export const post = function (url, param, config) {
    return _axios.post(url, param, config).then((response) => {
        if (response && response.status === 200) {
            return response.data;
        }
        throw new Error(response.message);
    });
};

export const generator = (Apis) => {
    const result = {};
    Object.keys(Apis).forEach(key => {
        const {
            url, method, config, mockUrl, isMock = false, type = 'json',
        } = Apis[key];
        let furl = isMock ? (mockUrl || url) : url;
        if (!isDev) { // 防止mock上生产、测试环境
            furl = url;
        }
        if (method === 'get' || method === 'GET') {
            result[key] = (params = {}) => {
                const p = Object.keys(params);
                let reqUrl = `${furl}?_t=${Date.now()}`;
                if (p.length) {
                    reqUrl = `${reqUrl}&${Object.keys(params).map((k) => [k, encodeURIComponent(params[k])].join('=')).join('&')}`;
                }
                return get(reqUrl, config);
            };
        } else if (method === 'post' || method === 'POST') {
            result[key] = (params = {}) => {
                let p = params;
                if (type === 'form') {
                    config.headers = config.headers || {};
                    config.headers['content-type'] = 'application/x-www-form-urlencoded';
                    p = new URLSearchParams();
                    Object.keys(params).forEach((k) => {
                        p.append(k, params[k]);
                    });
                }
                return post(furl, p, config);
            };
        }
    });
    return result;
};
