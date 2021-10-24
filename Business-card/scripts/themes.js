function switchModes() {
    const switchButton = document.querySelector('.theme__button');
    switchButton.addEventListener('click', () => {
        let doc = document.documentElement;
        if (!doc.hasAttribute('attribute')) {
            doc.setAttribute('attribute', 'light');
        } else {
            doc.removeAttribute('attribute');
        }
    });
}

switchModes();