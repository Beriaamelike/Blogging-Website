package com.ey.springboot3security.service;


import com.ey.springboot3security.entity.Comment;
import com.ey.springboot3security.entity.Post;
import com.ey.springboot3security.entity.UserInfo;
import com.ey.springboot3security.repository.CommentRepository;
import com.ey.springboot3security.repository.UserInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@Service
public class CommentService {

    @Autowired
    private UserInfoRepository userInfoRepository;

    @Autowired
    private JwtService jwtUtils;

    private final CommentRepository commentRepository;

    @Autowired
    public CommentService(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    // Tüm gönderileri getir
    public List<Comment> getAllComments() {
        return commentRepository.findAll();
    }

    // ID'ye göre gönderi getir
    public Optional<Comment> getPostById(String id) {
        return commentRepository.findById(id);
    }


    // Yeni gönderi oluştur
    public Comment createComment(Comment comment,String postId, String token) {
        String email = jwtUtils.extractEmail(token);
        UserInfo user = userInfoRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        comment.setPostId(postId);
        comment.setUser(user); // Post'a User nesnesi ekleniyor
        comment.setCreatedCommentAt(new Date());
        return commentRepository.save(comment);
    }


    // Gönderiyi güncelle
    public Optional<Comment> updateComment(String id, Comment commentDetails) {
        return commentRepository.findById(id).map(existingComment -> {
            existingComment.setCommentInfo(commentDetails.getCommentInfo());
            existingComment.setCreatedCommentAt(new Date());
            return commentRepository.save(existingComment);
        });
    }

    // Gönderiyi sil
    public boolean deleteComment(String id) {
        if (commentRepository.existsById(id)) {
            commentRepository.deleteById(id);
            return true;
        }
        return false;
    }


    public Optional<Comment> getCommentById(String id) {
        return commentRepository.findById(id);
    }

    public List<Comment> getCommentsByPostId(String postId) {
        return commentRepository.findByPostId(postId);
    }






}
