package com.delli.recipes.restclients;

import com.delli.recipes.dto.IngredientsDto;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.service.annotation.PostExchange;

public interface IngredientsClient {
    @PostExchange("/predictIngredients")
    IngredientsDto predictIngredients(MultipartFile file);
}
