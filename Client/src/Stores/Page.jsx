import { makeObservable, observable } from "mobx";

class Page {
  subPage = "";

  constructor(page) {
    this.subPage = page;

    makeObservable(this, {
      subPage: observable,
    });
  }

  addPage(page) {
    this.subPage = page;
  }
}

const subPage = new Page("home");

export { Page, subPage };