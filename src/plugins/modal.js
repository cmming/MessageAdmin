import Vue from 'vue'

var base = function () {
    this.append = function (elems, html) {
        var elemsHtml = elems.innerHTML;
        elems.innerHTML += html;
    },
    this.remove = function (elems) {
        elems.parentNode.removeChild(elems);
    },
    this.hide = function (elems) {
        elems.style.display='none';
    },
    this.getEleById=function(id){
        return document.getElementById(id);
    },
    this.on=function(elems,events,handleFun,type){
        if(elems.addEventListener){
            elems.addEventListener(events,events,type);
        }else if(element.attachEvent){
            elems.attachEvent("on"+events, handleFun);
        }else{
            element["on"+eType] = null;
        }
    },
    this.off=function(element, eType, handle, bol) {
        if(element.addEventListener){
            element.removeEventListener(eType, handle, bol);
        }else if(element.attachEvent){
            element.detachEvent("on"+eType, handle);
        }else{
            element["on"+eType] = null;
        }
    }
};

export default {
    install(Vue, options) {
        Vue.prototype.$bootModal = function (val) {
            //向body 内部添加一个dom
            var html = `<div class="modal fade in block" id="myModal">
                            <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <button type="button" id="closeSign" class="close" data-dismiss="modal" aria-hidden="true">
                                    ×
                                    </button>
                                    <h4 class="modal-title" id="myModalLabel">
                                        `+ val.title + `
                                    </h4>
                                </div>
                                <div class="modal-body">
                                    `+ val.innerHTML + `
                                </div>
                                <div class="modal-footer">
                                    <button type="button" id="closeModal" class="btn btn-default">关闭
                                </button>
                                    <button type="button" id="submitModal" class="btn btn-primary">
                                    提交更改
                                </button>
                                </div>
                            </div>
                            <!-- /.modal-content -->
                        </div>`;
            var useBase = new base();
            useBase.append(document.getElementsByTagName('body')[0], html);
            var closeBtn=useBase.getEleById('closeModal');
            var myModal=useBase.getEleById('myModal');
            var submitBtn=useBase.getEleById('submitModal');
            var closeSign=useBase.getEleById('closeSign');
            closeBtn.addEventListener('click',function(){
               useBase.remove(myModal);
            });
            closeSign.addEventListener('click',function(){
               useBase.remove(myModal);
            });
            submitBtn.addEventListener('click',function(){
               useBase.remove(myModal);
            });
        }
    }
}

