import { createProjectHTML } from "./projects.js";

const itemsPerPage = 12; // Number of products per page
export let currentPage = 1;
export let totalItems = 0;
export let totalPages = 0;

window.addEventListener("popstate", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const page = parseInt(urlParams.get("page")) || 1;

  currentPage = page;
  await initializeProjects();
});

document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const page = parseInt(urlParams.get("page")) || 1;

  currentPage = page;
  await initializeProjects();
});

const projectsContainer = document.querySelector(".projects-wrapper");
const paginationElement = document.querySelector(".pagination");

async function initializeProjects() {
  try {
    const response = await fetch("../data.json");
    const data = await response.json();
    totalItems = data.projects.length;
    totalPages = Math.ceil(totalItems / itemsPerPage);

    renderProjects(data.projects);
    renderPagination();
  } catch (error) {
    console.error("Error initializing projects:", error);
    projectsContainer.innerHTML = "<p>Failed to load projects.</p>";
  }
}

function renderProjects(projectList) {
  projectsContainer.innerHTML = "";

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const projectsToShow = projectList.slice(startIndex, endIndex);

  if (projectsToShow.length === 0) {
    projectsContainer.innerHTML = "<p>No projects available.</p>";
    return;
  }

  projectsToShow.forEach((project) => {
    projectsContainer.innerHTML += createProjectHTML(project);
  });
}

function renderPagination() {
  paginationElement.innerHTML = "";

  if (totalPages <= 1) return;

  // Previous button
  const prevButton = createPaginationButton("<", currentPage > 1, () => {
    if (currentPage > 1) {
      currentPage--;
      updatePage();
      scrollToTop();
    }
  });
  paginationElement.appendChild(prevButton);

  // Numbered buttons
  for (let i = 1; i <= totalPages; i++) {
    const isActive = currentPage === i;
    const pageButton = createPaginationButton(
      i,
      true,
      () => {
        currentPage = i;
        updatePage();
        scrollToTop();
      },
      isActive
    );
    paginationElement.appendChild(pageButton);
  }

  // Next button
  const nextButton = createPaginationButton(
    ">",
    currentPage < totalPages,
    () => {
      if (currentPage < totalPages) {
        currentPage++;
        updatePage();
        scrollToTop();
      }
    }
  );
  paginationElement.appendChild(nextButton);
}

function createPaginationButton(label, isEnabled, onClick, isActive = false) {
  const button = document.createElement("button");
  button.textContent = label;
  button.className = `pagination-button ${isActive ? "active" : ""}`;
  button.disabled = !isEnabled;

  if (isEnabled) {
    button.addEventListener("click", onClick);
  }

  return button;
}

async function updatePage() {
  try {
    const response = await fetch("../data.json");
    const data = await response.json();
    renderProjects(data.projects);
    renderPagination();

    const newUrl = new URL(window.location);
    newUrl.searchParams.set("page", currentPage);
    window.history.pushState({}, "", newUrl);
  } catch (error) {
    console.error("Error updating page:", error);
    projectsContainer.innerHTML = "<p>Failed to update projects.</p>";
  }
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}
