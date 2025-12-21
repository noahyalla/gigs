fetch('data/projects.json')
    .then(response => response.json())
    .then(projects => {
        const container = document.getElementById('project-cards');
        projects.forEach(project => {
            const card = document.createElement('div');
            card.className = 'col-md-4';
            card.innerHTML = `
                <div class="card project-card">
                    <img src="${project.image}" class="card-img-top" alt="${project.name}">
                    <div class="card-body">
                        <h5 class="card-title">${project.name}</h5>
                        <p class="card-text">${project.description}</p>
                        <p><strong>Technologies:</strong> ${project.technologies.join(', ')}</p>
                        <a href="${project.link}" class="btn btn-primary" target="_blank">View Project</a>
                    </div>
                </div>
            `;
            container.appendChild(card);
        });
    })
    .catch(error => console.error('Error loading projects:', error));