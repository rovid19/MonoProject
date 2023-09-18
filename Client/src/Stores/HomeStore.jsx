import { makeObservable, observable, action } from "mobx";
import { Form } from "mobx-react-form";
import validatorjs from "validatorjs";
import { submitSortFilter } from "../Pages/Home/ExtraOptionsModal";

class Home {
  subPage = null;
  navigate = null;
  page = 0;
  query = null;

  constructor() {
    makeObservable(this, {
      navigate: observable,
      page: observable,
      query: observable,
      setSubPage: action,
      setNavigate: action,
      setPage: action,
      setQuery: action,
    });
  }

  setSubPage(subPage) {
    this.subPage = subPage;
  }
  setPage(page) {
    this.page = page;
  }
  setNavigate(navigate) {
    this.navigate = navigate;
  }
  setQuery(Query) {
    this.query = Query;
  }
}

// EXTRA OPTIONS FORM

const fields = {
  sortBy: {
    label: "Sort by",
    value: "none",
    options: [
      { label: "None", value: "none" },
      { label: "Highest to lowest price", value: "highToLow" },
      { label: "Lowest to highest price", value: "lowToHigh" },
    ],
    rules: "string",
  },
  startingPrice: {
    label: "Starting price",
    value: null,
    rules: "numeric",
  },
  finalPrice: {
    label: "Final price",
    value: null,
    rules: "numeric",
  },
};

const hooks = {
  onSuccess(form) {
    submitSortFilter();
  },
  onError(form) {
    console.log("Form Errors!", form.errors());
  },
};

const plugins = { dvr: validatorjs };

export const sortFilterForm = new Form({ fields }, { hooks, plugins });

export default new Home();
