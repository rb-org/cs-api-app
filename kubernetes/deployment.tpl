apiVersion: apps/v1
kind: Deployment
metadata:
  name: ${app_name}
  labels:
    app: ${app_name}
  namespace: ${namespace}
spec:
  replicas: ${replicas}
  selector:
    matchLabels:
      app: ${app_name}
  strategy:
    rollingUpdate:
      maxSurge: 25%
      maxUnavailable: 25%
    type: RollingUpdate
  template:
    metadata:
      labels:
        app: ${app_name}
    spec:
      containers:
      - image: ${image}:${version}
        imagePullPolicy: Always
        name: ${app_name}
        ports:
        - containerPort: ${app_port}
          protocol: ${protocol}
        env:
        - name: db_address
          value: "${db_address}"
        - name: db_type
          value: "${db_type}"
        - name: db_password
          value: "${db_password}"
        - name: db_database
          value: "${db_database}"
        - name: db_user
          value: "${db_user}"
        - name: db_port
          value: "${db_port}"