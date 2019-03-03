apiVersion: v1
kind: Service
metadata:
  name: ${app_name}
spec:
  selector:
    app: ${app_name}
  type: LoadBalancer
  ports:
   -  protocol: ${protocol}
      port: ${external_port}
      targetPort: ${app_port}