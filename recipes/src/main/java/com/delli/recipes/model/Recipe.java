package com.delli.recipes.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter

@Document(collection = "recipes")
public class Recipe {
    @Id
    private String id;
    private String title;
    private String imageUrl;
    private String duration;
    private String link;
    private List<String> steps;
    private List<String> ingredients;
}
