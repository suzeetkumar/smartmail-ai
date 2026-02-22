package com.smartmail.smartmail_ai.controller;

import com.smartmail.smartmail_ai.dto.EmailRequest;
import com.smartmail.smartmail_ai.dto.EmailResponse;
import com.smartmail.smartmail_ai.service.EmailService;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api/email")
public class EmailController {
    private EmailService emailService;
    public EmailController(EmailService emailService){
        this.emailService = emailService;
    }
    @PostMapping("/generate")
    public EmailResponse generateEmail(@RequestBody EmailRequest emailRequest){
        String reply= emailService.generateEmail(
                emailRequest.getEmailContent(),
                emailRequest.getTone());
        return new EmailResponse(reply);
    }
}
