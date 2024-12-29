document.addEventListener("DOMContentLoaded", function () {
	const form = document.querySelector(".php-email-form");
	const loading = document.querySelector(".php-email-form .loading");
	const sentMessage = document.querySelector(".php-email-form .sent-message");
	const errorMessage = document.querySelector(".php-email-form .error-message");

	form.addEventListener("submit", async function (event) {
		event.preventDefault(); // Prevent default form submission

		// Reset messages
		loading.style.display = "block";
		sentMessage.style.display = "none";
		errorMessage.style.display = "none";

		const formData = new FormData(form);

		try {
			const response = await fetch(form.action, {
				method: form.method,
				body: formData,
				headers: { Accept: "application/json" },
			});

			loading.style.display = "none"; // Hide loading spinner

			if (response.ok) {
				// Show success message
				sentMessage.textContent = "Message sent successfully!";
				sentMessage.style.display = "block";
				form.reset(); // Reset the form fields
			} else {
				// Handle error (but hide raw response data)
				errorMessage.textContent = "An error occurred. Please try again.";
				errorMessage.style.display = "block";
			}
		} catch (error) {
			// Handle network or unexpected errors
			loading.style.display = "none"; // Hide loading spinner
			errorMessage.textContent = "An unexpected error occurred. Please try again later.";
			errorMessage.style.display = "block";
		}
	});
});
