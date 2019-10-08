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


var classname = document.getElementsByClassName("djsuperadmin");
var content;
var editor_mode = 1
var patch_content_url = null;
var identifier = null;
/**
 * editor mode
 * 0 : bare editor, only a textare USE IT WITH CAUTION
 * 1 : full ckeditor editor
 * 2 : lite ckeditor editor (you can't use other than <strong> <b> <i> <u>)
 * 3 : breadcrumb editor
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
    if (this.parentNode.nodeName == "A") {
        event.stopPropagation();
        event.preventDefault();
    }
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
    if (element.getAttribute("data-mode") == 3) return getBreadcrumbContent(element);
    var attribute = element.getAttribute("data-djsa");
    var get_content_url = element.getAttribute("data-getcontenturl");
    patch_content_url = element.getAttribute("data-patchcontenturl");
    editor_mode = element.getAttribute("data-mode");
    var options = getOptions('GET');
    if (!get_content_url) {
        var url = "/djsuperadmin/contents/" + attribute + "/";
    } else {
        var url = get_content_url;
    }
    fetch(url, options).then(status).then(json).then(function (data) {
        content = data;
        buildModal(editor_mode);
    }).catch(function (error) {
        console.log('Request failed', error);
    });
};

var pushContent = (content_data, editor_mode, identifier) => {
    if (editor_mode == 3) return pushBreadcrumbContent(content_data);
    content.content = content_data;
    if (!patch_content_url) {
        var url = '/djsuperadmin/contents/' + content.id + '/';
    } else {
        var url = patch_content_url;
    }
    var options = getOptions('PATCH');
    options['body'] = JSON.stringify(content);
    fetch(url, options).then(status).then(json).then(function (data) {
        location.reload()
    }).catch(function (error) {
        console.log('Request failed', error);
    });
};

var getBreadcrumbContent = function(element) {
    identifier = element.getAttribute("data-djsa");
    var options = getOptions('GET');
    var url = "/djsuperadmin/breadcrumb_contents/" + identifier + "/";
    var options = getOptions('GET');
    fetch(url, options).then(status).then(json).then(function (data) {
        content = data;
        buildModal('3');
    }).catch(function (error) {
        console.log('Request failed', error);
    });
}

var pushBreadcrumbContent = (content_data) => {
    var url = '/djsuperadmin/breadcrumb_contents/' + identifier + '/';
    var options = getOptions('PATCH');
    console.log(content_data);
    options['body'] = JSON.stringify(content_data);
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
        case '3':
            editor = document.createElement("table");

            editor.createRow = function(content, url) {
                var deletebutton = document.createElement("button");
                deletebutton.className = "djsuperadmin-btn";
                deletebutton.innerHTML = "❌";
                deletebutton.onclick = function() {
                    this.parentNode.parentNode.parentNode.deleteRow(this.parentNode.parentNode.rowIndex);
                }

                var input = document.createElement("input");
                input.type = "text";
                var row = editor.insertRow();

                input.value = content;
                input.name = "content";
                input.placeholder = "Name";
                row.insertCell().appendChild(input);

                var input = input.cloneNode(true);
                input.value = url;
                input.name = "url";
                input.placeholder = "Relative URL";
                row.insertCell().appendChild(input);

                row.insertCell().appendChild(deletebutton);
            }

            var addbutton = document.createElement("button");
            addbutton.innerHTML = "➕";
            addbutton.className = "djsuperadmin-btn";
            addbutton.onclick = function() {
                editor.createRow("","");
            }

            editor.createCaption().appendChild(addbutton);
            for (var i = 0; i < content.length; i++) {
                editor.createRow(content[i].content, content[i].url);
            }
            container.appendChild(editor);

            editor_content = () => {
                var data = []

                for (var i = 1; i <= editor.rows.length; i++) {
                    var b_item = {};

                    Array.prototype.forEach.call(editor.rows[i-1].cells, cell => {
                        var input = cell.querySelector("input");
                        if (input) {
                            if (input.name == "url" && !input.value.startsWith("/") && input.value != "" && !input.value.startsWith("http")) input.value = "/" + input.value;
                            b_item[input.name] = input.value;
                        }
                    });
                    b_item['position'] = i;

                    data.push(b_item);
                }

                return data;
            }
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
        pushContent(editor_content(), editor_mode)
    }, false);
    btnCancel.addEventListener('click',function () {
        background.remove()
    }, false);
};

for (var i = 0; i < classname.length; i++) {
    classname[i].addEventListener('click', handleClick, false);
    classname[i].parentNode.classList.add('djsuperadmin-content')
}
