import { action, makeObservable, observable } from "mobx";

class Page {
  subPage = "";

  constructor(page) {
    this.subPage = page;

    makeObservable(this, {
      subPage: observable,
      addPage: action,
    });
  }

  addPage(page) {
    this.subPage = page;
  }
}

const subPage = new Page("home");

class HomePageNumber {
  page = 0;
  lastPage = 0;

  constructor(page, lastPage) {
    this.page = page;
    this.lastPage = lastPage;

    makeObservable(this, {
      page: observable,
      lastPage: observable,
      setPage: action,
      setLastPage: action,
    });
  }

  setPage(page) {
    this.page = page;
  }

  setLastPage(lastPage) {
    this.lastPage = lastPage;
  }
}

const page = new HomePageNumber(1, 1);
export { Page, subPage, page };
