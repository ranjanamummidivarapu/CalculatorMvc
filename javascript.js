/**
 * Created by ranjanam on 17-Dec-14.
 */

/*function divModel() {
    var divElement;
    initDivModel = function () {

        divElement = document.createElement("div");
        return divElement;
    }
    return initDivModel();
}
function buttonModel(value, model, viewScope) {
    var btn;

    initButtonModel = function() {
        btn = document.createElement("button");
        btn.value = value;
        btn.appendChild(document.createTextNode(value));
        btn.onclick = function () {
            Controller(this, model, viewScope);
        }
        return btn;
    }
    return initButtonModel();
}


function generateButtonsAndAppend(numbersDiv,model, viewScope) {
    var numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],index = 0,button;
    initGenerate = function() {
        while (index < numbers.length) {
            button = buttonModel(numbers[index],model, viewScope);
            numbersDiv.appendChild(button);
            index++;
        }
    }
    initGenerate();
}
function generateOperatorsAndAppend(operatorsDiv, model, viewScope) {
    var operators = ["+", "-", "*", "/", "B", "C", "="], index = 0, button;
    initGenerate = function() {
        while (index < operators.length) {
            button = buttonModel(operators[index],model, viewScope);
            operatorsDiv.appendChild(button);
            index++;
        }
    }
    initGenerate();
}*/
model = function () {
    var input = 0, result = 0, operator = "";
    this.getInput = function () {
        return input;
    }
    this.setInput = function(receivedInput){
        input = receivedInput;
    }
    this.getResult = function(){
        return result;
    }
    this.setResult = function(receivedResult){
        result = receivedResult;
    }
    this.getOperator = function(){
        return operator;
    }
    this.setOperator = function(receivedOperator){
        operator = receivedOperator;
    }
}
htmlElementModel = function(type, value) {
    this.type = type;
    this.value = value;
}
view = function(){
    this.textbox = function(name, value){
        var textbox;
        textbox = document.createElement("input");
        textbox.type = "text";
        textbox.value = value;
        document.getElementById(name).appendChild(textbox);
        return textbox;
    }
    this.buttons = function(model, div, id) {
        var button;
        button = document.createElement("input");
        button.type = model.type;
        button.value = model.value;
        button.id = id+model.value;
        button.appendChild(document.createTextNode(model.value));
        div.appendChild(button);
        return button;
    }
    this.div = function(divName){
        var div;
        div = document.createElement("div");
        return div;
    }
    this.append = function(div, element){
        div.appendChild(element);
    }
    this.getElement = function(name){
        return document.getElementById(name);
    }
}
function Controller(name){
    var modelObject, viewObject, controllerScope = this,textbox;
    modelObject = new model();
    viewObject = new view();
    this.init = function (){
        var  index = 0,mainDiv, numberDiv, operatorDiv, numberButton, operatorButton, htmlElementObject, initialTextboxValue = 0, numberValues = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], operatorValues = ["+", "-", "*", "/","1/x", "=","B", "C"];
        mainDiv = viewObject.getElement(name);
        textbox = viewObject.textbox(name, initialTextboxValue);
        numberDiv = viewObject.div();
        while(index < numberValues.length) {
            htmlElementObject = new htmlElementModel("button",numberValues[index]);
            numberButton = viewObject.buttons(htmlElementObject, numberDiv,"number");
            numberButton.onclick = function(){controllerScope.append(this.value);}
            index++;
        }
        index = 0;
        operatorDiv = viewObject.div();
        while(index < operatorValues.length){
            htmlElementObject = new htmlElementModel("button",operatorValues[index]);
            operatorButton = viewObject.buttons(htmlElementObject, operatorDiv,"operator");
            operatorButton.onclick = function(){controllerScope.compute(this.value);}
            index++;
        }
        viewObject.append(mainDiv,textbox);
        viewObject.append(mainDiv, numberDiv);
        viewObject.append(mainDiv, operatorDiv);
        return textbox;
    }
    this.append = function(value){
        var input = modelObject.getInput();
        if(input === 0 ){
            input = value;
        }
        else
        {
            input += value;
        }
        textbox.value = input;
        modelObject.setInput(input);
    }
    this.compute = function(buttonValue){
        var input, result, value, inputText, length, operator, operand, textboxValue;
        value = buttonValue;
        input = modelObject.getInput();
        result = modelObject.getResult();
        operator = modelObject.getOperator();
        textboxValue = textbox.value;
        if(value === "C"){
            input = 0;
            result = 0;
            textbox.value = input;
        }
        else if(value === "B"){
            input = textboxValue;
            inputText = input.toString();
            length = inputText.length;
            inputText = inputText.substring(0, length - 1);
            input = Number(inputText);
            if(input === 0 ) {
                result = 0;
            }
            textbox.value = input;
        }
        else {
            length = input.length;
            if(value === "1/x") {
                if(result !== 0) {
                    result = 1 / result;
                    input = 0;
                }
                else
                {
                    result = input;
                    result = 1 / result;
                    input = 0;
                }
                operator = "";
                textbox.value = input;
            }
            else if(result === 0 ) {
                result = Number(input);
                operator = value;
            }
            else
            {
                operand = Number(input);
                switch (operator) {
                    case '+':result += operand;
                        break;
                    case '-':result -= operand;
                        break;
                    case '*':result *= operand;
                        break;
                    case '/':result /= operand;
                        break;
                }
                operator = value;
            }
            if(operator !== "")
                input = 0;
            textbox.value = new String(result);
            //alert(new String(result));
        }
        modelObject.setInput(input);
        modelObject.setResult(result);
        modelObject.setOperator(operator);
    }
    textbox = controllerScope.init();
   /*var input, result, value, inputText, length, operator, operand, textbox, textboxValue;
    value = htmlElement.value;
    input = model.getInput();
    result = model.getResult();
    operator = model.getOperator();
    textbox = viewScope.textbox;
    textboxValue = textbox.value;
    if(value>=0&&value<=9){
        if (input !== 0) {
            input = input + value;
        }
        else {             //if initially 0 is pressed
            input = value;
        }
        textbox.value = input;
    }
    else if(value === "B"){
        input = textboxValue;
        inputText = input.toString();
        length = inputText.length;
        inputText = inputText.substring(0, length - 1);
        input = Number(inputText);
        if(input === 0 ) {
            result = 0;
        }
        textbox.value = input;
    }
    else if(value === "C"){
        input = 0;
        result = 0;
        textbox.value = input;
    }
    else {
        length = input.length;
        if(result === 0) {
            result = Number(input);
            operator = value;
        }
        else
        {
            operand = Number(input);
            switch (operator) {
                case '+':result += operand;
                    break;
                case '-':result -= operand;
                    break;
                case '*':result *= operand;
                    break;
                case '/':result /= operand;
                    break;
            }
            operator = value;
        }
        if(operator !== "")
            input = 0;
        textbox.value = result;
    }
    model.setInput(input);
    model.setResult(result);
    model.setOperator(operator);*/
}
function Main(type) {
    var  name,that = this, model, controller, view;//name,; -- right
    init = function(){
        name = type;
        controller = new Controller(name);
    }
    init();
}
