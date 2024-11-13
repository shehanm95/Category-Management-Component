const addCategoryButton = document.getElementById("addCategoryButton");
const categoryInput = document.getElementById("categoryInput");
const categoriesContainer = document.getElementById("categoriesContainer");
const subCategoryInput = document.getElementById("subCategoryInput");
const addSubCategoryButton = document.getElementById("addSubCategoryButton");
const subCategoriesContainer = document.getElementById("subCategoriesContainer");
const selectedCategoryName = document.getElementById("selectedCategoryName");

let categories = {}; // Object to store categories and their sub-categories
let selectedCategory = null; // Track currently selected category

addCategoryButton.addEventListener("click", addCategory);
addSubCategoryButton.addEventListener("click", addSubCategory);
categoryInput.addEventListener("keypress", (e) => { if (e.key === "Enter") addCategory(); });
subCategoryInput.addEventListener("keypress", (e) => { if (e.key === "Enter") addSubCategory(); });

function addCategory() {
    const categoryText = categoryInput.value.trim();
    if (categoryText && !categories[categoryText]) { // Avoid duplicates
        categories[categoryText] = ["Others"]; // Initialize with default "Others" sub-category

        const categoryTag = document.createElement("span");
        categoryTag.classList.add("category-tag");
        categoryTag.textContent = categoryText;

        // Cross button for removing category
        const removeBtn = document.createElement("span");
        removeBtn.classList.add("remove-btn");
        removeBtn.textContent = "×";
        removeBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            confirmCategoryDeletion(categoryText);
        });
        categoryTag.appendChild(removeBtn);

        // Click event to select category
        categoryTag.addEventListener("click", () => {
            document.querySelectorAll(".category-tag").forEach(tag => {
                tag.classList.remove("selected");
            });
            categoryTag.classList.add("selected");

            selectedCategory = categoryText; // Set the selected category
            selectedCategoryName.textContent = categoryText; // Display selected category name

            // Enable sub-category input and button
            subCategoryInput.disabled = false;
            addSubCategoryButton.disabled = false;

            displaySubCategories(); // Show its sub-categories
        });

        categoriesContainer.appendChild(categoryTag);
        categoryInput.value = "";
    }
}

function addSubCategory() {
    const subCategoryText = subCategoryInput.value.trim();
    if (subCategoryText && selectedCategory && !categories[selectedCategory].includes(subCategoryText)) {
        // Add sub-category to the selected category
        categories[selectedCategory].push(subCategoryText);
        subCategoryInput.value = "";
        displaySubCategories(); // Refresh sub-categories display
    }
}

function displaySubCategories() {
    // Clear the current sub-categories display
    subCategoriesContainer.innerHTML = "";

    // Display sub-categories for the selected category
    categories[selectedCategory].forEach(subCategory => {
        const subCategoryTag = document.createElement("span");
        subCategoryTag.classList.add("subcategory-tag");
        subCategoryTag.textContent = subCategory;

        // Add "Others" class if it's the default category
        if (subCategory === "Others") {
            subCategoryTag.classList.add("others-tag");
        }

        // Cross button for removing sub-category
        const removeBtn = document.createElement("span");
        removeBtn.classList.add("remove-btn");
        removeBtn.textContent = "×";
        removeBtn.addEventListener("click", () => {
            moveToOthers(subCategory);
        });
        subCategoryTag.appendChild(removeBtn);

        subCategoriesContainer.appendChild(subCategoryTag);
    });
}

function confirmCategoryDeletion(category) {
    const confirmDelete = confirm(`If you delete the category "${category}", all sub-categories will move to "Others". Are you sure?`);
    if (confirmDelete) {
        // Move sub-categories to "Others" before deletion
        categories["Others"] = (categories["Others"] || []).concat(categories[category].filter(sub => sub !== "Others"));
        delete categories[category];
        if (selectedCategory === category) {
            selectedCategory = null; // Clear selected category
            selectedCategoryName.textContent = ""; // Clear display of selected category name
            subCategoryInput.disabled = true;
            addSubCategoryButton.disabled = true;
        }
        categoriesContainer.innerHTML = ""; // Clear all categories
        subCategoriesContainer.innerHTML = ""; // Clear sub-categories display
        renderCategories();
    }
}

function moveToOthers(subCategory) {
    if (selectedCategory && subCategory !== "Others") {
        categories[selectedCategory] = categories[selectedCategory].filter(sub => sub !== subCategory);
        if (!categories["Others"]) categories["Others"] = [];
        categories["Others"].push(subCategory);
        displaySubCategories();
    }
}

function renderCategories() {
    for (const category in categories) {
        const categoryTag = document.createElement("span");
        categoryTag.classList.add("category-tag");
        categoryTag.textContent = category;

        // Cross button for each category
        const removeBtn = document.createElement("span");
        removeBtn.classList.add("remove-btn");
        removeBtn.textContent = "×";
        removeBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            confirmCategoryDeletion(category);
        });
        categoryTag.appendChild(removeBtn);

        categoryTag.addEventListener("click", () => {
            document.querySelectorAll(".category-tag").forEach(tag => {
                tag.classList.remove("selected");
            });
            categoryTag.classList.add("selected");
            selectedCategory = category;
            selectedCategoryName.textContent = category;
            subCategoryInput.disabled = false;
            addSubCategoryButton.disabled = false;
            displaySubCategories();
        });

        categoriesContainer.appendChild(categoryTag);
    }
}