package com.ey.springboot3security.controller;


import com.ey.springboot3security.entity.Comment;
import com.ey.springboot3security.entity.Post;
import com.ey.springboot3security.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/comments")
@CrossOrigin(origins = "*")
public class CommentController {

    private final CommentService commentService;

    @Autowired
    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @GetMapping("/getall")
    public List<Comment> getAllComments() {
        return commentService.getAllComments();
    }

    // ID'ye göre yorumu getir
    @GetMapping("/{id}")
    public ResponseEntity<Comment> getCommentById(@PathVariable String id) {
        Optional<Comment> comment = commentService.getCommentById(id);
        return comment.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Post ID'ye göre yorumları getir
    @GetMapping("/post/{postId}")
    public List<Comment> getCommentsByPostId(@PathVariable String postId) {
        return commentService.getCommentsByPostId(postId);
    }

    @CrossOrigin(origins = "*")
    @PostMapping(value = "/save/{postId}")
    public Comment createComment(@RequestBody Comment comment,@PathVariable String postId,@RequestHeader("Authorization") String token) {
        String jwt = token.substring(7);
        return commentService.createComment(comment, postId, jwt);
    }


    // Yorumu güncelle
    @PutMapping("/{id}")
    public ResponseEntity<Comment> updateComment(@PathVariable String id, @RequestBody Comment commentDetails) {
        Optional<Comment> updatedComment = commentService.updateComment(id, commentDetails);
        return updatedComment.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Yorumu sil
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteComment(@PathVariable String id) {
        if (commentService.deleteComment(id)) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
