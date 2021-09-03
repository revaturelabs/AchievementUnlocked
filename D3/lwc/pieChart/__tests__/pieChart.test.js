import { createElement } from "lwc";
import PieChart from "c/pieChart";

function mapDOM(root) {
  Array.from(root.children)
    .forEach(mapDOM);
  console.log(root.tagName);
}

describe("c-pie-chart", () => {
  afterEach(() => {
    // The jsdom instance is shared across test cases in a single file so reset the DOM
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  it("Should have an svg element", () => {
    const element = createElement("c-pie-chart", {
      is: PieChart,
    });
    document.body.appendChild(element);
    return Promise.resolve().then(() => {
      const svg = element.shadowRoot.querySelector("svg");
      expect(svg).not.toBeNull();
    });
  });

});
