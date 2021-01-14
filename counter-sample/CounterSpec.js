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
    let counter, updateEl, view;
    beforeEach(()=> {
        /* DRY(Do not Repeat Yourself) 원칙  */
        counter = App.Counter();
        updateEl = document.createElement('span');
        view = App.CounterView(counter, updateEl);
    });

    it('counter 주입되지않으면 error return', () => {
        clickCounter = null;
        const actual = () => {
            App.CounterView(null, updateEl);
        };
        expect(actual).toThrowError(App.CounterView.messages.noCounter);
    });

    it('updateEl 주입되지않으면 error return', () => {
        counter = App.Counter();
        const actual = () => {
            App.CounterView(clickCounter, null);
        };
        expect(actual).toThrowError();
        //expect(actual).toThrowError(App.CounterView.messages.noUpdateEl);
    });

    describe('updateView()', () => {
        it('Counter getValue()', () => {
            let counterValue = counter.getValue();
            view.updateView();
            expect(updateEl.innerHTML).toBe(counterValue.toString());
        })
    })

    describe('increaseAndUpdateView()는', () => {
        beforeEach(() => {
        })
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
        // it('click 이벤트가 발생하면 increaseAndUpdateView를 실행한다.', () => {
        //     spyOn(view, 'increaseAndUpdateView')
        //     expect(view.increaseAndUpdateView).toHaveBeenCalled()
        // })
    })
});