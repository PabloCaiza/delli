package com.delli.recipes.dto;

import java.util.List;

public record RecipeDetailDto(String id, String title, String imageUrl, String duration, String link,
                              List<String> steps, List<String> ingredients) {
}
