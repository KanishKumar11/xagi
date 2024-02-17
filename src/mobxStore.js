import { makeAutoObservable } from "mobx";

class AppStore {
  name = "";
  links = "";
  tldr = "";
  constructor() {
    // Make properties observable
    makeAutoObservable(this);
  }

  // Actions to update state
  updateName(data) {
    this.name = data;
  }
  updateTldr(data) {
    this.tldr = data;
  }
  updateLinks(data) {
    this.links = data;
  }
}

// Create an instance of the store
const appStore = new AppStore();

export default appStore;
