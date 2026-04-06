package com.chatapp.chat_app.service;


import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.chatapp.chat_app.model.Message;
import com.chatapp.chat_app.repository.MessageRepository;

@Service
public class MessageService {

    @Autowired
    private MessageRepository repo;

    public Message sendMessage(String content) {
        Message msg = new Message();
        msg.setContent(content);
        msg.setTimestamp(LocalDateTime.now());
        return repo.save(msg);
    }

    public List<Message> getMessages() {
        return repo.findAll();
    }

    public void deleteForEveryone(Long id) {
        Message msg = repo.findById(id).orElseThrow();
        msg.setDeletedForEveryone(true);
        repo.save(msg);
    }

    public void pinMessage(Long id) {
        Message msg = repo.findById(id).orElseThrow();
        msg.setPinned(true);
        repo.save(msg);
    }
}