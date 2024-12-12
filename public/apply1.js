document.getElementById('ia1').addEventListener('submit', async (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = {
        aadhar: form.elements.aadhar.value,
        name: form.elements.name.value,
        par_name: form.elements.par_name.value,
        par_phn: form.elements.par_name.value,
        col_name: form.elements.col_name.value,
        branch: form.elements.branch.value,
        col_id: form.elements.col_id.value
    };
    console.log('Form submitted');
    console.log('Form data:', formData);
    try {
        const response = await fetch('http://localhost:8089/submit_form', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        if (response.ok) {
            console.log('Form submitted successfully');
            alert('Applied successfully');
            form.reset();
            console.log('Redirecting to next page...');
            window.location.href = './confirm.html'; // Redirect the user
        } else {
            console.error('Error submitting form');
            alert('Error submitting form');
        }
    } catch (error) {
        console.error('Error submitting form:', error);
        alert('Error submitting form: ' + error.message);
    }
});

