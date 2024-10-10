package com.ey.springboot3security.controller;


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



    @PostMapping("/save")
    public Post createPost(
            @RequestParam("title") String title,
            @RequestParam("category") String category,
            @RequestParam("content") String content,
            @RequestParam("imageURL") MultipartFile imageFile, // Resim dosyası
            @RequestHeader("Authorization") String token) {

        String jwt = token.substring(7); // "Bearer " kelimesini kaldırıyoruz

        // Yeni Post nesnesini oluşturuyoruz
        Post post = new Post();
        post.setTitle(title);
        post.setCategory(category);
        post.setContent(content);

        // Resim dosyasını kaydetme işlemi
        if (!imageFile.isEmpty()) {
            try {
                // uploads klasörünün olup olmadığını kontrol eder, yoksa oluşturur
                Path uploadPath = Paths.get(uploadDir);
                if (!Files.exists(uploadPath)) {
                    Files.createDirectories(uploadPath);
                }

                // Benzersiz bir dosya ismi oluştur ve kaydet
                String originalFileName = imageFile.getOriginalFilename();
                String fileExtension = originalFileName.substring(originalFileName.lastIndexOf("."));
                String uniqueFileName = System.currentTimeMillis() + fileExtension; // Örneğin: 1634567891234.jpg
                Path filePath = uploadPath.resolve(uniqueFileName);

                // Dosyayı hedefe kaydet
                Files.copy(imageFile.getInputStream(), filePath);

                // Post nesnesine dosya yolunu ekle
                post.setImageURL("/" + uploadDir + uniqueFileName); // Dosya yolunu ayarla (örneğin: /uploads/1634567891234.jpg)

            } catch (IOException e) {
                e.printStackTrace();
                throw new RuntimeException("Resim yüklenirken bir hata oluştu.");
            }
        }

        // JWT kullanarak kullanıcı bilgilerini alabiliriz (jwt üzerinden)
        return postService.createPost(post, jwt);
    }

    // Postu ID'ye göre getir
    @GetMapping("/{postId}")
    public Post getPostById(@PathVariable String postId) {
        return postService.getPostById(postId);
    }

    @PutMapping("/update/{id}")
    public Post updatePost(@PathVariable String id, @RequestBody Post post, @RequestHeader("Authorization") String token) {
        String jwt = token.substring(7); // "Bearer " kelimesini kaldırıyoruz
        return postService.updatePost(id, post, jwt);
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

