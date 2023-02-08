import HttpClient from '@Utils/HttpClient';

/// for Catagory

const getLookingFor = async () => {
  let endpoint = 'visit'
  return HttpClient.get(endpoint)
}

const getCatagory = async () => {
  let endpoint = 'fcategory';
  return HttpClient.get(endpoint);
}

const getPathology = async () => {
  let endpoint = 'fpathology';
  return HttpClient.get(endpoint);
}
const getTest = async () => {
  let endpoint = 'pagetest';
  return HttpClient.post(endpoint,{'id':1});
}
const bookDoctor = async (data) => {
  let endpoint = 'booking';
  return HttpClient.post(endpoint, data)
}
const payment = async (data) => {
  let endpoint = 'payment';
  return HttpClient.post(endpoint, data)
}

const getDoctot = async (d) => {
  let endpoint = 'doctor';
  return HttpClient.post(endpoint, d);
}
const medicen_booking = async (d) => {
  let endpoint = 'medicen_booking';
  return HttpClient.post(endpoint, d);
}
const userpayment = async (d) => {
  let endpoint = 'userpayment';
  return HttpClient.post(endpoint, d);
}
const mydoctor = async (d) => {
  let endpoint = 'mydoctor';
  return HttpClient.post(endpoint, d);
}
const appoinment = async (d) => {
  let endpoint = 'appoinment';
  return HttpClient.post(endpoint, d);
}
const payappoinment = async (d) => {
  let endpoint = 'payappoinment';
  return HttpClient.post(endpoint, d);
}
const visit = async (d) => {
  let endpoint = 'visit';
  return HttpClient.get(endpoint);
}
const reqdoc = async (d) => {
  let endpoint = 'doctor_request';
  return HttpClient.post(endpoint, d)
}
const userrating = async (d) => {
  let endpoint = 'userrating';
  return HttpClient.post(endpoint, d)
}
const rating = async (d) => {
  let endpoint = 'rating';
  return HttpClient.post(endpoint, d)
}
const coupon = async () => {
  let endpoint = 'coupon';
  return HttpClient.post(endpoint, {})
}
const adduserrating = async (d) => {
  let endpoint = 'adduserrating';
  return HttpClient.post(endpoint, d)
}
async function UpFile(data,file) {
  let endpoint = 'uplode';       
  return HttpClient.upload(endpoint,'post',data,file);
}
async function contact_us() {
  let endpoint = 'contact_us';       
  return HttpClient.get(endpoint);
}

export default {
  adduserrating,
  rating,
  mydoctor,
  appoinment,
  visit,
  payment,
  contact_us,
  medicen_booking,
  UpFile,
  getLookingFor,
  getCatagory,
  getPathology,
  bookDoctor,
  getDoctot,
  reqdoc,
  getTest,
  payappoinment,
  userpayment,
  userrating,
  coupon
};
