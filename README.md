# BibTex 文件管理工具

## 功能

纯 HTML + CSS + JavaScript

- 读取 `.bibtex` 文件
- 添加新的文献记录
- 修改已有的文献记录
- 快速复制为 LaTex 引用代码

## 关于解析 BiBTeX

先检查 `@`，再根据花括号提取内容，再通过 `=` 找 citationKey 和对应的值。