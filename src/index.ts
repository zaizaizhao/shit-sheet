import { data } from "./data/data.";
import Editor from "./Editor";
let container = document.querySelector("#app") as Element;
let editor = new Editor(container, data);
editor.createPage();
editor.createPage();
editor.pageCanvasCtxList.forEach((item, index) => {
  editor.renderPagePaddingIndicators(index);
});
