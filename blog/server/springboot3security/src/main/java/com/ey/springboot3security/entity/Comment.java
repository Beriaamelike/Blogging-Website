package com.ey.springboot3security.entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "comments")
public class Comment {

    @Id
    private String commentId;
    private String commentInfo;
    private Date createdCommentAt;
    private String postId;

    private UserInfo user;

}
