#!/bin/sh

# Amazon EKS kubectl
curl -o kubectl https://amazon-eks.s3-us-west-2.amazonaws.com/1.11.5/2018-12-06/bin/linux/amd64/kubectl
chmod +x ./kubectl
cp ./kubectl /bin/kubectl
export PATH=/bin:$PATH
echo 'export PATH=/bin:$PATH' >> ~/.bashrc
source ~/.bashrc