import checkNumInputs from './checkNumInputs';

"use strict";

const forms = (state) => {

    const form = document.querySelectorAll('form'),
          input = document.querySelectorAll('input');


    checkNumInputs('input[name="user_phone');

    const message = {
        loading: 'Загрузка',
        success: 'Спасибо! Скоро мы свяжемся с вами',
        failure: 'Что-то пошло не так...'
    };

    const postData = async (url, data) => {
        document.querySelector('.status').textContent = message.loading;
        let res = await fetch(url, {
            method: "POST",
            body: data
        });

        return await res.text();
    };

    const clearInputs = () => {
        input.forEach(item => {
            item.value = '';
        });
    }
    
    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            item.appendChild(statusMessage);
            const formData = new FormData(item);
            if (item.getAttribute('data-calc') === 'end') {
                for (let key in state) {
                    formData.append(key, state[key]);
                }
            }

            postData('assets/server.php', formData)
                .then(res => {
                    console.log(res);
                    statusMessage.textContent = message.success;
                })
                .catch(() => {
                    statusMessage.textContent = message.failure;
                })
                .finally(() => {
                    for (let key in state) {
                        delete state[key];
                    }
                    setTimeout(() => {
                        statusMessage.remove();
                    }, 3000);
                    setTimeout(() => {
                       const windows = document.querySelectorAll('[data-modal]');
                       windows.forEach(item => {
                       item.style.display = "none";
                    });
                    document.body.style.overflow = "";
                    clearInputs();
                    }, 3000);
                });

        });
    });

};

export default forms;