import AuthService from '@Service/AuthService';

// const BASE_URL = 'http://web.easytodb.com/tasker1/app_api/';
const BASE_URL = 'http://new.easytodb.com/Healthcare/api/user/v1/';
// http://new.easytodb.com/Healthcare/api/user/v1/userpayment
//http://new.easytodb.com/Healthcare/api/user/v1/userpayment

const get = (endpoint, params) => {
  return request(endpoint, params);
};

const post = (endpoint, params) => {
  return request(endpoint, params, 'POST');
};

const put = (endpoint, params) => {
  return request(endpoint, params, 'PUT');
};

const Delete = (endpoint, params) => {
  return request(endpoint, params, null, 'DELETE');
};

const formdata = async (url, method, object_get = {}) => {
  const config = {
    method: method,
  };
  let apiUrl = BASE_URL + url;

  const data = new FormData();

  let objArray = Object.keys(object_get);

  objArray.forEach(element => {
    data.append(element, object_get[element]);
  });

  if (method != 'GET') {
    config['body'] = data;
  }

  return fetch(apiUrl, config).then(response => response.json());
};

const request = async (endpoint, params = null, method = 'GET') => {
  // let token = await AuthService.getToken();
  let url = BASE_URL + endpoint;
  const config = {
    method: method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  if (method != 'GET') {
    config['body'] = JSON.stringify(params);
  }
  console.log('url ---> ', url);
  console.log('body -->', JSON.stringify(params));
  console.log('headers -->', config.headers);
  console.log('method -->', method);
  return fetch(url, config).then(response => response.json());
};

async function upload(url, method, file, object_get = {}, tokenCustom = null) {
  // let token = await AuthService.getToken();
  console.log('File///', file.path);
  // let login_status = await AuthService.getToken();
  // if (tokenCustom !== null) {
  //     login_status = tokenCustom;
  // }

  let apiUrl = BASE_URL + url;

  let headers = {
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data',
    // 'Authorization': token
    // 'Access-Control-Allow-Origin': "https://devcab.herokuapp.com",
    // 'Authorization': 'Bearer ' + login_status,
  };
  console.log('url ---> ', apiUrl);
  // console.log('body -->', JSON.stringify(params));
  console.log('headers -->', headers);
  console.log('method -->', method);
  // console.log("apiUrl",apiUrl);
  const data = new FormData();
  let get_originalname = await getOriginalname(file.path);
  // console.log('get_originalname', get_originalname);
  data.append('image', {
    uri: file.path,
    type: file.mime,
    name: get_originalname,
  });

  let objArray = Object.keys(object_get);

  objArray.forEach(element => {
    data.append(element, object_get[element]);
  });

  return fetch(apiUrl, {
    headers,
    method: 'post',
    body: data,
  })
    .then(response => response.json())
    .then(response => {
      return response;
    });
}

const myupload = async (url, method, file, object_get = {}) => {

  // let login_status = await AuthService.getToken();
  let apiUrl = BASE_URL + url;

  let headers = {
    'Accept': 'application/json',
    "Content-Type": "multipart/form-data",
    // 'Authorization':  login_status,
  };
  console.log('url ---> ', apiUrl);
  // console.log('body -->', JSON.stringify(params));
  console.log('headers -->', headers);
  console.log('method -->', method);
  const data = new FormData();
  if (file != '') {
    // let get_originalname = await getOriginalname(file.path, file.mime);
    // console.log('originalname', get_originalname)
    data.append('type', 'document');
    // if (file.uri != '') {
    data.append('image', (file));
    // }
  }

  let objArray = Object.keys(object_get);

  // objArray.forEach(element => {
  //     data.append(element, object_get[element]);
  // });
  console.log('data9999', JSON.stringify(data))

  return fetch(apiUrl, {
    headers,
    method: 'post',
    body: data
  }).then(response => response.json())

}
async function multiupload(
  url,
  method,
  file,
  object_get = {},
  tokenCustom = null,
) {
  let login_status = await AuthService.getToken();
  if (tokenCustom !== null) {
    login_status = tokenCustom;
  }

  let apiUrl = BASE_URL + url;

  let headers = {
    Accept: 'application/json',
    Authorization: 'Bearer ' + login_status,
  };

  let allFile = [];

  const data = new FormData();

  file.forEach(element => {
    data.append('file', {
      uri: element.url,
      type: 'image/jpeg',
      name: 'image',
    });
    // allFile.push(element.url);
  });

  return fetch(apiUrl, {
    headers,
    method: 'post',
    body: data,
  })
    .then(response => response.json())
    .then(response => {
      return response;
    });
}

async function getOriginalname(data) {
  console.log('image///', data);
  let arr = data.split('/');
  let lent = Number(arr.length - 1);
  return arr[lent];
}

export default {
  get,
  post,
  put,
  Delete,
  formdata,
  upload,
  multiupload,
  myupload
};
