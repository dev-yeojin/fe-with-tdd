var App = App || {};

App.Counter = () => {
    let value = 0;
    return {
        getValue() {
            return value;
        },
        increaseValue() {
            return value ++;
        }
    }
}

/*
모듈 주입 방식으로 생각하기!
    Counter 객체를 만들어 파라미터로 전달받기
    data를 출력할 DOM element도 파라미터로 전달받기
*/
App.CounterView = (counter, updateEl) => {
    if(!counter) throw new Error(App.CounterView.messages.noCounter);
    if(!updateEl) throw new Error(App.CounterView.messages.noUpdateEl);
    return {
        updateView() {
            updateEl.innerHTML = counter.getValue();
        },
        increaseAndUpdateView() {
            counter.increaseValue();
            this.updateView();
        }  
    }    
}

App.CounterView.messages = {
    noCounter: 'Counter를 주입해야합니다.',
    noUpdateEl: 'update Element를 주입해야합니다.'
}