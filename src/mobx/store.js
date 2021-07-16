import {observable, action} from 'mobx';
import Axios from 'axios';
import {API_URL} from '../constanst/API';

const APP_ID = '60f197f8e44bfa9dfb52a212';

class DataStore {
  @observable
  data = [];

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @action
  fetchDataPeople() {
    Axios.get(`${API_URL}/user`, {
      headers: {'app-id': APP_ID},
    })
      .then(response => {
        this.data = response.data.data;
      })
      .catch(err => {
        console.log(err);
      });
  }
}

const store = new DataStore();
export default store;
