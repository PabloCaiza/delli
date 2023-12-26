package com.delli.recipes.controller;

import com.delli.recipes.dto.RecipeDetailDto;
import com.delli.recipes.dto.RecipeDto;
import com.delli.recipes.service.RecipeService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


@RestController
@RequestMapping("/recipes")
@RequiredArgsConstructor
@CrossOrigin("*")
public class RecipeController {
    private final RecipeService recipeService;

    @GetMapping
    public Page<RecipeDto> getRecipes(@PageableDefault Pageable pageable) {
        return recipeService.getRecipes(pageable);
    }

    @GetMapping("/searchByTitle")
    public Page<RecipeDto> filterByTitle(@RequestParam("title") String title, @PageableDefault Pageable pageable) {
        return recipeService.getRecipesByTitle(title, pageable);
    }

    @PostMapping("/searchByImage")
    public Page<RecipeDetailDto> getRecipeByImage(@RequestParam("file") MultipartFile multipartFile, @PageableDefault Pageable pageable) {
        return recipeService.getRecipeByImage(multipartFile, pageable);
    }

    @GetMapping("/{id}")
    public RecipeDetailDto getRecipeById(@PathVariable("id") String id) {
        return recipeService.getRecipeById(id);
    }
}
