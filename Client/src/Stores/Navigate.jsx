import { makeObservable, observable, action } from "mobx";

class NavigationStore {
  navigate = null;

  constructor() {
    makeObservable(this, {
      navigate: observable,
      setNavigate: action,
    });
  }

  setNavigate(navigateFunc) {
    this.navigate = navigateFunc;
  }
}

export const navigate = new NavigationStore();
