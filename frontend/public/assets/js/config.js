window.ENV = {
    API_URL: 'http://localhost:3000',
};

// Update navigation links based on user authentication status
window.ENV.updateNav = async function() {
    const loginLink = document.getElementById('login-link');
    const registerLink = document.getElementById('register-link');
    const logoutLink = document.getElementById('logout-link');
    const profileLink = document.getElementById('profile-link');
    const adminLink = document.getElementById('admin-link');
    const userToken = localStorage.getItem('userToken');

    if (userToken) {
        try {
            const response = await fetch(`${window.ENV.API_URL}/api/verify-token`, {
                headers: { 'Authorization': `Bearer ${userToken}` }
            });
            if (response.ok) {
                const data = await response.json();
                loginLink.style.display = 'none';
                registerLink.style.display = 'none';
                logoutLink.style.display = 'block';
                profileLink.style.display = 'block';
                profileLink.href = `/profile/${data.profile?.nickname || data.username || 'me'}`;
                adminLink.style.display = data.isAdmin ? 'block' : 'none';
            } else {
                localStorage.removeItem('userToken');
                localStorage.removeItem('refreshToken');
                loginLink.style.display = 'block';
                registerLink.style.display = 'block';
                logoutLink.style.display = 'none';
                profileLink.style.display = 'none';
                adminLink.style.display = 'none';
            }
        } catch (error) {
            console.error('Error verifying token:', error);
            localStorage.removeItem('userToken');
            localStorage.removeItem('refreshToken');
            loginLink.style.display = 'block';
            registerLink.style.display = 'block';
            logoutLink.style.display = 'none';
            profileLink.style.display = 'none';
            adminLink.style.display = 'none';
        }
    } else {
        loginLink.style.display = 'block';
        registerLink.style.display = 'block';
        logoutLink.style.display = 'none';
        profileLink.style.display = 'none';
        adminLink.style.display = 'none';
    }
};

// Set theme (light/dark) and update theme toggle icon
window.ENV.setTheme = function(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    const modeToggle = document.getElementById('modeToggle');
    if (modeToggle) {
        modeToggle.src = theme === 'dark' ? modeToggle.getAttribute('src-dark') : modeToggle.getAttribute('src-light');
    }
};

// Handle theme toggle click event
document.getElementById('theme-toggle')?.addEventListener('click', (e) => {
    e.preventDefault();
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    window.ENV.setTheme(newTheme);
});

// Verify user token and refresh if necessary
window.ENV.verifyToken = async function(token) {
    try {
        const response = await fetch(`${window.ENV.API_URL}/api/verify-token`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!response.ok) {
            if (response.status === 401 || response.status === 403) {
                const refreshToken = localStorage.getItem('refreshToken');
                if (refreshToken) {
                    const refreshResponse = await fetch(`${window.ENV.API_URL}/api/refresh-token`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ refreshToken })
                    });
                    if (!refreshResponse.ok) {
                        throw new Error('Failed to refresh token');
                    }
                    const refreshData = await refreshResponse.json();
                    if (refreshData.token) {
                        localStorage.setItem('userToken', refreshData.token);
                        localStorage.setItem('refreshToken', refreshData.refreshToken);
                        return true;
                    }
                }
                localStorage.removeItem('userToken');
                localStorage.removeItem('refreshToken');
                return false;
            }
            throw new Error('Token verification failed');
        }
        const newToken = response.headers.get('X-New-Token');
        if (newToken) {
            localStorage.setItem('userToken', newToken);
        }
        return true;
    } catch (error) {
        console.error('Token verification failed:', error);
        localStorage.removeItem('userToken');
        localStorage.removeItem('refreshToken');
        return false;
    }
};