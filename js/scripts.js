fetch('data/projects.json')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(projects => {
        const container = document.getElementById('project-cards');
        
        // Clear any existing content
        container.innerHTML = '';
        
        projects.forEach(project => {
            const card = document.createElement('div');
            card.className = 'col-lg-4 col-md-6 mb-4';
            
            // Color based on project index
            const colors = ['primary', 'success', 'info', 'warning', 'danger'];
            const colorIndex = projects.indexOf(project) % colors.length;
            const colorClass = colors[colorIndex];
            
            card.innerHTML = `
                <div class="card gig-card h-100 shadow-lg border-0 overflow-hidden">
                    <!-- Clean Card Header with Gradient -->
                    <div class="card-header bg-${colorClass} bg-gradient text-white py-4">
                        <div class="d-flex align-items-start justify-content-between">
                            <div class="flex-grow-1">
                                <h5 class="card-title mb-1 fw-bold">${project.name}</h5>
                                <p class="card-subtitle mb-0 opacity-75">
                                    <i class="fas fa-layer-group me-1"></i>${project.technologies.length} technologies
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Card Body -->
                    <div class="card-body d-flex flex-column p-4">
                        <!-- Project Image -->
                        <div class="project-image mb-3 rounded-3 overflow-hidden" style="height: 180px;">
                            <img src="${project.image}" 
                                 class="w-100 h-100 object-fit-cover" 
                                 alt="${project.name}"
                                 onerror="this.src='https://via.placeholder.com/400x200/0d6efd/ffffff?text=Project+Preview'">
                        </div>
                        
                        <!-- Description -->
                        <p class="card-text flex-grow-1 mb-3">${project.description}</p>
                        
                        <!-- Technologies Section -->
                        <div class="mb-4">
                            <h6 class="fw-bold text-muted mb-3 border-bottom pb-2">
                                <i class="fas fa-tools me-2"></i>Technology
                            </h6>
                            <div class="d-flex flex-wrap gap-2">
                                ${project.technologies.map(tech => 
                                    `<span class="badge bg-light text-dark border px-3 py-2">${tech}</span>`
                                ).join('')}
                            </div>
                        </div>
                    </div>
                    
                    <!-- Card Footer -->
                    <div class="card-footer bg-transparent border-top-0 pt-0 pb-4 px-4">
                        <a href="${project.link}" 
                           class="btn btn-${colorClass} btn-lg w-100 fw-bold d-flex align-items-center justify-content-center"
                           target="_blank"
                           rel="noopener noreferrer">
                            <i class="fas fa-briefcase me-2"></i>Follow Gig
                        </a>
                    </div>
                </div>
            `;
            
            container.appendChild(card);
            
            // Add hover animation
            const gigCard = card.querySelector('.gig-card');
            gigCard.addEventListener('mouseenter', () => {
                gigCard.style.transform = 'translateY(-10px)';
                gigCard.style.transition = 'transform 0.3s ease';
            });
            
            gigCard.addEventListener('mouseleave', () => {
                gigCard.style.transform = 'translateY(0)';
            });
        });
        
        // Add loading animation
        container.style.opacity = '0';
        setTimeout(() => {
            container.style.transition = 'opacity 0.5s ease';
            container.style.opacity = '1';
        }, 100);
    })
    .catch(error => {
        console.error('Error loading projects:', error);
        const container = document.getElementById('project-cards');
        if (container) {
            container.innerHTML = `
                <div class="col-12">
                    <div class="alert alert-warning text-center p-5 rounded-4">
                        <i class="fas fa-exclamation-triangle fa-3x mb-3 text-warning"></i>
                        <h4>Projects Coming Soon!</h4>
                        <p class="mb-0">Currently updating my project portfolio. Check back soon!</p>
                        <a href="mailto:noahyalla@gmail.com" class="btn btn-primary mt-3">
                            <i class="fas fa-envelope me-2"></i>Request Portfolio
                        </a>
                    </div>
                </div>
            `;
        }
    });