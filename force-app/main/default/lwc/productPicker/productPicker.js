import { LightningElement, wire, api } from "lwc";
import { FlowAttributeChangeEvent } from "lightning/flowSupport";
import getPriceBookEntries from "@salesforce/apex/ProductPickerController.getPriceBookEntries";

const COLUMNS = [
  { label: "Product Name", fieldName: "ProductName" },
  { label: "Product Code", fieldName: "	ProductCode" },
  { label: "List Price", fieldName: "UnitPrice", type: "currency" }
];

export default class ProductPicker extends LightningElement {
  data = [];
  columns = COLUMNS;
  selected = [];

  @wire(getPriceBookEntries, { priceBookName: "Default" })
  wiredProducts({ error, data }) {
    if (error) {
    } else if (data) {
      this.data = data.map((el) => ({
        ...el,
        ...{
          ProductName: el.Product2.Name
        }
      }));
    }
  }

  handleSelect(event) {
    const selectedRows = event.detail.selectedRows.map((el) => el.Id);
    this.selected = selectedRows;
    const attributeChangeEvent = new FlowAttributeChangeEvent(
      "products",
      selectedRows
    );
    this.dispatchEvent(attributeChangeEvent);
  }

  @api
  get products() {
    return this.selected;
  }
}
