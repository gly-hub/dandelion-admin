#!/bin/bash

echo "开始生成 swagger 文档..."

# 执行swagger生成命令
swag init --parseDependency --parseDepth=6 --dir .

if [ $? -eq 0 ]; then
    echo "swagger 文档生成完成！"
else
    echo "swagger 文档生成失败！"
    exit 1
fi 