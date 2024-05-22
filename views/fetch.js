/////////// post data

async function register_user(userData) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    };

    try {
        const response = await fetch('http://localhost:3000/form', requestOptions);
        const data = await response.json();

        return data;
    } catch (error) {
        console.error('Erreur lors de l\'inscription :', error);
    }
}

export {register_user};

