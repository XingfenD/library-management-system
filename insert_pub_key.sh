#!/bin/bash

# 定义文件路径
file1="./js/entry.js"
file2="./private/key-pair/public_key.pem"
line_number=125
column_number=24

# 使用 awk 来插入内容
awk -v line_number=$line_number -v column_number=$column_number -v file2=$file2 '
NR == line_number {
    prefix = substr($0, 1, column_number - 1)
    suffix = substr($0, column_number)
    print prefix
    while ((getline < file2) > 0) {
        print
    }
    print suffix
    next
}
{ print }
' $file1 > temp_file && mv temp_file $file1
