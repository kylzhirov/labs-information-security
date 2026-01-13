#! /bin/bash 
filename="input.txt"
if [ -e "$filename" ]; then 
    content=$(cat "$filename") 
    echo "$content" 
else 
    echo "File not found: $filename" 
fi

words=($content)

counter=0
for (( i=0; i < ${#words[@]}; i++ )); do
    counter=$((counter + 1))
done
