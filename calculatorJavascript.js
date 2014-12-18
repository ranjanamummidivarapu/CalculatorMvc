/**
 * Created by ranjanam on 17-Dec-14.
 */


calculatorModel = function () {
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

calculatorView = function(){
    this.textbox = function(name, value){
        var textbox;
        textbox = document.createElement("input");
        textbox.type = "text";
        textbox.value = value;
        document.getElementById(name).appendChild(textbox);
        return textbox;
    }
    this.buttons = function(value,div, id) {
        var button;
        button = document.createElement("button");
        button.value = value
        button.id = id+value;
        button.appendChild(document.createTextNode(value));
        div.appendChild(button);
        return button;
    }
    this.div = function(divName){
        var div;
        div = document.createElement("div");
        div.id = divName;
        return div;
    }
    this.append = function(div, element){
        div.appendChild(element);
    }
    this.getElement = function(name){
        return document.getElementById(name);
    }
}
function calculatorController(name){
    var modelObject, viewObject, controllerScope = this,textbox;
    modelObject = new calculatorModel();
    viewObject = new calculatorView();
    this.calculatorController = function (){
        var  index = 0,mainDiv, numberDiv, operatorDiv, numberButton, operatorButton, htmlElementObject, initialTextboxValue = 0, numberValues = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], operatorValues = ["+", "-", "*", "/","1/x", "=","B", "C"];
        mainDiv = viewObject.getElement(name);
        textbox = viewObject.textbox(name, initialTextboxValue);
        numberDiv = viewObject.div(name+"numberDiv");
        while(index < numberValues.length) {
            numberButton = viewObject.buttons(numberValues[index], numberDiv,"number");
            numberButton.onclick = function(){controllerScope.append(this.value);}
            index++;
        }
        index = 0;
        operatorDiv = viewObject.div(name+"operatorDiv");
        while(index < operatorValues.length){
            operatorButton = viewObject.buttons(operatorValues[index], operatorDiv,"operator");
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
            textbox.value = result;
        }
        modelObject.setInput(input);
        modelObject.setResult(result);
        modelObject.setOperator(operator);
    }
    textbox = controllerScope.calculatorController();
}
function Main(type) {
    var  name, that = this, controllerObject;//name,; -- right
    init = function(){
        name = type;
        controllerObject = new calculatorController(name);
    }
    init();
}