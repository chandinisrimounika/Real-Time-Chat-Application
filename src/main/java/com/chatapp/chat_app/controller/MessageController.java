

package com.chatapp.chat_app.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.chatapp.chat_app.model.Message;
import com.chatapp.chat_app.service.MessageService;

@RestController
@RequestMapping("/messages")
@CrossOrigin(origins = "*")
public class MessageController {

    @Autowired
    private MessageService service;

    @PostMapping
    public Message sendMessage(@RequestBody Map<String, String> body) {
        return service.sendMessage(body.get("content"));
    }

    @GetMapping
    public List<Message> getMessages() {
        return service.getMessages();
    }

    @DeleteMapping("/{id}")
    public void deleteMessage(@PathVariable Long id,
                              @RequestParam String type) {
        if (type.equals("everyone")) {
            service.deleteForEveryone(id);
        }
    }

    @PutMapping("/{id}/pin")
    public void pinMessage(@PathVariable Long id) {
        service.pinMessage(id);
    }
}