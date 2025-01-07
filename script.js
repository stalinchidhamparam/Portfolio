document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll(".nav-link");
    const content = document.getElementById("content");
    const menuBtn = document.getElementById('menu-btn');
    const nav = document.querySelector('.nav');

    const loadContent = (page) => {
        console.log(`Loading page: ${page}`);
        content.innerHTML = `<div class="loading"><i class="fa fa-spinner fa-spin"></i></div>`;
        
        setTimeout(() => {
            fetch(`content/${page}.html`)
                .then((response) => {
                    if (!response.ok) throw new Error("Page not found");
                    return response.text();
                })
                .then((html) => {
                    console.log("Page loaded successfully.");
                    content.innerHTML = html;
    
                    // Remove active class from all links
                    navLinks.forEach((link) => link.classList.remove("active"));
    
                    // Add active class to the correct link
                    const activeLink = document.querySelector(`[data-page="${page}"]`);
                    if (activeLink) {
                        activeLink.classList.add("active");
                    } else {
                        console.error(`Link with data-page="${page}" not found`);
                    }
                })
                .catch((err) => {
                    content.innerHTML = `<div class="error"><h1>Error</h1><p>${err.message}</p></div>`;
                    console.error(err);
                });
        }, 1000);
    };

    menuBtn.addEventListener('click', () => {
        nav.classList.toggle('show');
    });

    navLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const page = link.getAttribute("data-page");
            loadContent(page);

            if (nav.classList.contains('show')) {
                nav.classList.remove('show');
            }

        });
    });

    // Load default page
    loadContent("about");
});