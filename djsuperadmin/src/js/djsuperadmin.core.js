import { initCKEditor } from './djsuperadmin.ckeditor'


var getCookie = (name) => {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
};

var status = (response) => {
    if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response)
    } else {
        return Promise.reject(new Error(response.statusText))
    }
};

var json = (response) => {
    return response.json()
};

const csrftoken = getCookie('csrftoken');


var logout_link_button = document.createElement('a');
logout_link_button.innerHTML = 'LOGOUT';
logout_link_button.href = djsa_logout_url;
logout_link_button.classList.add("djsuperadmin-logout");
document.body.appendChild(logout_link_button);


var classname = document.getElementsByClassName("djsuperadmin");
var content;
var editor_mode = 1
/**
 * editor mode
 * 0 : bare editor, only a textare USE IT WITH CAUTION
 * 1 : full ckeditor editor
 * 2 : lite ckeditor editor (you can't use other than <strong> <b> <i> <u>)
 */
var isTokenNeeded = (method) => {
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}

var getOptions = (req_method) => {
    let opt = {}
    opt['method'] = req_method;
    opt['headers'] = {};
    opt['headers']['Content-Type'] = 'application/json';
    if (!isTokenNeeded(req_method)) {
        opt['headers']["X-CSRFToken"] = csrftoken;
    }
    return opt;
}

var handleClick = function (event) {
    event.stopPropagation();
    event.preventDefault();
    var element = this
    clearTimeout(this.clickTimeout);
    this.clickTimeout = setTimeout(function () {
        if (event.detail == 2) {
            getContent(element)
        } else {
            event.target.parentNode.click()
        }
    }, 200);

}

var getContent = function (element) {
    var attribute = element.getAttribute("data-djsa");
    editor_mode = element.getAttribute("data-mode");
    var options = getOptions('GET');
    var url = "/djsuperadmin/contents/" + attribute + "/";
    fetch(url, options).then(status).then(json).then(function (data) {
        content = data;
        buildModal(editor_mode);
    }).catch(function (error) {
        console.log('Request failed', error);
    });
};

var pushContent = (htmlcontent) => {
    content.content = htmlcontent;
    var url = '/djsuperadmin/contents/' + content.id + '/';
    var options = getOptions('PATCH');
    options['body'] = JSON.stringify(content);
    fetch(url, options).then(status).then(json).then(function (data) {
        location.reload()
    }).catch(function (error) {
        console.log('Request failed', error);
    });
};

var buildModal = (editor_mode = editor_mode) => {
    var background = document.createElement('div');
    var container = document.createElement('div');
    var btnSave = document.createElement("button");
    var btnCancel = document.createElement("button");

    btnSave.innerHTML = '💾';
    btnSave.classList.add('djsuperadmin-btn');
    btnCancel.innerHTML = '❌';
    btnCancel.classList.add('djsuperadmin-btn');

    background.classList.add("djsuperadmin-background");
    container.classList.add("djsuperadmin-editor");

    background.appendChild(container);
    document.body.appendChild(background);
    var editor = null;
    var editor_content = null;
    switch (editor_mode) {
        case '0':
            editor = document.createElement("textarea");
            editor.value = content.content;
            editor.className = "raw-editor";
            editor_content = () => { return editor.value }
            container.appendChild(editor);

            break;
        case '2':
            // code block
            break;
        default:
            editor = document.createElement('div');
            editor.id = 'editor';
            container.appendChild(editor);
            initCKEditor();
            editor = CKEDITOR.document.getById( 'editor' );
            editor.setHtml(content.content)
            editor_content = () => {
                return CKEDITOR.instances.editor.getData();
            }
    }
    var btnsContainer = document.createElement('div');
    btnsContainer.classList.add('djsuperadmin-btnscontainer');
    btnsContainer.appendChild(btnSave);
    btnsContainer.appendChild(btnCancel);
    container.appendChild(btnsContainer);
    btnSave.addEventListener('click', function () {
        pushContent(editor_content())
    }, false);
    btnCancel.addEventListener('click',function () {
        background.remove()
    }, false);
};

for (var i = 0; i < classname.length; i++) {
    classname[i].addEventListener('click', handleClick, false);
    classname[i].parentNode.classList.add('djsuperadmin-content')
}
