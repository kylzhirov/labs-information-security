#! /bin/bash 
for file in *; do
    if [ -f "$file" ]; then
            
        content=$(cat "$file")
        words=($content)

        counter=0
        for (( i=0; i < ${#words[@]}; i++ )); do
            counter=$((counter + 1))
        done

        if [ "$counter" -eq 0 ]; then
            rm -f $file
            echo "Deleting empty file: $file"
        fi
    fi
done

    
