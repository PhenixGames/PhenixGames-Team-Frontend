import { uuid } from 'vue-uuid';

export default class Errormessage {
    /**
     * 
     * @param {String} message 
     * @param {Number} type 
     *    0 = Warning
     *    1 = Error
     *    2 = Message
    */
    constructor(message, type) {
        this.message = message;
        this.type = type;
    }
    mountError() {
        let newDiv = document.createElement('div');
        newDiv.style.transform = 'translateX(500px)';
        newDiv.style.opacity = 0;
        setTimeout(() => {
            newDiv.style.transform = 'translateX(0)';
            newDiv.style.opacity = 1;
        }, 10);

        let divClass;
        let newHeaderText;
        if(this.type == "0") {
            divClass = 'warn_message';
            newHeaderText = 'Warning!';
        }else if(this.type == "1") {
            divClass = 'error_message';
            newHeaderText = 'Error!'
        }else {
            newHeaderText = 'Information!'
            divClass = 'general_message';
        }

        newDiv.classList.add(divClass, 'err');
        newDiv.id = uuid.v1();

        let newHeader = document.createElement('p')
        newHeader.innerHTML = newHeaderText;
        
        let newSpan = document.createElement('span');
        newSpan.innerHTML = this.message

        setTimeout(() => {
            document.getElementById(newDiv.id).style.transform = 'translateX(20%)'
            document.getElementById(newDiv.id).style.opacity = 0
            setTimeout(() => {
                document.getElementById(newDiv.id).remove(); 
            }, 650);
        }, (document.querySelectorAll('.err').length + 4) +'000');

        newDiv.append(newHeader, newSpan);
        document.getElementById('err_div').appendChild(newDiv)
    }
}