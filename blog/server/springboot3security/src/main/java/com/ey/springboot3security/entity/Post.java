package com.ey.springboot3security.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "posts")
public class Post {

    @Id
    private String id;
    private String title;
    private String imageURL;
    private String content;
    private String category;
    private Date createdAt;
    private Date updatedAt;

    private UserInfo user;

}
