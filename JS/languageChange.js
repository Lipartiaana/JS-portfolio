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
      aboutMe: `<p> Hello, I am Ana — a hardworking and detail-oriented web developer with strong problem-solving skills. My goal is to break down barriers for women in the world of technology.</p> 
      <p> My interest in technology began in childhood because my family members were employed in the information technology field. However, I never considered becoming a programmer as my future profession. While studying at the Faculty of Psychology at <span> "Tbilisi State University"</span>, I realized that my relationship with technology was not just a hobby and that I needed to seriously try myself in this field. </p> 
      <p> I started learning through the free stages of <span>"Bitcamp's"</span> Front-End Development program, which captivated me. After that, I began studying independently on YouTube and Udemy. </p>
      <p> <i class="fa-solid fa-graduation-cap"></i> I was accepted into numerous funded programs: </p> 
      <ul> <li> - <span>"BTU" and "USAID" </span> - "500 Women in Tech". </li>  
      <li> - <span>"Harvard University"</span> - CS50x - Introduction to computer science" </li> 
      <li> - <span>"IsSoft"</span> - Front-End Development School" </li>
      <li> - <span>"Alte University"</span> - "Angular in Depth" </li> </ul>
      <h4> Work Experience </h4>
      <hr>
      <p> <i class="fa-solid fa-suitcase"></i> <span> Internship </span>- I first encountered real projects at Ilia University's Cyber Laboratory <span> "Unilab," </span> where I joined as an intern-developer. I was involved in interesting projects and gained experience working with a team, which helped me improve not only my technical skills but also my soft skills. </p> 
      <p> <i class="fa-solid fa-briefcase"></i> <span> Freelance </span> - Over the past year, I have actively worked on freelance projects, including collaborations with organizations such as <span> "Cherie" </span> coffee, <span> "Abasha Municipality"</span>, and the non-governmental organization  <span> "New Idea." </span> </p> `,
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
      aboutMe: `<p> გამარჯობა, მე ვარ ანა — შრომისმოყვარე და დეტალებზე ორიენტირებული ვებ დეველოპერი, პრობლემების გადაჭრის უნარით, ჩემი მიზანია ტექნოლოგიების სამყაროში ქალებისთვის ბარიერების დამსხვრევა.</p>
      <p> ჩემი დაინტერესება ტექნოლოგიებით ბავშვობიდან დაიწყო, რადგან ჩემი ოჯახის წევრები საინფორმაციო ტექნოლოგიების სფეროში იყვნენ დასაქმებულები, თუმცა ჩემს მომავალ პროფესიად პროგრამისტობას არ განვიხილავდი. <span>"თბილისის სახელმწიფო უნივერსიტეტი" </span>- ს ფსიქოლოგიის ფაკულტეტზე სწავლის დროს მივხვდი, რომ ტექნოლოგიებთან ჩემი ურთიერთობა მხოლოდ გატაცება არ იყო და სერიოზულად უნდა მეცადა ამ სფეროში თავი. </p> 
      <p> სწავლა <span>'Bitcamp'</span>- ის Front-end დეველოპმენტის უფასო ეტაპებით დავიწე, რამაც ძალიან გამიტაცა, ამის შემდეგ დავიწყე Youtube-ისა და Udemy - ის კურსების გავლა დამოუკიდებლად.</p>
      <p> <i class="fa-solid fa-graduation-cap"></i> მოვხვდი უამრავ დაფინანსებულ პროგრამაში, მათ შორის: </p>
      <ul> <li>  - <span>"BTU"</span> და <span>"USAID"</span> - "500 ქალი ტექში" </li> 
      <li> - <span>"Harvard University"</span> - CS50x - შესავალი კომპიუტერულ მეცნიერებებში</li> 
      <li> - <span> 'IsSoft'</span> - Frontend development school </li>
      <li> - <span>"ალტე უნივერსიტეტი" </span> - "Angular in Depth"</ul></p>
      <h4>სამუშაო გამოცდილება</h4>
      <hr>
      <p> <i class="fa-solid fa-suitcase"></i> <span> სტაჟირება </span> - რეალურ პროექტებთან შეხება პირველად ილიას უნივერსიტეტის კიბერლაბორატორია <span> "უნილაბში"</span> მომეცა, სადაც მოვხვდი სტაჟიორ - დეველოპერად/ ჩართული ვიყავი საინტერესო პროექტებში და გამოცდილება მივიღე გუნდთან მუშაობაში, რაც დამეხმარა არა მხოლოდ ტექნიკური არამედ Soft Skill-ების დახვეწაშიც.</p> 
      <p> <i class="fa-solid fa-briefcase"></i> <span> ფრილანსინგი </span> - ბოლო 1 წელია აქტიურად ვმუშაობ Freelance პროექტებზე, მათ შორის ისეთ ორგანიზაციებთან, როგორებიცაა: ყავა <span> "ჩერი" </span>, <span> "აბაშის მუნიციპალიტეტის მერია" </span> და არასამთავრობო ორგანიზაცია <span> "New Idea" </span>. </p> `,
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
