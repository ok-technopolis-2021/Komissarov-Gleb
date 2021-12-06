const MAX_COUNT = 6;
let currentCount = 0;
let table;

class Skill {

    constructor(percents, title) {
        this.percents = percents;
        this.title = title;
    }

    render(target) {
        const block = document.createElement('div');
        const current = document.createElement('progress');
        const currentTitle = document.createElement('span');
        const but = document.createElement('button');

        but.addEventListener('click', function () {
            if (--currentCount <= 0) {
                currentCount = 0;
                const deletedDiv = document.createElement('div');
                const deletedHOne = document.createElement('h1');
                const deletedHThree = document.createElement('h3');

                target.removeChild(table);

                deletedHOne.innerText = 'Gleb Komissarov';
                deletedHOne.className = "right-info__name-employee";
                deletedHThree.innerText = 'System Programmer & Java Developer';
                deletedHThree.className = "right-info__position-employee";
                deletedDiv.className = "right-info";
                deletedDiv.id = "changePart";

                deletedDiv.appendChild(deletedHOne);
                deletedDiv.appendChild(deletedHThree);
                target.appendChild(deletedDiv);
            }
            target.removeChild(block);
        });

        but.className = 'delete__button';
        block.className = 'block-skills';
        current.className = 'progress-bar';
        currentTitle.className = 'skill-title';
        currentTitle.innerText = this.title + " " + this.percents + "%";
        current.setAttribute('value', this.percents);
        current.setAttribute('max', "100");

        block.appendChild(current);
        block.appendChild(currentTitle);
        block.appendChild(but);
        target.appendChild(block);
    }
}


const switchButton = document.querySelector('.theme__button');
switchButton.addEventListener('click', () => {
    let doc = document.documentElement;
    if (!doc.hasAttribute('attribute')) {
        doc.setAttribute('attribute', 'light');
    } else {
        doc.removeAttribute('attribute');
    }
});

const addButton = document.querySelector('.skills__button');
addButton.addEventListener('click', (qualifiedName, value) => {
    const place = document.querySelector('.right-part');
    let newSkill;

    if (currentCount === 0) {
        const element = document.getElementById("changePart");
        element.parentNode.removeChild(element);

        newSkill = new Skill("70", "Java");
        newSkill.render(place);
        newSkill = new Skill("70", "С++");
        newSkill.render(place);
        newSkill = new Skill("50", "Suomi");
        newSkill.render(place);
        currentCount += 3;

        table = document.createElement('form');
        table.setAttribute('onsubmit', "return false;");
        table.className = 'skill__table';

        const submitSkill = document.createElement('input');
        submitSkill.innerText = 'skill';
        submitSkill.className = 'skill__input'
        submitSkill.setAttribute('placeholder', "Enter skill");
        submitSkill.name = 'skills'
        submitSkill.setAttribute('maxlength', "15");

        const submitPercent = document.createElement('input');
        submitPercent.innerText = 'percents';
        submitPercent.className = 'percents__input';
        submitPercent.name = 'percents';
        submitPercent.setAttribute('placeholder', "Enter proficiency level ");
        submitPercent.setAttribute('max', "100");
        submitPercent.setAttribute('maxlength', "3");

        const subBut = document.createElement('button');
        subBut.setAttribute('type', "submit");
        subBut.className = 'sub__button';

        table.addEventListener('submit', function () {
            if (currentCount === MAX_COUNT) {
                alert("Добавить можно только 6 элементов!");
                return;
            }
            let data = new FormData(table);
            if (data.get("skills") !== "" && data.get("percents") !== "") {
                const value = data.get("percents");
                if (value >= 0 && value <= 100) {
                    newSkill = new Skill(value, data.get("skills"));
                    newSkill.render(place);
                    currentCount++;
                }
            }
        });

        table.appendChild(subBut);
        table.appendChild(submitSkill);
        table.appendChild(submitPercent);
        place.appendChild(table);
    }
});
