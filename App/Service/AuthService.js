import HttpClient from '@Utils/HttpClient';
import Storage from '@Utils/Storage';

const getAccount = async () => {
  return await Storage.get('account');
};



const setAccount = async data => {
  return await Storage.set('account', data);
};

const Logout = async () => {
  await Storage.clear();
};

const register = async (data) => {
  let endpoint = 'register';
  return HttpClient.post(endpoint, data);
};

const login = async (data) => {
  let endpoint = 'login';
  return HttpClient.post(endpoint, data);
};


// for Profile
const profile = async (data) => {
  let endpoint = `profile/${data}data`;
  return HttpClient.put(endpoint);
}

const profileUpdate = async (data) => {
  let endpoint = 'update';
  return HttpClient.post(endpoint, data);
}
async function UpFile(data, file) {
  let endpoint = 'uplode';
  return HttpClient.myupload(endpoint, 'post', data, file);
}


export default {
  Logout,
  getAccount,
  setAccount,
  register,
  login,
  profile,
  profileUpdate,
  UpFile

};
