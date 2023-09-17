import { Form } from "mobx-react-form";
import validatorjs from "validatorjs";
import { submitSortFilter } from "../Pages/Home/ExtraOptionsModal";

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

export default new Form({ fields }, { hooks, plugins });
