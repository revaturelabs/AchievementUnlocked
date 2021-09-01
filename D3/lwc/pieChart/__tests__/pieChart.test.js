import { createElement } from "lwc";
import PieChart from "c/pieChart";

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

  it("Should should render legend", () => {
    const element = createElement("c-pie-chart", {
      is: PieChart,
    });
    document.body.appendChild(element);

    return Promise.resolve().then(() => {
      const svg = element.shadowRoot.querySelector("svg");
      const legend = element.shadowRoot.querySelector("#legend");
      expect(svg).not.toBeNull();
    });
  });
});
