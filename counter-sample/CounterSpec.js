describe('App.Counter', () => {
    let counter;

    beforeEach(()=> {
        counter = App.Counter();
    })

    describe('getValue()', () => {
        it('초기값이 0인 카운터', () => {
            expect(counter.getValue()).toBe(0);
        })
    });
    describe('increaseValue()', () => {
        it('카운터 1 증가', () => {
            const initValue = counter.getValue();
            counter.increaseValue();
            expect(counter.getValue()).toBe(initValue + 1);
        })
    });
});

/*
모듈 주입 방식으로 생각하기!
    Counter 객체를 만들어 파라미터로 전달받기
    data를 출력할 DOM element도 파라미터로 전달받기
*/
describe('App.CounterView', () => {
    let counter, updateEl, triggerEl, data, view;
    
    beforeEach(()=> {
        /* DRY(Do not Repeat Yourself) 원칙  */
        updateEl = document.createElement('span');
        triggerEl = document.createElement('button');
        counter = App.Counter()
        view = App.CounterView(counter, { updateEl, triggerEl })
    });

    describe('네거티브 테스트', () => {
        it('counter 주입되지않으면 error return', () => {
            const actual = () => App.CounterView(null, { updateEl });
            expect(actual).toThrowError(App.CounterView.messages.noCounter);
        })

        it('updateEl 주입되지않으면 error return', () => {
            const actual = () => App.CounterView(counter, { triggerEl });
            expect(actual).toThrowError(App.CounterView.messages.noUpdateEl);
        })
    })
    
    describe('updateView()', () => {
        it('Counter getValue()', () => {
            let counterValue = counter.getValue();
            view.updateView();
            expect(updateEl.innerHTML).toBe(counterValue.toString());
        })
    })

    describe('increaseAndUpdateView()는', () => {
        it('Counter의 increaseValue 함수 실행', () => {
            spyOn(counter, 'increaseValue');
            view.increaseAndUpdateView();
            expect(counter.increaseValue).toHaveBeenCalled()
        })
        it('CounterView의 updateView 함수 실행', () => {
            spyOn(view, 'updateView');
            view.increaseAndUpdateView();
            expect(view.updateView).toHaveBeenCalled()
        })
    });

    
    it('Click 이벤트가 발생하면 increaseAndUpdateView를 실행한다.', () => {
        spyOn(view, 'increaseAndUpdateView')
        triggerEl.click()
        expect(view.increaseAndUpdateView).toHaveBeenCalled()
    })
});