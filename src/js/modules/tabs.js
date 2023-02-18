const tabs = (headerSelector, tabSelector, contentSelector, activeClass) => {

    const header = document.querySelector(headerSelector),
          tab = document.querySelectorAll(tabSelector),
          content = document.querySelectorAll(contentSelector);

    function hideTabConent() {
        content.forEach(item => {
            item.style.display = "none";
        });

        tab.forEach(item => {
            item.classList.remove(activeClass);
        })
    }

    function showTabConent(i = 0) {
        content[i].style.display = "block";
        tab[i].classList.add(activeClass);
    }

    hideTabConent();
    showTabConent(0);

    header.addEventListener('click', (e) => {
        const target = e.target;
        if (target &&
            (target.classList.contains(tabSelector.replace(/\./, '')) || 
        target.parentNode.classList.contains(tabSelector.replace(/\./, '')))) {
            tab.forEach((item, i) => {
                if (target == item || target.parentNode == item) {
                    hideTabConent();
                    showTabConent(i);
                }
            });
        }
    });

};

export default tabs;