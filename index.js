const switchs = ['body', 'main', 'header__text', 'form__label', 'form__input', 'select__drpdwn', 'select__option', 'form__button', 'main__txt', 'main__txt_blue'];
const classesClick = ['select__drpdwn', 'select', 'select__selected', 'select__arrow', 'select__options', 'select__option']

const form = document.getElementById("form");

function toggleSelect(type) {
    const select = document.getElementById(`${type}`);
    const selectButton = document.getElementById(`select-arrow-${type}`);
    const optionsBlock = document.getElementById(`options-${type}`);
    const options = document.getElementsByName(`option-${type}`);
    const selected = document.getElementById(`selected-option-${type}`);

    options.forEach(e => {
        e.addEventListener("click", (e) => {
            optionsBlock.classList.remove("select__options_active");
            selectButton.classList.remove("select__arrow_active");
            selected.value = e.target.id;
        })
    })


    optionsBlock.classList.toggle("select__options_active");
    selectButton.classList.toggle("select__arrow_active");

}

function toggleTheme(theme) {
    if (theme === "Light") {
        for (let i = 0; i < switchs.length; i++) {
            const elements = document.getElementsByClassName(switchs[i]);
            Array.from(elements).forEach((e) => {
                e.classList.remove(`${switchs[i]}_dark`);
            })
        }
        document.getElementById("main-img").src = './images/under.svg';
    }
    else if (theme === "Dark") {
        for (let i = 0; i < switchs.length; i++) {
            const elements = document.getElementsByClassName(switchs[i]);
            Array.from(elements).forEach((e) => {
                e.classList.add(`${switchs[i]}_dark`);
            })
        }

        const elements = document.getElementsByClassName('main__txt_blue');
        Array.from(elements).forEach((e) => {
            e.classList.remove(`main__txt_dark`);
        })
        document.getElementById("main-img").src = './images/under_dark.svg';

    }
}

if (localStorage.getItem("themetestWork")) {
    if (localStorage.getItem("themetestWork") === "Light") {
        toggleTheme("Light")
        document.getElementById("Light").checked = true;
    }
    else {
        toggleTheme("Dark");
        document.getElementById("Dark").checked = true;
    }
}
else {
    localStorage.setItem("themetestWork", "Light");
}
// #######################################################


if (localStorage.getItem("datatestWork")) {
    const data = JSON.parse(localStorage.getItem("datatestWork"));

    document.getElementById("companyTitle").value = data.compTitle
    document.getElementById("selected-option-days").value = data.firstDay
    document.getElementById("selected-option-width").value = data.width
    document.getElementById("selected-option-homepage").value = data.homepage
    document.getElementById("indentSize").value = data.indentSize
    document.getElementById("fpart").value = data.personalCode[0]
    document.getElementById("spart").value = data.personalCode[1]
    document.getElementById("tpart").value = data.personalCode[2]
}


form.addEventListener("submit", (event) => {
    event.preventDefault();

    let theme;

    document.getElementsByName("themes").forEach((e) => {
        if (e.checked) {
            theme = e.value;
            localStorage.setItem("themetestWork", theme);
        }
    })

    const compTitle = document.getElementById("companyTitle").value;
    const firstDay = document.getElementById("selected-option-days").value;
    const width = document.getElementById("selected-option-width").value;
    const homepage = document.getElementById("selected-option-homepage").value;
    const indentSize = document.getElementById("indentSize").value;
    const personalCode = [document.getElementById("fpart").value, document.getElementById("spart").value, document.getElementById("tpart").value];
    const data = {
        compTitle, firstDay, width, homepage, indentSize, personalCode
    }
    localStorage.setItem("datatestWork", JSON.stringify(data));

    toggleTheme(theme)

})

document.addEventListener("click", (e) => {

    if (!classesClick.includes(e.target.classList[0])) {
        Array.from(document.getElementsByClassName("select__options")).forEach((e) => {
            e.classList.remove("select__options_active");
        })

        Array.from(document.getElementsByClassName("select__arrow")).forEach((e) => {
            e.classList.remove("select__arrow_active");
        })
    }
})