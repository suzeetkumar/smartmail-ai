package com.smartmail.smartmail_ai.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class EmailService {
        private final WebClient webClient;

        @Value("${cohere.api.key}")
        private String apiKey;

        public EmailService(WebClient.Builder webClientBuilder) {
            this.webClient = webClientBuilder
                    .baseUrl("https://api.cohere.ai/v2") // FIXED VERSION
                    .build();
        }
    public String generateEmail(String emailContent, String tone) {
        String finalTone=normalizeTone(tone);

        String prompt = """
          You are an AI assistant that writes professional email replies.
          
          Instrustions:
          -Maintain a %s tone.
          -Keep response concise.
          -Do not invent information.
          -Do not add subject line.
          -Only return the email body.
          -Do not include explanations.
          -Limit response to maximum 150 words.
          Original Email:
          %s      
          """.formatted(finalTone,emailContent);


        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("model", "command-r-plus-08-2024");

        Map<String, String> message = new HashMap<>();
        message.put("role", "user");
        message.put("content", prompt);

        requestBody.put("messages", List.of(message));
        if(emailContent ==null || emailContent.isBlank()){
            return "Email content cannot be empty.";
        }

        try {
            Map<String, Object> response = webClient.post()
                    .uri("/chat")
                    .header("Authorization", "Bearer " + apiKey)
                    .header("Content-Type", "application/json")
                    .bodyValue(requestBody)
                    .retrieve()
                    .bodyToMono(Map.class)
                    .block();
                if(response ==null || !response.containsKey("message")){
                    return "Invalid response from Cohere API";
                }
            Map<String, Object> messageResp =
                    (Map<String, Object>) response.get("message");

            List<Map<String, Object>> contentList =
                    (List<Map<String, Object>>) messageResp.get("content");

            return contentList.get(0).get("text").toString();

        } catch (Exception e) {
            return "Error calling Cohere API: " + e.getMessage();
        }

    }
    private String normalizeTone(String tone){
            return switch(tone.toLowerCase()){
                case "professional" ->"professional and formal";
                case "friendly"  -> "friendly but respectful";
                case "formal"  -> "very formal and corporate";
                case "casual"  ->"casual and relaxed";
                default  -> "professional";
            };
    }


    }
