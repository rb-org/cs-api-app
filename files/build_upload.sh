#!/bin/bash
version=$(date "+%Y%m%d%H%M%S")


docker-compose build
$(aws ecr get-login --no-include-email --region eu-west-1)
docker tag csapi:latest 771529465472.dkr.ecr.eu-west-1.amazonaws.com/csapi:latest
docker tag csapi:latest 771529465472.dkr.ecr.eu-west-1.amazonaws.com/csapi:$version
docker push 771529465472.dkr.ecr.eu-west-1.amazonaws.com/csapi:latest
docker push 771529465472.dkr.ecr.eu-west-1.amazonaws.com/csapi:$version