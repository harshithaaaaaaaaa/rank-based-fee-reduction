document.getElementById('ia1').addEventListener('submit', async (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = {
        name: form.elements.name.value,
        phone: form.elements.phone.value,
        address: form.elements.address.value,
        cet: form.elements.cet.value,
        collegeId: form.elements.collegeId.value,
        minCet: form.elements.minCet.value,
        maxCet: form.elements.maxCet.value
    };
    console.log('Form submitted');
    console.log('Form data:', formData);
    try {
        const response = await fetch('http://localhost:3000/submit_form', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        if (response.ok) {
            console.log('Form submitted successfully');
            alert('Form submitted successfully');
            form.reset();
        } else {
            console.error('Error submitting form');
            alert('Error submitting form');
        }
    } catch (error) {
        console.error('Error submitting form:', error);
        alert('Error submitting form');
    }
});