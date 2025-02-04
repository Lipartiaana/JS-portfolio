function updateHomepageLink(lang) {
  const homepageLink = document.querySelector(".navbar-brand");
  if (homepageLink) {
    const url = new URL(homepageLink.href, window.location.origin);
    url.searchParams.set("lang", lang);
    homepageLink.href = url.toString();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  let urlParams = new URLSearchParams(window.location.search);
  let lang = urlParams.get("lang") || "en";

  updateHomepageLink(lang);

  if (lang !== "en" && lang !== "ka") {
    lang = "en";
    urlParams.set("lang", lang);
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${urlParams.toString()}`
    );
  }

  updatePageContent(lang);

  document.querySelectorAll(".lang-switch").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const newLang = e.target.dataset.lang;
      urlParams.set("lang", newLang);
      const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
      window.history.pushState({}, "", newUrl);
      updateHomepageLink(newLang);
      updatePageContent(newLang);
      updateNavLinks(newLang);
    });
  });

  function updateNavLinks(lang) {
    document.querySelectorAll("a.nav-link").forEach((link) => {
      const href = new URL(link.href);
      href.searchParams.set("lang", lang);
      link.href = href.toString();
    });
  }

  updateNavLinks(lang);

  window.addEventListener("popstate", () => {
    urlParams = new URLSearchParams(window.location.search);
    lang = urlParams.get("lang") || "en";
    updatePageContent(lang);
    updateNavLinks(lang);
  });
});

function updatePageContent(lang) {
  const content = {
    en: {
      aboutLink: "ABOUT",
      projectsLink: "PROJECTS",
      contactLink: "CONTACT",
      greeting: "Hello, i am Ana,",
      profession: "Frontend Developer",
      cv: "Download CV",
      aboutTitle: "ABOUT ME",
      aboutMe: `<p> I am a hardworking, passionate woman web developer, with great problem-solving skills, committed to breaking barriers in the world of technology. I am proud to have actively participated in the '500 Women in Tech' program, which provided me with the opportunity to broaden my horizons.</p> 
      <p> Over the past 5 months, I've had the privilege of working as a front-end developer intern at "Unilab", where I've been a part of exciting projects and continued to expand my technical skills.</p>
      <p> If you are seeking a dedicated and enthusiastic team player, I'm here to explore new opportunities and challenges with you.</p>`,
      contactTitle: "Contact me:",
      contactSend: "Send",
      projectsTitle: "My projects",
    },
    ka: {
      aboutLink: "ჩემ შესახებ",
      projectsLink: "პროექტები",
      contactLink: "კონტაქტი",
      greeting: "გამარჯობა, მე ვარ ანა",
      profession: "Frontend დეველოპერი",
      cv: "ჩამოტვირთე CV",
      aboutTitle: "ჩემ შესახებ",
      aboutMe: `<p> მე ვარ შრომისმოყვარე, ტექნოლოგიებით გატაცებული ქალი ვებ დეველოპერი, პრობლემების გადაჭრის უნარით, მსურს გავარღვიო ბარიერები ტექნოლოგიების სამყაროში. ვამაყობ, რომ აქტიურად ვიღებდი მონაწილეობას პროგრამაში "500 ქალი ტექში", რამაც მომცა შესაძლებლობა გამეფართოებინა ჩემი შესაძლებლობები. </p>
      <p> ბოლო 5 თვის განმავლობაში მე მქონდა პრივილეგია მემუშავა "უნილაბში" სტაჟიორ - დეველოპერად, სადაც ვიყავი საინტერესო პროექტების ნაწილი ეს ყველაფერი კი დამეხმარა ჩემი ტექნიკური უნარების გაფართოებაში. </p> 
      <p> თუ თქვენ ეძებთ მონდომებულ და ენთუზიაზმით სავსე გუნდის წევრს, მზად ვარ თქვენთან ერთად ახალი შესაძლებლობებისა და გამოწვევების მისაღებად.</p> `,
      contactTitle: "კონტაქტი",
      contactSend: "გაგზავნა",
      projectsTitle: "ჩემი პროექტები",
    },
  };

  const elements = {
    "about-link": content[lang].aboutLink,
    "projects-link": content[lang].projectsLink,
    "contact-link": content[lang].contactLink,
    greeting: content[lang].greeting,
    profession: content[lang].profession,
    "download-cv-btn": content[lang].cv,
    "about-paragraph": content[lang].aboutMe,
    "about-title": content[lang].aboutTitle,
    "contact-title": content[lang].contactTitle,
    "contact-send": content[lang].contactSend,
    "projects-title": content[lang].projectsTitle,
  };

  for (const [id, text] of Object.entries(elements)) {
    const element = document.getElementById(id);
    if (element) {
      if (id === "about-paragraph") {
        element.innerHTML = text;
      } else if (id === "contact-send") {
        element.value = text;
      } else {
        element.textContent = text;
      }
    }
  }
}
