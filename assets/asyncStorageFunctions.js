import AsyncStorage from '@react-native-community/async-storage';

//How to use
// import {storeData, getData, putData, removeData} from "../assets/asyncStorageFunctions.js";


//Async Storage Fucntions Start!!
export async function storeData(key,value) {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem(key, jsonValue)
  } catch (e) {
    // saving error
  }
}

export async function getData(key) {
  try {
    const jsonValue = await AsyncStorage.getItem(key)
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch(e) {
    // error reading value
  }
}

export async function putData(key,value) {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.mergeItem(key, jsonValue)
  } catch (e) {
    // saving error
  }
}

export async function removeData(key) {
  try {
    await AsyncStorage.removeItem(key)
  } catch(e) {
    // remove error
  }
}

//Async Storage Fucntions End!!
