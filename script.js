var form = document.getElementById('submission-form');
var todoItems = document.getElementById('todo-items');
var filter = document.getElementById('filter-items');
var listItems = todoItems.getElementsByTagName('li');
var emptyButton = document.getElementById('empty-btn');

// handle submission
form.addEventListener('submit', addTask);

// handle deletes
todoItems.addEventListener('click', deleteItem);

// handle filters
filter.addEventListener('keyup', (e) => {
    // get text from filter element
    let text = filter.value.toLowerCase();

    // get list of HTML items
    let items = todoItems.getElementsByTagName('li');

    const itemsArr = Array.from(items);

    // filter items, do not show the task
    itemsArr.forEach((item) => {
        let itemTitle = item.firstChild.textContent.toLowerCase();
        if (itemTitle.match(text)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
});

emptyButton.addEventListener('click', (e) => {
    while (listItems.length > 0) {
        todoItems.removeChild(listItems[0]);
    }

    checkList();
});

function buildItem(task) {
    let li = document.createElement('li');
    li.className = 'list-group-item';

    // add task to the list node
    li.appendChild(document.createTextNode(task));

    let deleteButton = document.createElement('button');
    deleteButton.className = 'btn btn-info float-end delete';
    deleteButton.appendChild(document.createTextNode('Delete'));

    li.appendChild(deleteButton);

    todoItems.appendChild(li);
}

function clearTextInput() {
    document.getElementById('task').value = '';
}

function addTask(e) {
    e.preventDefault();

    let task = document.getElementById('task').value;

    if (task === '') {
        console.log("Please enter a task.\n");
        return;
    }

    buildItem(task);

    clearTextInput();

    document.getElementById('no-items').remove;

    checkList();
}

function deleteItem(e) {
    if (e.target.classList.contains('delete')) {
        let li = e.target.parentElement;
        todoItems.removeChild(li);
    }

    checkList();
}

function checkList() {
    if (listItems.length === 0 && !document.getElementById('no-items')) {
        let noItems = document.createElement('h4');
        noItems.setAttribute('id', 'no-items');
        noItems.classList.add('text-center');
        noItems.innerText = 'Nothing to do, woohoo!';
        todoItems.appendChild(noItems);
    } else {
        let noItems = document.getElementById('no-items');
        if (noItems && listItems.length > 0) {
            noItems.remove();
        }
    }
}

// initial check
checkList();