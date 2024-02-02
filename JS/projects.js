function createProjectHTML(project) {
  return `
    <div class="project">
      <img src=".${project.image}" alt="title" />
      <h3>${project.title}</h3>
      <h4>Tech Stack: ${project.techStack}</h4>
      <p>${project.description}</p>
      <div class="project-btns">
        <a href="${project.sourceCode}" target="_blank">
          <button class="project-url btn">
            <i class="fa-brands fa-github"></i> Src
          </button>
        </a>
        <a href="${project.viewDemo}" target="_blank">
          <button class="project-url btn">
            <i class="fa-solid fa-display"></i> View
          </button>
        </a>
      </div>
    </div>
  `;
}

// Fetching project data from JSON file
fetch("../data.json")
  .then((response) => response.json())
  .then((data) => {
    const projectsContainer = document.querySelector(".projects-wrapper");

    data.projects.forEach((project) => {
      const projectHTML = createProjectHTML(project);
      projectsContainer.innerHTML += projectHTML;
    });
  })
  .catch((error) => console.error("Error fetching projects:", error));
