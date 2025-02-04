export function createProjectHTML(project, lang) {
  const description =
    lang === "ka" ? project.descriptionKa : project.description;
  return `
     <div class="project">
      <img src=".${project.image}" alt="title" />
      <h3>${project.title}</h3>
      <h4>Tech Stack: ${project.techStack}</h4>
      <p>${description}</p>
      <div class="project-btns">
        ${
          project.sourceCode
            ? `
          <a href="${project.sourceCode}" target="_blank">
            <button class="project-url btn">
              <i class="fa-brands fa-github"></i> Src
            </button>
          </a>
        `
            : ""
        }
        ${
          project.viewDemo
            ? `
          <a href="${project.viewDemo}" target="_blank">
            <button class="project-url btn">
              <i class="fa-solid fa-display"></i> View
            </button>
          </a>
        `
            : ""
        }
      </div>
    </div>
  `;
}
