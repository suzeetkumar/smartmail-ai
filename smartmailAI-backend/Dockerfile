FROM eclipse-temurin:21-jdk

WORKDIR /app

COPY . .

# 🔥 Give execute permission to mvnw (IMPORTANT)
RUN chmod +x mvnw

# Build jar
RUN ./mvnw clean package -DskipTests

CMD ["java", "-jar", "target/smartmail-ai-0.0.1-SNAPSHOT.jar"]