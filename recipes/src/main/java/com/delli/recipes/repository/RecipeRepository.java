package com.delli.recipes.repository;

import com.delli.recipes.model.Recipe;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecipeRepository extends MongoRepository<Recipe, String> {

    Page<Recipe> findByTitleContainingIgnoreCase(String title, Pageable pageable);

    @Aggregation(pipeline = {
            "{$match: {'ingredients': {$in:  ?0}}}",
            "{$addFields: {'matchingIngredients': {$size: {$setIntersection: ['$ingredients',?0]}}} }",
            "{$sort: {'matchingIngredients':-1}}",
    })
    List<Recipe> findByIngredients(List<String> ingredients, Pageable pageable);

    @Aggregation(pipeline = {
            "{$match: {'ingredients': {$in:  ?0}}}",
            "{$count: 'count'}"
    })
    Integer countByIngredients(List<String> ingredients);
}
