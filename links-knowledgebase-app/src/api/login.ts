export const login = async () => {
  try {
    const response = await fetch('http://localhost:1337/api/auth/local', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // identifier: 'luda@strapi.io',
        identifier: 'katya@strapi.io',
        password: 'admin1',
      }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    console.log('Well done!');
    console.log('User profile', data.user);
    console.log('User token', data.jwt);

    return data;
  } catch (error) {
    console.error('An error occurred:', error);
    throw error;
  }
};

