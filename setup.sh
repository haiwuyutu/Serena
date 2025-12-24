#!/bin/bash
echo "开始创建光遇风格拼音学习网站..."

# 1. 创建CSS文件
echo "创建CSS文件..."
mkdir -p css

cat > css/style.css << 'CSS_EOF'
/* 这里是完整的CSS代码 */
body {
    margin: 0;
    padding: 0;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    font-family: 'Arial', sans-serif;
    color: white;
}

/* 添加更多CSS样式... */
CSS_EOF

echo "CSS文件创建完成！"
echo "开始你的拼音学习之旅吧！"
