export const data: Data[] = [
  {
    value: "理", // 文字内容
    color: "#000", // 文字颜色
    size: 16, // 文字大小
  },
  {
    value: "想",
    background: "red", // 文字背景颜色
    lineheight: 1, // 行高，倍数
  },
  {
    value: "青",
    bold: true, // 加粗
  },
  {
    value: "\n", // 换行
  },
  {
    value: "年",
    italic: true, // 斜体
  },
  {
    value: "实",
    underline: true, // 下划线
  },
  {
    value: "验",
    linethrough: true, // 中划线
  },
  {
    value: "室",
    fontfamily: "", // 字体
  },
];
export type Data = {
  value: string; // 文字内容
  color?: string; // 文字颜色
  size?: number;
  background?: string;
  italic?: boolean;
  bold?: boolean;
  linethrough?: boolean;
  underline?: boolean;
  fontfamily?: string;
  lineheight?: number;
};
