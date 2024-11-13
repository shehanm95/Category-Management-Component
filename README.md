# Category and Subcategory Management Component

This project provides a Bootstrap-based UI component for managing categories and their respective sub-categories. Each category can contain multiple sub-categories, and the UI includes interactive features for adding, selecting, and deleting categories and sub-categories. Deleted items are moved to an "Others" section as a default fallback.

## Features

- **Add Categories**: Enter a category name and add it to the list.
- **Select and Add Subcategories**: Select a category to enable adding related sub-categories.
- **Move Deleted Subcategories**: If a category is deleted, its sub-categories are moved to the default "Others" section.
- **Quick Actions**: Each category and sub-category tag has a cross (`×`) button for deletion.
- **Keyboard Support**: Press "Enter" to quickly submit category or sub-category input.


## Dependencies

This component relies on Bootstrap 5 for styling:
- Bootstrap CSS and JS from CDN

## Code Summary

### HTML Structure

- **Category Input Field**: Used to enter and submit new categories.
- **Category Tags**: Displayed in a container with each category selectable and removable.
- **Subcategory Input Field**: Enabled only when a category is selected.
- **Subcategory Tags**: Associated with the selected category and displayed with delete options.

### JavaScript Functionality

- **`addCategory()`**: Adds a new category, displays it as a selectable tag, and enables it for sub-category additions.
- **`addSubCategory()`**: Adds a sub-category to the selected category and displays it below.
- **`confirmCategoryDeletion()`**: Confirms deletion of a category and moves its sub-categories to "Others".
- **`moveToOthers()`**: Moves deleted sub-categories to the "Others" category.
- **Keyboard Support**: Allows pressing "Enter" to submit input fields quickly.



---

Feel free to use, modify, and share!
