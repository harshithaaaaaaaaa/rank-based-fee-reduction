document.getElementById('ia1').addEventListener('submit', async (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = {
        name: form.elements.name.value,
        email: form.elements.email.value,
        phn: form.elements.phn.value,
        address: form.elements.address.value,
        cet: form.elements.cet.value,
        aadhar: form.elements.aadhar.value
    };
    console.log('Form submitted');
    console.log('Form data:', formData);
    try {
        const response = await fetch('http://localhost:8081/submit_form', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        if (response.ok) {
            console.log('Form submitted successfully');
            alert('Form submitted successfully and class is created');
            form.reset();
            console.log('Redirecting to next page...');
            window.location.href = './filteredCollege.html'; // Redirect the user
        } else {
            console.error('Error submitting form');
            alert('Error submitting form');
        }
    } catch (error) {
        console.error('Error submitting form:', error);
        alert('Error submitting form: ' + error.message);
    }
});

