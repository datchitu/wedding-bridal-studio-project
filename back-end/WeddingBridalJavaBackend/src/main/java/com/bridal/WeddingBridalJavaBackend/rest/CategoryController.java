package com.bridal.WeddingBridalJavaBackend.rest;

import com.bridal.WeddingBridalJavaBackend.constants.ResponseCode;
import com.bridal.WeddingBridalJavaBackend.Service.CategoryService;
import com.bridal.WeddingBridalJavaBackend.dto.CategoryDTOResponse;
import com.bridal.WeddingBridalJavaBackend.dto.ServiceDTOResponse;
import com.bridal.WeddingBridalJavaBackend.model.Category;
import com.bridal.WeddingBridalJavaBackend.model.Service;
import com.bridal.WeddingBridalJavaBackend.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Array;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/categories")
public class CategoryController extends BaseRestController {

    @Autowired
    CategoryService categoryService;

    @GetMapping("")
    public ResponseEntity<?> getAllCategoryAndStatus(@RequestParam(defaultValue = "-1") Integer status) {
        try {
            // status = 0 => get not deleted
            // status = 1 => get deleted
            // status = -1 => get all
            if(!Arrays.asList(-1,0,1).contains(status)) {
                return error(ResponseCode.INVALID_VALUE.getCode(), ResponseCode.INVALID_VALUE.getMessage());
            }
//            List<Category> categories = this.categoryService.getAllCategory();
            List<Category> categories;
            if (status == -1) {
                categories = this.categoryService.getAllCategory();
            } else if (status == 0) {
                categories = this.categoryService.getAllCategoryByDeleted(false);
            } else {
                categories = this.categoryService.getAllCategoryByDeleted(true);
            }
            List<CategoryDTOResponse> responses = categories.stream()
                    .map(category -> new CategoryDTOResponse(category))
                    .collect(Collectors.toList());

            return super.success(responses);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return super.error(ResponseCode.NO_CONTENT.getCode(), ResponseCode.NO_CONTENT.getMessage());
    }

    @GetMapping("/get-category-by-id")
    public ResponseEntity<?> getCategoryById(@RequestParam(name = "id", required = false, defaultValue = "1") Long id) {
        Category foundCategory = this.categoryService.findCategoryById(id);
        if (ObjectUtils.isEmpty(foundCategory)) {
            return super.error(ResponseCode.CATEGORY_NOT_FOUND.getCode(), ResponseCode.CATEGORY_NOT_FOUND.getMessage());
        }
        return super.success(new CategoryDTOResponse(foundCategory));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("")
    public ResponseEntity<?> addCaregory(@RequestBody(required = true) Map<String, Object> newCategory) {
        try {
            if (ObjectUtils.isEmpty(newCategory)
                    || ObjectUtils.isEmpty(newCategory.get("name"))) {
                return super.error(ResponseCode.NO_PARAM.getCode(), ResponseCode.NO_PARAM.getMessage());
            }
            Category foundCategory = this.categoryService.findByName(newCategory.get("name").toString()).orElse(null);
            if (!ObjectUtils.isEmpty(foundCategory)) {
                return super.error(ResponseCode.DATA_ALREADY_EXISTS.getCode(),
                        ResponseCode.DATA_ALREADY_EXISTS.getMessage());
            }
            Category insertedCategory = categoryService.addCategory(newCategory);
            return super.success(new CategoryDTOResponse(insertedCategory));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return super.error(ResponseCode.NO_CONTENT.getCode(), ResponseCode.NO_CONTENT.getMessage());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/update")
    public ResponseEntity<?> updateCategory(@RequestParam(name = "id", required = false, defaultValue = "1") Long id,
                                            @RequestBody(required = false) Map<String, Object> newCategory) {
        try {
            if (ObjectUtils.isEmpty(newCategory)
                    || ObjectUtils.isEmpty(newCategory.get("name"))) {
                return super.error(ResponseCode.NO_PARAM.getCode(), ResponseCode.NO_PARAM.getMessage());
            }
            Category foundCategory = this.categoryService.findCategoryById(id);
            if (ObjectUtils.isEmpty(foundCategory)) {
                return super.error(ResponseCode.CATEGORY_NOT_FOUND.getCode(), ResponseCode.CATEGORY_NOT_FOUND.getMessage());
            }
            Category updatedCategory = categoryService.updateCategory(id, newCategory);
            return super.success(new CategoryDTOResponse(updatedCategory));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return super.error(ResponseCode.NO_CONTENT.getCode(), ResponseCode.NO_CONTENT.getMessage());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteCategory(@RequestParam(name = "id", required = false, defaultValue = "1") Long id) {
        try {
            Category foundCategory = this.categoryService.findCategoryById(id);
            if (ObjectUtils.isEmpty(foundCategory)) {
                return super.error(ResponseCode.CATEGORY_NOT_FOUND.getCode(), ResponseCode.CATEGORY_NOT_FOUND.getMessage());
            }
            if (foundCategory.getDeleted().equals(true)) {
                return super.error(ResponseCode.DELETED.getCode(), ResponseCode.DELETED.getMessage());
            }
            Category deletedCategory = categoryService.deleteCategory(id);
            return super.success(new CategoryDTOResponse(deletedCategory));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return super.error(ResponseCode.NO_CONTENT.getCode(), ResponseCode.NO_CONTENT.getMessage());
    }
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/active")
    public ResponseEntity<?> activeCategory(@RequestParam(name = "id", required = false, defaultValue = "1") Long id) {
        try {
            Category foundCategory = this.categoryService.findCategoryById(id);
            if (ObjectUtils.isEmpty(foundCategory)) {
                return super.error(ResponseCode.CATEGORY_NOT_FOUND.getCode(), ResponseCode.CATEGORY_NOT_FOUND.getMessage());
            }
            if (foundCategory.getDeleted().equals(false)) {
                return super.error(ResponseCode.DELETED.getCode(), ResponseCode.DELETED.getMessage());
            }
            Category activedCategory = categoryService.activeCategory(id);
            return super.success(new CategoryDTOResponse(activedCategory));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return super.error(ResponseCode.NO_CONTENT.getCode(), ResponseCode.NO_CONTENT.getMessage());
    }
}

