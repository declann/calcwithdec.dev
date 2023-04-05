wget https://api.observablehq.com/@declann/calculang-tools-bad.tgz?v=3

tar -zxvf ./calculang-tools-bad.tgz?v=3 ./package.json

main=$(node -e "const p = require('./package.json'); console.log(p.main)")

tar -zxvf ./calculang-tools-bad.tgz?v=3 ./$main

mv ./$main main.js

rm ./calculang-tools-bad.tgz?v=3