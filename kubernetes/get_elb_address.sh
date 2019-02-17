ELB=$(kubectl get service csapi -o json | jq -r '.status.loadBalancer.ingress[].hostname')

curl -m3 -v $ELB