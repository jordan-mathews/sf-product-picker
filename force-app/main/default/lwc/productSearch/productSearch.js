import { LightningElement } from "lwc";
import searchProducts from "@salesforce/apex/ProductPickerController.searchProducts";

export default class ProductSearch extends LightningElement {
  searchTerm = "";

  handleSearchTermChange(e) {
    this.searchTerm = e.target.value;
    console.log(this.searchTerm);
    this.search();
  }

  search() {
    searchProducts({ searchTerm: this.searchTerm })
      .then((result) => {
        console.log("result:");
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
