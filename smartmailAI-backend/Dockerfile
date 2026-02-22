
# Use official Java 21 image
FROM eclipse-temurin:21-jdk

WORKDIR /app

# Copy everything
COPY . .

# Build the jar
RUN ./mvnw clean package -DskipTests

# Run the exact jar file name
CMD ["java", "-jar", "target/smartmail-ai-0.0.1-SNAPSHOT.jar"]