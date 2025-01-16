package com.ey.springboot3security.controller;


import com.ey.springboot3security.entity.Comment;
import com.ey.springboot3security.entity.Post;
import com.ey.springboot3security.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import java.util.List;
import java.util.Optional;

import org.springframework.web.bind.annotation.CrossOrigin;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/posts")
@CrossOrigin(origins = "*")
public class PostController {
    private final String uploadDir = "uploads/";
    private final PostService postService;

    @Autowired
    public PostController(PostService postService) {
        this.postService = postService;
    }

    // Tüm gönderileri getir
    @GetMapping(value="/getall")
    public List<Post> getAllPosts() {
        return postService.getAllPosts();
    }

    // Postu ID'ye göre getir
    @GetMapping("/{postId}")
    public Post getPostById(@PathVariable String postId) {
        return postService.getPostById(postId);
    }

    //Gönderi oluştur
    @PostMapping("/save")
    public Post createPost(@RequestBody Post post,@RequestHeader("Authorization") String token) {

        String jwt = token.substring(7);

        return postService.createPost(post, jwt);
    }

    //Gönderiyi güncelle
    @PutMapping("/update/{id}")
    public ResponseEntity<Post> updatePost(
            @PathVariable String id,
            @RequestBody Post post,
            @RequestHeader("Authorization") String token) {

        String jwt = token.substring(7);

        try {
            Post updatedPost = postService.updatePost(id, post, jwt);
            return ResponseEntity.ok(updatedPost);
        } catch (RuntimeException e) {
            return ResponseEntity.status(403).body(null); // Yetkisiz işlem için 403 dönüyoruz
        }
    }

    // Gönderiyi sil
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable String id) {
        if (postService.deletePost(id)) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}