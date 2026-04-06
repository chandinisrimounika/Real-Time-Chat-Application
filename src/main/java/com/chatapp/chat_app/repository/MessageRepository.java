package com.chatapp.chat_app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.chatapp.chat_app.model.Message;

public interface MessageRepository extends JpaRepository<Message, Long> {
}