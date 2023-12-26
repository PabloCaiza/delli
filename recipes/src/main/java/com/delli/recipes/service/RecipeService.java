package com.delli.recipes.service;

import com.delli.recipes.dto.RecipeDetailDto;
import com.delli.recipes.dto.RecipeDto;
import com.delli.recipes.model.Recipe;
import com.delli.recipes.repository.RecipeRepository;
import com.delli.recipes.restclients.IngredientsClient;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class RecipeService {
    private final RecipeRepository recipeRepository;
    private final IngredientsClient ingredientsClient;

    public Page<RecipeDto> getRecipes(Pageable pageable) {
        return recipeRepository.findAll(pageable).map(this::mapRecipeToRecipeDto);
    }

    public RecipeDetailDto getRecipeById(String id) {
        return recipeRepository.findById(id)
                .map(this::mapRecipeToRecipeDetailDto)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "entity not found"));
    }

    public Page<RecipeDto> getRecipesByTitle(String title, Pageable pageable) {
        return recipeRepository.findByTitleContainingIgnoreCase(title, pageable).map(this::mapRecipeToRecipeDto);
    }

    public Page<RecipeDetailDto> getRecipeByImage(MultipartFile multipartFile, Pageable pageable) {
        if (!isSupportedExtension(multipartFile.getContentType()))
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "support only png, jpg and jpeg");
        var ingredients = ingredientsClient.predictIngredients(multipartFile);
        var totalRecipes = Optional.ofNullable(recipeRepository.countByIngredients(ingredients.names())).orElse(0);
        List<RecipeDetailDto> recipesByIngredients = recipeRepository.findByIngredients(ingredients.names(), pageable)
                .stream()
                .map(this::mapRecipeToRecipeDetailDto)
                .toList();
        return new PageImpl<>(recipesByIngredients, pageable, totalRecipes);
    }

    private RecipeDto mapRecipeToRecipeDto(Recipe r) {
        return new RecipeDto(r.getId(), r.getTitle(), r.getImageUrl(), r.getDuration());
    }

    private RecipeDetailDto mapRecipeToRecipeDetailDto(Recipe r) {
        return new RecipeDetailDto(r.getId(), r.getTitle(), r.getImageUrl(), r.getDuration(), r.getLink(),
                r.getSteps(), r.getIngredients());
    }

    private boolean isSupportedExtension(String extension) {
        return extension != null && (
                extension.equals("image/jpg")
                        || extension.equals("image/png")
                        || extension.equals("image/jpeg"));
    }
}
