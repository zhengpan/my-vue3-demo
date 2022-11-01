/*
  需求：给整个页面添加背景水印。

  思路：
    1、使用 canvas 特性生成 base64 格式的图片文件，设置其字体大小，颜色等。
    2、将其设置为背景图片，从而实现页面或组件水印效果

  使用：设置水印文案，颜色，字体大小即可
  <div v-waterMarker="{text:'版权所有',textColor:'rgba(180, 180, 180, 0.4)'}"></div>
*/

import type { Directive } from "vue";

interface IValue {
  font?: string
  textColor?: string
  text?:string
}

const waterMarkId = 'waterMark';
const canvasId="can"

const drawWatermark = (el:any, value: IValue,) => {
  // 水印文字，父元素，字体，文字颜色
  const {
    font = '16px Microsoft JhengHei',
    textColor = 'rgba(180, 180, 180, 0.3)',
    text = '三心大菜鸟',
  } = value;
	// 创建一个canvas标签
  let canvas: HTMLCanvasElement = document.getElementById(canvasId) as HTMLCanvasElement
	// 如果已有，则不再创建
  const can = canvas || document.createElement('canvas');
  can.id = canvasId;
  el.appendChild(can);
  // 设置宽高
  can.width = 210;
	can.height = 150;

  // 设置canvas不可见
  can.style.display = 'none';
  //获取画布
  const ctx = can.getContext('2d')!
  // 设置画布的样式
  ctx.rotate((-20 * Math.PI) / 180);
  ctx.font = font;
  ctx.fillStyle = textColor;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle'
  ctx.fillText(text, can.width / 10, can.height / 2)
  // 水印容器
  const waterMaskDiv = document.createElement('div')
  waterMaskDiv.id = waterMarkId;

  // 设置容器的属性样式
  // 将刚刚生成的canvas内容转成图片，并赋值给容器的background-image样式
  const styleStr = `
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: -1;
    top: 0;
    left: 0;
    pointer-events: none;
    background-image: url(${can.toDataURL('image/png')})
  `
  waterMaskDiv.setAttribute('style', styleStr)
  //将水印容器放到目标元素下
  el.appendChild(waterMaskDiv)
  return styleStr;
};

const safeWaterMarker:Directive = {
  mounted(el, { value }) {
    // 接收styleStr，后面可以用来对比
    el.waterMarkStylestr = drawWatermark(el, value)
    // 先定义一个MutationObserver
    el.observe = new MutationObserver(() => {
      const waterWarpDom = document.getElementById(waterMarkId);
      const style = waterWarpDom?.getAttribute('style');
      const { waterMarkStylestr } = el;
      // 修改样式或者删除dom
      if ((waterWarpDom && style !== waterMarkStylestr) || !waterWarpDom)  {
        if (waterWarpDom) {
          // div存在说明只是修改了style
          waterWarpDom.setAttribute('style', waterMarkStylestr);
        } else {
          // div不存在，说明删除了div
          drawWatermark(el,value)
        }
      }
    })
    el.observe.observe(document.body, {
      childList: true,
      attributes: true,
      subtree:true
    })
  },
  unmounted(el) {
    // 指定元素卸载/销毁时，停止监控
    el.observe.disconnect()
    el.observe = null;
  }
};

export default safeWaterMarker;
