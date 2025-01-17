#!/bin/bash

# 确保脚本在出错时退出
set -e

# 颜色输出函数
GREEN='\033[0;32m'
NC='\033[0m'

echo -e "${GREEN}开始生成 protobuf 文件...${NC}"

# 遍历所有子目录
for dir in $(find . -type d); do
    # 跳过当前目录和隐藏目录
    if [ "$dir" = "." ] || [[ "$dir" == ./.* ]]; then
        continue
    fi

    # 检查目录中是否有 .proto 文件
    if ls $dir/*.proto >/dev/null 2>&1; then
        echo -e "${GREEN}处理目录: $dir${NC}"
        
        # 进入目录
        cd $dir
        
        # 生成 protobuf 文件
        protoc -I. -I$GOPATH/src -I$GOPATH/pkg/mod \
            --gofast_out=. --gofast_opt=paths=source_relative \
            --rpcx_out=. --rpcx_opt=paths=source_relative \
            *.proto
            
        # 返回上级目录
        cd - > /dev/null
    fi
done

echo -e "${GREEN}protobuf 文件生成完成！${NC}" 