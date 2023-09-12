function populateCategoryDropdown() {
    // Replace 'https://your-api-endpoint.com/categories' with your API endpoint
    axios.get('http://localhost:8000/categories/showCategories')
    .then(function (response) {
        const categoryDropdown = document.getElementById('category');
        const categories = response.data;
        console.log(response)
        // Iterate through the categories and add options to the dropdown
        categories.forEach(function (category) {
            const option = document.createElement('option');
            option.value = category.id; // Set the value (you can adjust this)
            option.textContent = category.name; // Set the display text
            categoryDropdown.appendChild(option);
        });
    })
    .catch(function (error) {
        // Handle any errors that occurred during the request
        console.error('Error:', error);
    });
}

// Call the function to populate the category dropdown when the page loads
window.addEventListener('load', populateCategoryDropdown);

// Handle form submission
document.getElementById('blogForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent the default form submission

    const form = e.target;
    const formData = new FormData(form); // Create a FormData object to store form data

    // Make a POST request using Axios
    axios.post('http://localhost:8000/blogs/postBlog', formData, {
        headers: {
            'Content-Type': 'multipart/form-data' // Set the content type for file uploads
        }
    })
    .then(function (response) {
        // Handle the successful response from the API
        document.getElementById('message').textContent = 'Blog post created successfully!';
        form.reset(); // Reset the form after successful submission
    })
    .catch(function (error) {
        // Handle any errors that occurred during the request
        document.getElementById('message').textContent = 'Error: ' + error.message;
    });
});