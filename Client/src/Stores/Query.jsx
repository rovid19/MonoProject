import { action, makeObservable, observable } from "mobx";

class Query {
  queryParams = null;

  constructor(queryParams) {
    this.queryParams = queryParams;

    makeObservable(this, {
      queryParams: observable,
      addQueryParams: action,
    });
  }

  addQueryParams(queryParams) {
    this.queryParams = queryParams;
  }
}

export const queryParams = new Query();
