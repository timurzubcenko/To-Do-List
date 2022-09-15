const input = document.querySelector('input')
const items = document.querySelector('.items')
const btn = document.querySelector('#btn')
const btnClear = document.querySelector('#btn-clear')
const emptyList = document.querySelector('.emptyList')

//Добавление Задачи
input.addEventListener('keydown', addTask)
btn.addEventListener('click', addTaskforClick)

btnClear.addEventListener('click', () => {
    items.innerHTML = ``
    emptyList.classList.remove('hidden')
})

//Выполнение Задачи
items.addEventListener('click', doneTask)

//Удаление Задачи
items.addEventListener('click', deleteTask)

if (localStorage.getItem('itemsHTML')) {
    items.innerHTML = localStorage.getItem('itemsHTML')
}

if (items.children.length > 0) {
    emptyList.classList.add('hidden')
} else {
    emptyList.classList.remove('hidden')
}

function addTask(event) {
    if (event.keyCode === 13) {

        const taskText = `
                <div class="item">
                    <p>${input.value}</p>
                    <div class="btns">
                        <div class="btn_done" data-action="done">
                            <i class="bi bi-check-lg"></i>
                        </div>
                        <div class="btn_delete" data-action="delete">
                            <i class="bi bi-x"></i>
                        </div>
                    </div>
                </div>
        `

        items.insertAdjacentHTML('beforeend', taskText)

        //Clear input
        input.value = ""
    }

    saveHTMLToLS()
}

function addTaskforClick(event) {
    const taskText = `
            <div class="item">
                <p>${input.value}</p>
                <div class="btns">
                    <div class="btn_done">
                        <i class="bi bi-check-lg"></i>
                    </div>
                    <div class="btn_delete">
                        <i class="bi bi-x"></i>
                    </div>
                </div>
            </div>
        `

    items.insertAdjacentHTML('beforeend', taskText)

    //Clear input
    input.value = ""
    input.focus()

    saveHTMLToLS()
}

function deleteTask(event) {
    if (event.target.dataset.action !== 'delete') return;

    const perentNode = event.target.closest('.item')
    perentNode.remove()

    saveHTMLToLS()
}

function doneTask(event) {
    if (event.target.dataset.action === 'done') {
        const perentNode = event.target.closest('.item')
        const taskTitle = perentNode.querySelector('p')

        taskTitle.classList.toggle('done')
    }
    saveHTMLToLS()
}

function saveHTMLToLS() {
    localStorage.setItem('itemsHTML', items.innerHTML)
}
