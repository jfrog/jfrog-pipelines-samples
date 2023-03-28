#Download image from artifactory
FROM releases-docker.jfrog.io/jfrog/pipelines-u18java:11

WORKDIR /app

ADD client.tgz .
ADD server.jar ./server.jar

# Set JAVA OPTS + Static file location
ENV STATIC_FILE_LOCATION="/app/package/target/dist/"
# ENV GO_SERVICE="127.0.0.1"
ENV JAVA_OPTS=""

# Fire up our Spring Boot app
ENTRYPOINT [ "sh", "-c", "java $JAVA_OPTS -Dspring.profiles.active=remote -Djava.security.egd=file:/dev/./urandom -jar /app/server.jar" ]
