# ProseForge ZH

面向 AI 领域专业博客的中文去 AI 味润色 skill。

> **声明与致谢:**
>
> - 本项目基于通用中文去 AI 味项目 [op7418/humanizer-zh](https://github.com/op7418/humanizer-zh) 改造而来,在此感谢原项目的翻译、整理和本地化工作。
> - 原通用版本参考了 [blader/humanizer](https://github.com/blader/humanizer) 与 [hardikpandya/stop-slop](https://github.com/hardikpandya/stop-slop)。
> - 原始 AI 写作模式观察来自 Wikipedia 的 [Signs of AI writing](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing) 指南。

## 项目简介

ProseForge ZH 是在通用中文去 AI 味 skill 基础上改造出来的 AI 领域专业博客版本。本质目的没有改变:它仍然用于编辑和审阅 AI 生成的内容、提升文章的人性化程度,并帮助作者识别常见 AI 写作模式。

区别在于,本项目不再面向所有中文文本,而是聚焦 AI 技术博客和研究型内容。它希望把大模型、AI Agent、RAG、强化学习、数据工程、AI 产品、论文解读、工程复盘、行业观察和商业化分析等文章,改得更像一篇有证据、有边界、有技术判断的科普性技术报告博客。

本项目适用于:

- 编辑和审阅 AI 生成的 AI 技术内容
- 提升 AI 博客文章的人性化程度和论证质量
- 学习识别 AI 领域中文写作中的常见 AI 痕迹
- 将通用 AI 生成文本改写为更接近科研写作逻辑的技术报告博客

## 适用场景

这个 skill 适合处理:

- 大模型、AGI、大模型训练、强化学习、Agentic RL
- AIGC、AI Agent、RAG、数据工程、AI 编程工具
- AI 产品分析、论文解读、工程复盘
- 行业观察、投资分析、商业化分析
- 技术博客、研究札记、方法综述、实验记录

它重点修复的问题包括:

- 公众号式宏大叙事,例如"通往 AGI 的关键一步"
- PR 腔和发布稿腔,例如"赋能千行百业""重塑行业格局"
- 过度三段式结构,例如"三大优势、三个关键、三种范式"
- 模糊归因,例如"业内人士认为""多项研究表明"
- 无来源硬数字、无依据 benchmark 对比
- 机械粗体、表情符号、聊天机器人口吻
- 教案式多层步骤列表
- 普通中文概念后面硬加英文翻译

## 设计原则

### 科研写作风格优先

改写后的文章应接近科普性的技术报告博客,而不是闲聊、吐槽或营销文案。基本逻辑链条是:

```text
问题定义 -> 方法或机制 -> 证据 -> 局限 -> 结论
```

文章可以有作者判断,但判断要依赖证据。可以使用第一人称,但第一人称必须服务于复现实验、工程经验或边界说明。

### 参考上下文,不是只改单句

去 AI 味不能只针对句级表达。改写时需要检查前后段落的因果、转折、递进、术语指代和信息流。如果一个句子单独看更自然,但放回原文后破坏了论证链,这个改写就是失败的。

### 保留技术密度

不要为了自然语言表达而牺牲技术细节。应尽量保留:

- 公式推导
- 参数和配置
- benchmark 名称和版本
- 实验设置和对比基线
- 模型名、方法名、算子名
- 代码、伪代码和工程流程

但这些信息必须来自原文、论文、system card、实验日志或公开材料。不要为了显得专业临时补数字。

### 避免过度口语化

这个 skill 不追求"像聊天一样写技术"。章节标题默认采用技术报告式、科研写作式表达。除非原文栏目定位明确需要,应避免:

- 我发现一个坑
- 这玩意到底行不行
- 这东西太离谱了
- 手把手带你看懂

更合适的标题是:

- 长上下文任务中的检索退化问题
- ReAct 框架的规划与执行边界
- RAG 系统的召回、重排与引用校验
- RL 后训练中的 reward hacking 风险

## 安装

### Codex 安装

从 GitHub 克隆到 Codex skills 目录:

```bash
git clone https://github.com/zyp-up/proseforge-zh.git ~/.codex/skills/proseforge-zh
```

如果你已经在本地修改了仓库,可以同步当前版本:

```bash
mkdir -p ~/.codex/skills/proseforge-zh
cp SKILL.md README.md LICENSE ~/.codex/skills/proseforge-zh/
```

安装后重启 Codex,让新的 skill 生效。

### Claude Code 安装

如果你使用 Claude Code 的 skills 目录,可以克隆到:

```bash
git clone https://github.com/zyp-up/proseforge-zh.git ~/.claude/skills/proseforge-zh
```

也可以使用原通用 skill 类似的手动安装方式:下载本项目后,将整个目录复制到 Claude Code 的 skills 目录,确保其中包含 `SKILL.md`。

### 通过仓库地址安装

如果你的工具支持从 GitHub 仓库直接安装 skill,使用:

```text
https://github.com/zyp-up/proseforge-zh
```

## 使用方式

在 Codex 中请求使用这个 skill:

```text
使用 proseforge-zh 帮我润色这篇 AI 技术博客,去掉 AI 味,但保留技术细节和科研写作逻辑。
```

处理文件:

```text
使用 proseforge-zh 润色 article.md。重点检查章节标题是否过度口语化、是否有无来源 benchmark 数字、是否有教案式多层列表。
```

处理论文解读:

```text
使用 proseforge-zh 改写这篇论文解读。不要改公式和实验设置,但去掉 PR 腔、模板化总结和无依据结论。
```

## 改写示例

### 示例 1: 宏大叙事改为技术事实

**改写前:**

> DeepSeek-V3 的发布标志着开源大模型发展史上的关键时刻。这一举措深刻影响着全球 AI 格局,并为通往 AGI 的道路奠定了重要基础。

**改写后:**

> DeepSeek-V3 的讨论可以落到论文中可核对的技术事实上:671B MoE 总参数、37B 激活参数、训练成本估算,以及负载均衡、训练稳定性和推理效率相关设计。若要评价它在开源模型谱系中的位置,还需要结合后续复现、生态采用和同等预算下的对比结果。

### 示例 2: 去掉教案式多层列表

**改写前:**

```md
- **如何计算 (Calculation)**
  - **切分 (Split)**:将 \(X\) 在最后一个维度 \(D\) 上切开
  - \(X_{height} = X[..., 0:D/2]\)
  - \(X_{width} = X[..., D/2:D]\)
  - **拼接 (Concat)**:
  - \(X_{out} = \text{Concat}(X'_{height}, X'_{width}, \text{dim}=-1)\)
```

**改写后:**

```md
计算过程分三步:

1. 沿最后一维切分特征:

$$
X_{height} = X[\ldots, 0 : D/2], \quad
X_{width} = X[\ldots, D/2 : D]
$$

2. 分别对两个子空间施加 1D-RoPE。

3. 将两个结果拼回 hidden dimension:

$$
X_{out} = \text{Concat}(X'_{height}, X'_{width}, \text{dim}=-1)
$$
```

### 示例 3: 删除刻意英文翻译

**改写前:**

```md
无外推能力 (No Extrapolation)
缺乏平移不变性 (No Translation Invariance)
采用"分治策略" (Decomposition)
```

**改写后:**

```md
无外推能力
缺乏平移不变性
采用"分治策略"
```

必要术语仍可保留英文,例如 RoPE、KV Cache、KL divergence、VLM、LLM、Diffusion。

## 规则概览

当前 skill 覆盖 25 类常见 AI 写作痕迹:

1. 教案式多层步骤列表
2. 过度强调意义、遗产和更广泛的趋势
3. 过度强调知名度和媒体报道
4. 以 -ing 结尾的肤浅分析
5. 宣传和广告式语言
6. 模糊归因和含糊措辞
7. 提纲式的"挑战与未来展望"部分
8. 过度使用的 AI 词汇
9. 避免使用"是"
10. 否定式排比
11. 三段式法则过度使用
12. 刻意换词
13. 虚假范围
14. 刻意英文翻译
15. 破折号过度使用
16. 粗体过度使用
17. 内联标题垂直列表
18. 表情符号
19. 弯引号
20. 协作交流痕迹
21. 知识截止日期免责声明
22. 谄媚/卑躬屈膝的语气
23. 填充短语
24. 过度限定
25. 通用积极结论

完整规则见 [`SKILL.md`](./SKILL.md)。

## 项目结构

```text
.
├── SKILL.md
├── README.md
└── LICENSE
```

## 开源说明

本项目改造自通用中文去 AI 味仓库 [op7418/humanizer-zh](https://github.com/op7418/humanizer-zh),并面向 AI 技术博客场景重新设计示例、规则和质量标准。项目远程仓库为 [zyp-up/proseforge-zh](https://github.com/zyp-up/proseforge-zh)。

参考来源:

- [op7418/humanizer-zh](https://github.com/op7418/humanizer-zh)
- [Wikipedia: Signs of AI writing](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing)
- [blader/humanizer](https://github.com/blader/humanizer)
- [hardikpandya/stop-slop](https://github.com/hardikpandya/stop-slop)

## 许可

见 [LICENSE](./LICENSE)。

## 免责声明

这个 skill 的目标是提升技术写作质量,不是隐藏来源、规避审稿要求或欺骗检测系统。使用时应保留事实来源、论文引用、实验设置和必要的作者声明。
