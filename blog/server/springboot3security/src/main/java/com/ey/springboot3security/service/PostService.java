package com.ey.springboot3security.service;



import com.ey.springboot3security.entity.Post;
import com.ey.springboot3security.entity.UserInfo;
import com.ey.springboot3security.repository.PostRepository;
import com.ey.springboot3security.repository.UserInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;


@Service
public class PostService {

    private final PostRepository postRepository;

    @Autowired
    private UserInfoRepository userInfoRepository;

    @Autowired
    private JwtService jwtUtils;

    @Autowired
    public PostService(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    public Post updatePost(String id, Post post, String token) {
        String username = jwtUtils.extractEmail(token); // Token'dan userId alıyoruz
        Post existingPost = postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        // Kullanıcının postu güncelleyebilmesi için kontrol
        if (!existingPost.getUser().getId().equals(username)) {
            throw new RuntimeException("You are not authorized to update this post");
        }

        existingPost.setTitle(post.getTitle()); // Başlık güncelleniyor
        existingPost.setContent(post.getContent()); // İçerik güncelleniyor
        existingPost.setUpdatedAt(new Date()); // Güncellenme tarihi

        return postRepository.save(existingPost); // Güncellenmiş postu kaydediyoruz
    }


    // Tüm gönderileri getir
    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }




    // Yeni gönderi oluştur
    public Post createPost(Post post, String token) {
        String username = jwtUtils.extractEmail(token); // Token'dan userId alıyoruz
        UserInfo user = userInfoRepository.findByEmail(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        post.setUser(user); // Post'a User nesnesi ekleniyor
        post.setCreatedAt(new Date());
        post.setUpdatedAt(new Date());

        return postRepository.save(post);
    }

    // Post'u ID ile getir
    public Post getPostById(String postId) {
        return postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));
    }



    // Gönderiyi güncelle
    public Optional<Post> updatePost(String id, Post postDetails) {
        return postRepository.findById(id).map(existingPost -> {
            existingPost.setTitle(postDetails.getTitle());
            existingPost.setContent(postDetails.getContent());

            existingPost.setUpdatedAt(new Date());
            return postRepository.save(existingPost);
        });
    }

    // Gönderiyi sil
    public boolean deletePost(String id) {
        if (postRepository.existsById(id)) {
            postRepository.deleteById(id);
            return true;
        }
        return false;
    }
}

