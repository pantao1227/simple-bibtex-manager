class mydialog {
    static show(txt_id) {
        var parentTag = document.getElementById(txt_id).parentElement;
        var dialog_element = document.getElementById(txt_id);
        dialog_element.style.display = 'block';
        var dialog_body = document.createElement('DIV');
        dialog_body.setAttribute('class', 'dialog-body');
        dialog_body.setAttribute('id', 'full-screen-dialog');
        var btn_close = document.createElement('BUTTON');
        btn_close.setAttribute('class', 'dialog-close-btn');
        btn_close.onclick = function () {
            dialog_element.style.display = 'none';
            parentTag.appendChild(dialog_element);
            document.querySelector('body').removeChild(this.parentElement);
        };
        dialog_body.appendChild(dialog_element);
        dialog_body.appendChild(document.createElement('HR'));
        dialog_body.appendChild(btn_close);
        document.querySelector('body').appendChild(dialog_body);
    }
    static prompt(title_txt, default_txt, callback) {
        var parentTag = document.querySelector('body');
        var dialog_element = document.createElement('DIV');
        var div_title = document.createElement('DIV');
        div_title.innerHTML = title_txt;
        div_title.setAttribute('name', 'title');
        var input_txt = document.createElement('INPUT');
        input_txt.setAttribute('type', 'text');
        input_txt.value = default_txt;
        dialog_element.appendChild(div_title);
        dialog_element.appendChild(input_txt);
        var div_btn_bar = document.createElement('DIV');
        div_btn_bar.setAttribute('class', 'dialog-button-bar');
        var btn_ok = document.createElement('BUTTON');
        var btn_cancel = document.createElement('BUTTON');
        var btn_close = document.createElement('BUTTON');
        btn_ok.onclick = function () {
            callback(input_txt.value);
            btn_close.click();
        }
        btn_cancel.onclick = function () {
            btn_close.click();
        }
        btn_ok.innerHTML = '确认';
        btn_cancel.innerHTML = '取消';
        dialog_element.appendChild(div_btn_bar);
        div_btn_bar.appendChild(btn_ok);
        div_btn_bar.appendChild(btn_cancel);
        var dialog_body = document.createElement('DIV');
        dialog_body.setAttribute('class', 'dialog-body');
        dialog_body.setAttribute('id', 'full-screen-dialog');
        var btn_close = document.createElement('BUTTON');
        btn_close.setAttribute('class', 'dialog-close-btn');
        btn_close.onclick = function () {
            parentTag.removeChild(dialog_body);
        }
        dialog_body.appendChild(dialog_element);
        dialog_body.appendChild(btn_close);
        parentTag.appendChild(dialog_body);
    }
    static prompt_multiline(title_txt, default_txt, callback) {
        var parentTag = document.querySelector('body');
        var dialog_element = document.createElement('DIV');
        var div_title = document.createElement('DIV');
        div_title.innerHTML = title_txt;
        div_title.setAttribute('name', 'title');
        var txt_area = document.createElement('TEXTAREA');
        txt_area.setAttribute('type', 'text');
        txt_area.value = default_txt;
        dialog_element.appendChild(div_title);
        dialog_element.appendChild(txt_area);
        var div_btn_bar = document.createElement('DIV');
        div_btn_bar.setAttribute('class', 'dialog-button-bar');
        var btn_ok = document.createElement('BUTTON');
        var btn_cancel = document.createElement('BUTTON');
        var btn_close = document.createElement('BUTTON');
        btn_ok.onclick = function () {
            callback(txt_area.value);
            btn_close.click();
        }
        btn_cancel.onclick = function () {
            btn_close.click();
        }
        btn_ok.innerHTML = '确认';
        btn_cancel.innerHTML = '取消';
        dialog_element.appendChild(div_btn_bar);
        div_btn_bar.appendChild(btn_ok);
        div_btn_bar.appendChild(btn_cancel);
        var dialog_body = document.createElement('DIV');
        dialog_body.setAttribute('class', 'dialog-body');
        dialog_body.setAttribute('id', 'full-screen-dialog');
        var btn_close = document.createElement('BUTTON');
        btn_close.setAttribute('class', 'dialog-close-btn');
        btn_close.onclick = function () {
            parentTag.removeChild(dialog_body);
        }
        dialog_body.appendChild(dialog_element);
        dialog_body.appendChild(btn_close);
        parentTag.appendChild(dialog_body);
    }
    static prompt_double(title_txt1, default_txt1, title_txt2, default_txt2, callback) {
        var parentTag = document.querySelector('body');
        var dialog_element = document.createElement('DIV');
        var div_title1 = document.createElement('DIV');
        div_title1.innerHTML = title_txt1;
        div_title1.setAttribute('name', 'title');
        var input_txt1 = document.createElement('INPUT');
        input_txt1.setAttribute('type', 'text');
        input_txt1.value = default_txt1;
        dialog_element.appendChild(div_title1);
        dialog_element.appendChild(input_txt1);
        // 第二个
        var div_title2 = document.createElement('DIV');
        div_title2.innerHTML = title_txt2;
        div_title2.setAttribute('name', 'title');
        var input_txt2 = document.createElement('INPUT');
        input_txt2.setAttribute('type', 'text');
        input_txt2.value = default_txt2;
        dialog_element.appendChild(div_title2);
        dialog_element.appendChild(input_txt2);
        var div_btn_bar = document.createElement('DIV');
        div_btn_bar.setAttribute('class', 'dialog-button-bar');
        var btn_ok = document.createElement('BUTTON');
        var btn_cancel = document.createElement('BUTTON');
        var btn_close = document.createElement('BUTTON');
        btn_ok.onclick = function () {
            callback(input_txt1.value, input_txt2.value);
            btn_close.click();
        }
        btn_cancel.onclick = function () {
            btn_close.click();
        }
        btn_ok.innerHTML = '确认';
        btn_cancel.innerHTML = '取消';
        dialog_element.appendChild(div_btn_bar);
        div_btn_bar.appendChild(btn_ok);
        div_btn_bar.appendChild(btn_cancel);
        var dialog_body = document.createElement('DIV');
        dialog_body.setAttribute('class', 'dialog-body');
        dialog_body.setAttribute('id', 'full-screen-dialog');
        var btn_close = document.createElement('BUTTON');
        btn_close.setAttribute('class', 'dialog-close-btn');
        btn_close.onclick = function () {
            parentTag.removeChild(dialog_body);
        }
        dialog_body.appendChild(dialog_element);
        dialog_body.appendChild(btn_close);
        parentTag.appendChild(dialog_body);
    }
}
