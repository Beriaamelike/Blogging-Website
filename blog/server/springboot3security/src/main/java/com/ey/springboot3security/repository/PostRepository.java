package com.ey.springboot3security.repository;


import com.ey.springboot3security.entity.Post;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;



@Repository
public interface PostRepository extends MongoRepository<Post, String> {
    // Özel sorgular gerekirse burada ekleyebilirsiniz
}
