# 图片与结果图替换指南

当前页面预留四处图位，均为纯 HTML 提示框，没有使用虚构结果。

| 页面位置 | 建议文件 | 推荐内容 |
| --- | --- | --- |
| 主项目后左侧 | assets/cloud-map.png | 真实3D云图或匹配的二维投影；标明区域、坐标、单位和色标 |
| 主项目后右侧 | assets/structure-results.png | 分形/尺度诊断随真实密度阈值变化；说明方法、误差和筛选条件 |
| 光谱项目 | assets/spectral-example.png | 真实光谱、模型对比或候选体筛选图；注明波长和流量单位 |
| CSST项目 | assets/calibration-workflow.png | 自行绘制的匹配、质量检查、版本管理与流水线流程图 |

在 index.html 搜索 `FIGURE SLOT`。将对应的 `<div class="figure-placeholder">...</div>` 整块替换为：

```html
<img src="assets/cloud-map.png" alt="简要而具体地描述实际图片">
```

同步把 figure 内的 figcaption 改为真实图注，包括数据来源及必要署名。
图件上传到 assets 目录。建议宽度1200–1800像素，尽量保留图中文字可读性。
这四个位置不要求全部填满；暂时没有合适图件的项目，可以删除对应的整个 figure。
