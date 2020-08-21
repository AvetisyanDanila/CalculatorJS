let calculatorInput = document.querySelector('.calculator__input');
let calculatorOperationsItem = document.querySelectorAll('.calculator-operations__item');
let output = 0;

// Анимация нажатия кнопки
function clickAnimation(elem) {
    elem.style.animation = 'click 0.3s';
    setTimeout(() => {
        elem.style.animation = 'none';
    }, 300);
}

calculatorOperationsItem.forEach(element => {
    element.addEventListener("click", () => {
        // Чтобы можно было вводить числа до 1(например 0.1)
        if (calculatorInput.value == '0.') {
            calculatorInput.value = '0.';
        }
        // Чтобы при вводе чисел изначальный ноль убирался
        else if (calculatorInput.value == '0') {
            calculatorInput.value = '';
        }
        // Возвращение стилей при выведении надписили про деление на ноль и обнуление строки вывода
        else if (calculatorInput.value == 'Деление на ноль невозможно') {
            calculatorInput.value = '';
            calculatorInput.style.fontSize = '56px';
        }
        // перевод строки вывода в массив
        let str = calculatorInput.value.split('');
        // метка для того, чтобы работал break в условиях
        label:
            switch (element.value) {
                case '=':
                    output = eval(calculatorInput.value);
                    if (output == 'Infinity') {
                        calculatorInput.style.fontSize = '18px';
                        output = 'Деление на ноль невозможно';
                    }
                    else if (output == '-Infinity') {
                        calculatorInput.style.fontSize = '18px';
                        output = 'Деление на ноль невозможно';
                    }
                    else if (output == undefined) {
                        output = 0;
                    }
                    calculatorInput.value = output;
                    break;
                case 'AC':
                    calculatorInput.value = 0;
                    break;
                case '.':
                    for (let i = 0; i < str.length; i++) {
                        // Если в строке присутствует +,-,*,/ и не в конце, то добавить точку к строку
                        if (str[i] == '+' && str[str.length - 1] != '+' && str[str.length - 1] == '.') {
                            calculatorInput.value = calculatorInput.value + '.';
                            break label;
                        }
                        if (str[i] == '-' && str[str.length - 1] != '-' && str[str.length - 1] == '.') {
                            calculatorInput.value = calculatorInput.value + '.';
                            break label;
                        }
                        if (str[i] == '*' && str[str.length - 1] != '*' && str[str.length - 1] == '.') {
                            calculatorInput.value = calculatorInput.value + '.';
                            break label;
                        }
                        if (str[i] == '/' && str[str.length - 1] != '/' && str[str.length - 1] == '.') {
                            calculatorInput.value = calculatorInput.value + '.';
                            break label;
                        }
                        // если в конце строки стоит точка, не добавлять её снова
                        else if (str[str.length - 1] == '.') {
                            break label;
                        }
                        // если юзер поставить точку после +,-,*,/, то она заменится на 0.
                        else if (str[str.length - 1] == '-' || str[str.length - 1] == '+' || 
                                 str[str.length - 1] == '*' || str[str.length - 1] == '/') {
                            calculatorInput.value = calculatorInput.value + '0.';
                            break label;
                        }
                    }
                    for (let i = 0; i < str.length; i++) {
                        // если точка стоит и она не в конце, то не добавлять ей, чтобы не получилось 0.2.2
                        if (str[i] == '.' && str[str.length - 1] != '.') {
                            break label;
                        }
                        // если в конце строки стоит точка, не добавлять её снова 
                        // else if (str[str.length - 1] == '.') {
                        //     break label;
                        // }
                    }
                    if (calculatorInput.value == '') {
                        calculatorInput.value = 0;
                    }
                    calculatorInput.value = calculatorInput.value + '.';
                    /*  
                        установить фокус в инпуте к конец, если пользователь вводит цифры через кнопки на сайте и 
                        кончилось видимая часть в инпуте.(Далее по коду встречается аналогичная запись).
                    */
                    calculatorInput.focus();
                    calculatorInput.selectionStart = calculatorInput.value.length;
                    break;
                case '+':
                    if (calculatorInput.value == '') {
                        calculatorInput.value = '0';
                    }
                    /*  
                        если в конце строки стоит знак, отличный от нажатого, то знак, который стоял удалится, а тот, 
                        на который нажали - добавится.(Далее по коду встречается аналогичная запись).
                    */
                    if (str[str.length - 1] == '-' || str[str.length - 1] == '*' || str[str.length - 1] == '/') {
                        str.pop();
                        str.push('+');
                        output = str.join('');
                        calculatorInput.value = output;
                        break label;
                    }
                    for (let i = 0; i < str.length; i++) {
                        /* 
                            если в конце стоит знак, совпадающий с нажатым, 
                            то он не добавится.(Далее по коду встречается аналогичная запись).
                        */
                        if (str[str.length - 1] == '+') {
                            break label;
                        }
                        /* 
                            если в конце стоит точка, то текущая запись посчитается и 
                            в конец добавится знак, на который нажали.(Далее по коду встречается аналогичная запись).
                        */
                        else if (str[str.length - 1] == '.') {
                            output = eval(calculatorInput.value);
                            calculatorInput.value = output;
                        }
                    }
                    calculatorInput.value += '+';
                    calculatorInput.focus();
                    calculatorInput.selectionStart = calculatorInput.value.length;
                    break;
                case '-':
                    if (calculatorInput.value == '') {
                        calculatorInput.value = '0';
                    }
                    if (str[str.length - 1] == '+' || str[str.length - 1] == '*' || str[str.length - 1] == '/') {
                        str.pop();
                        str.push('-');
                        output = str.join('');
                        calculatorInput.value = output;
                        break label;
                    }
                    for (let i = 0; i < str.length; i++) {
                        if (str[str.length - 1] == '-') {
                            break label;
                        }
                        else if (str[str.length - 1] == '.') {
                            output = eval(calculatorInput.value);
                            calculatorInput.value = output;
                        }
                    }
                    calculatorInput.value += '-';
                    calculatorInput.focus();
                    calculatorInput.selectionStart = calculatorInput.value.length;
                    break;
                case '*':
                    if (calculatorInput.value == '') {
                        calculatorInput.value = '0';
                    }
                    if (str[str.length - 1] == '-' || str[str.length - 1] == '+' || str[str.length - 1] == '/') {
                        str.pop();
                        str.push('*');
                        output = str.join('');
                        calculatorInput.value = output;
                        break label;
                    }
                    for (let i = 0; i < str.length; i++) {
                        if (str[str.length - 1] == '*') {
                            break label;
                        }
                        else if (str[str.length - 1] == '.') {
                            output = eval(calculatorInput.value);
                            calculatorInput.value = output;
                        }
                    }
                    calculatorInput.value += '*';
                    calculatorInput.focus();
                    calculatorInput.selectionStart = calculatorInput.value.length;
                    break;
                case '/':
                    if (calculatorInput.value == '') {
                        calculatorInput.value = '0';
                    }
                    if (str[str.length - 1] == '-' || str[str.length - 1] == '*' || str[str.length - 1] == '+') {
                        str.pop();
                        str.push('/');
                        output = str.join('');
                        calculatorInput.value = output;
                        break label;
                    }
                    for (let i = 0; i < str.length; i++) {
                        if (str[str.length - 1] == '/') {
                            break label;
                        }
                        else if (str[str.length - 1] == '.') {
                            output = eval(calculatorInput.value);
                            calculatorInput.value = output;
                        }
                    }
                    calculatorInput.value += '/';
                    calculatorInput.focus();
                    calculatorInput.selectionStart = calculatorInput.value.length;
                    break;
                default:
                    calculatorInput.value += element.value;
                    calculatorInput.focus();
                    calculatorInput.selectionStart = calculatorInput.value.length;
                    break;
            }
        // Анимация нажатия кнопки
        clickAnimation(element);
    });
});