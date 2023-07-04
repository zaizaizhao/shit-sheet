import { Data } from "./data/data.";

export default class Editor {
  container: Element;
  data: Data[];
  options = {};
  pageCanvasList: HTMLCanvasElement[] = [];
  pageCanvasCtxList: CanvasRenderingContext2D[] = [];

  constructor(container: Element, data: Data[], options = {}) {
    //* 定义载体元素
    this.container = container;
    //* 结构化数据
    this.data = data;
    this.options = Object.assign(options, {
      pageWidth: 794, // 纸张宽度
      pageHeight: 1123, // 纸张高度
      pagePadding: [100, 120, 100, 120], // 纸张内边距，分别为：上、右、下、左
      pageMargin: 20, // 页面之间的间隔
      pagePaddingIndicatorSize: 35, // 纸张内边距指示器的大小，也就是四个直角的边长
      pagePaddingIndicatorColor: "#BABABA", // 纸张内边距指示器的颜色，也就是四个直角的边颜色
    });
    this.pageCanvasList = []; //*页面canvas列表
    this.pageCanvasCtxList = []; //* 页面canvas绘图上下文列表
    // this.createPage();
  }

  createPage() {
    let { pageWidth, pageHeight, pageMargin } = this.options as Options;
    let canvas = document.createElement("canvas");
    canvas.width = pageWidth;
    canvas.height = pageHeight;
    //* 鼠标hover显示
    canvas.style.cursor = "text";
    canvas.style.backgroundColor = "#fff";
    canvas.style.boxShadow = "#9ea1a566 0 2px 12px";
    canvas.style.marginBottom = pageMargin + "px";
    this.container.appendChild(canvas);
    let ctx = canvas.getContext("2d");
    this.pageCanvasList.push(canvas);
    this.pageCanvasCtxList.push(ctx as CanvasRenderingContext2D);
    // this.renderPagePaddingIndicators(ctx);
  }
  //* 渲染word页面画布的方法
  renderPagePaddingIndicators(pageNo: any) {
    let ctx = this.pageCanvasCtxList[pageNo];
    if (!ctx) {
      return;
    }
    let {
      pageWidth,
      pageHeight,
      pagePaddingIndicatorColor,
      pagePadding,
      pagePaddingIndicatorSize,
    } = this.options as Options;
    ctx.save();
    ctx.strokeStyle = pagePaddingIndicatorColor;
    let list = [
      // 左上
      [
        [pagePadding[3], pagePadding[0] - pagePaddingIndicatorSize],
        [pagePadding[3], pagePadding[0]],
        [pagePadding[3] - pagePaddingIndicatorSize, pagePadding[0]],
      ],
      // 右上
      [
        [pageWidth - pagePadding[1], pagePadding[0] - pagePaddingIndicatorSize],
        [pageWidth - pagePadding[1], pagePadding[0]],
        [pageWidth - pagePadding[1] + pagePaddingIndicatorSize, pagePadding[0]],
      ],
      // 左下
      [
        [
          pagePadding[3],
          pageHeight - pagePadding[2] + pagePaddingIndicatorSize,
        ],
        [pagePadding[3], pageHeight - pagePadding[2]],
        [
          pagePadding[3] - pagePaddingIndicatorSize,
          pageHeight - pagePadding[2],
        ],
      ],
      // 右下
      [
        [
          pageWidth - pagePadding[1],
          pageHeight - pagePadding[2] + pagePaddingIndicatorSize,
        ],
        [pageWidth - pagePadding[1], pageHeight - pagePadding[2]],
        [
          pageWidth - pagePadding[1] + pagePaddingIndicatorSize,
          pageHeight - pagePadding[2],
        ],
      ],
    ];
    list.forEach((item) => {
      item.forEach((point, index: number) => {
        //* 0:moveTo初始点;1:lineTo中间点；2：lineTo末尾点，并且走ctx.stroke进行绘制
        if (index === 0) {
          ctx.fillStyle = "red";
          // ctx.fillRect(50, 50, 100, 100);
          ctx.beginPath();
          //@ts-ignore
          ctx.moveTo(...point);
        } else {
          //@ts-ignore
          ctx.lineTo(...point);
        }
        if (index >= item.length - 1) {
          ctx.stroke();
        }
      });
    });
    //! restore并没有啥用这里
    ctx.restore();
  }
}

export type Options = {
  pageWidth: number; // 纸张宽度
  pageHeight: number; // 纸张高度
  pagePadding: [number, number, number, number]; // 纸张内边距，分别为：上、右、下、左
  pageMargin: number; // 页面之间的间隔
  pagePaddingIndicatorSize: number; // 纸张内边距指示器的大小，也就是四个直角的边长
  pagePaddingIndicatorColor: string; // 纸张内边距指示器的颜色，也就是四个直角的边颜色
};
