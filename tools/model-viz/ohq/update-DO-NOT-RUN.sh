# Do not run this without trusting completely the ObservableHQ API, the tarball and contents which are run in node, and this script
# There is no warranty!

wget https://api.observablehq.com/@declann/calculang-tools-bad.tgz?v=3

tar -zxvf ./calculang-tools-bad.tgz?v=3 ./package.json

main=$(node -e "const p = require('./package.json'); console.log(p.main)")

tar -zxvf ./calculang-tools-bad.tgz?v=3 ./$main

mv ./$main main.js

rm ./calculang-tools-bad.tgz?v=3