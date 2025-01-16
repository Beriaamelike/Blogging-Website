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
        // Token'dan kullanıcı e-postasını çıkarıyoruz
        String username = jwtUtils.extractEmail(token);

        // Güncellenecek postu veritabanından çekiyoruz
        Post existingPost = postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        // Gönderiyi güncellemek isteyen kullanıcı ile postun sahibi aynı mı kontrol ediyoruz
        if (!existingPost.getUser().getEmail().equals(username)) {
            throw new RuntimeException("You are not authorized to update this post");
        }

        // Postun güncellenebilir alanlarını set ediyoruz
        existingPost.setTitle(post.getTitle());
        existingPost.setContent(post.getContent());
        existingPost.setCategory(post.getCategory());
        existingPost.setImageURL(post.getImageURL());
        existingPost.setUpdatedAt(new Date()); // Güncellenme tarihini güncelliyoruz

        // Güncellenmiş postu kaydediyoruz
        return postRepository.save(existingPost);
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



    // Gönderiyi sil
    public boolean deletePost(String id) {
        if (postRepository.existsById(id)) {
            postRepository.deleteById(id);
            return true;
        }
        return false;
    }
}