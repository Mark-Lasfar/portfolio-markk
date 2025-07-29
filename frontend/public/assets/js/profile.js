        const API_URL = window.ENV.API_URL;
        let userToken = localStorage.getItem('userToken');

        document.getElementById('logout-link').addEventListener('click', async (e) => {
            e.preventDefault();
            try {
                await fetch(`${API_URL}/api/logout`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${userToken}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ refreshToken: localStorage.getItem('refreshToken') })
                });
                localStorage.removeItem('userToken');
                localStorage.removeItem('refreshToken');
                userToken = null;
                window.ENV.updateNav();
                window.location.href = '/';
            } catch (error) {
                console.error('Logout failed:', error);
                document.getElementById('profile-nickname').textContent = 'Error during logout';
            }
        });

        async function loadProfile() {
            const nickname = window.location.pathname.split('/').pop() || 'me';
            if (userToken && !(await window.ENV.verifyToken(userToken))) {
                localStorage.removeItem('userToken');
                localStorage.removeItem('refreshToken');
                window.location.href = '/login.html?reason=Please login to view your profile';
                return;
            }
            try {
                const response = await fetch(`${API_URL}/api/profile/${nickname}`, {
                    headers: userToken ? { 'Authorization': `Bearer ${userToken}` } : {}
                });
                if (!response.ok) {
                    const errorData = await response.json();
                    if (response.status === 403 && errorData.loginRequired) {
                        document.getElementById('profile-nickname').innerHTML = `
                            <p class="text-gray-700 dark:text-gray-300 mt-4">
                                This profile is private. <a href="/login.html" class="text-blue-500 hover:underline">Login</a> to view.
                            </p>
                        `;
                        return;
                    }
                    throw new Error(errorData.error || 'Failed to fetch profile');
                }
                const data = await response.json();
                document.getElementById('portfolio-name').textContent = data.profile.portfolioName || 'Portfolio';
                document.getElementById('profile-nickname').textContent = data.profile.nickname || data.username;
                document.getElementById('profile-jobTitle').textContent = data.profile.jobTitle || 'Not specified';
                document.getElementById('profile-bio').textContent = data.profile.bio || 'Not specified';
                document.getElementById('profile-avatar').src = data.profile.avatar || '/assets/img/default-avatar.png';
                document.getElementById('footer-username').textContent = data.profile.nickname || data.username;
                if (!userToken) {
                    document.getElementById('profile-nickname').innerHTML += `
                        <p class="text-gray-700 dark:text-gray-300 mt-4">
                            <a href="/login.html" class="text-blue-500 hover:underline">Login</a> to access more features.
                        </p>
                    `;
                }

                const educationContainer = document.getElementById('profile-education');
                educationContainer.innerHTML = data.profile.education.length ? data.profile.education.map(edu => `
                    <p class="about__text">${edu.degree} at ${edu.institution} (${edu.year})</p>
                `).join('') : '<p class="about__text">No education details provided.</p>';

                const experienceContainer = document.getElementById('profile-experience');
                experienceContainer.innerHTML = data.profile.experience.length ? data.profile.experience.map(exp => `
                    <p class="about__text">${exp.role} at ${exp.company} (${exp.duration})</p>
                `).join('') : '<p class="about__text">No experience details provided.</p>';

                const certificatesContainer = document.getElementById('profile-certificates');
                certificatesContainer.innerHTML = data.profile.certificates.length ? data.profile.certificates.map(cert => `
                    <p class="about__text">${cert.name} by ${cert.issuer} (${cert.year})</p>
                `).join('') : '<p class="about__text">No certificates provided.</p>';

                const interestsContainer = document.getElementById('profile-interests');
                interestsContainer.innerHTML = data.profile.interests.length ? data.profile.interests.map(interest => `
                    <p class="about__text">${interest}</p>
                `).join('') : '<p class="about__text">No interests provided.</p>';

                const skillsContainer = document.getElementById('profile-skills');
                skillsContainer.innerHTML = data.profile.skills.length ? data.profile.skills.map(skill => `
                    <div class="skills__data">
                        <div class="skills__names">
                            <span class="skills__name">${skill.name}</span>
                        </div>
                        <div class="skills__bar" style="width: ${skill.percentage}%"></div>
                        <div><span class="skills__percentage">${skill.percentage}%</span></div>
                    </div>
                `).join('') : '<p>No skills provided.</p>';

                const projectsContainer = document.getElementById('profile-projects');
                projectsContainer.innerHTML = data.profile.projects.length ? data.profile.projects.map(project => `
                    <div class="single-portfolio-content">
                        <img src="${project.image}" alt="${project.title}" class="work__img">
                        <div class="work__content">
                            <h3>${project.title}</h3>
                            <p>${project.description}</p>
                            <div class="select-container">
                                <select name="links" onchange="if(this.value) window.open(this.value, '_blank');">
                                    <option value="">Choose an option</option>
                                    ${project.links.map(link => `<option value="${link.value}">${link.option}</option>`).join('')}
                                </select>
                            </div>
                        </div>
                    </div>
                `).join('') : '<p>No projects provided.</p>';

                document.getElementById('download-cv').href = `${API_URL}/api/profile/pdf/${nickname}`;
            } catch (error) {
                console.error('Error loading profile:', error);
                document.getElementById('profile-nickname').textContent = 'Error loading profile: ' + error.message;
            }
        }

        async function loadInteractions() {
            if (!userToken) return;
            try {
                const response = await fetch(`${API_URL}/api/user-interactions`, {
                    headers: { 'Authorization': `Bearer ${userToken}` }
                });
                if (!response.ok) throw new Error('Failed to fetch interactions');
                const comments = await response.json();
                const interactionsContainer = document.getElementById('profile-interactions');
                interactionsContainer.innerHTML = comments.length ? comments.map(comment => `
                    <div class="comment">
                        <strong>Project: ${comment.projectId?.title || 'Unknown'}</strong>
                        <p>Rating: ${'★'.repeat(comment.rating)}</p>
                        <p>Comment: ${comment.text}</p>
                        ${comment.replies.map(reply => `<div class="reply">Admin: ${reply.text} (${new Date(reply.timestamp).toLocaleString()})</div>`).join('')}
                    </div>
                `).join('') : '<p>No interactions yet.</p>';
            } catch (error) {
                console.error('Error loading interactions:', error);
                document.getElementById('profile-interactions').innerHTML = '<p>Error loading interactions: ' + error.message;
            }
        }
