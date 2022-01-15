**Docker build instruction**

docker build -t buc-web .

docker login neufrin.jfrog.io  `if login first time`

docker tag buc-web neufrin.jfrog.io/default-docker-virtual/buc-web:latest

docker push neufrin.jfrog.io/default-docker-virtual/buc-web:latest