describe("App.Counter", () => {
  let counter;
  const data = { value: 0 };

  it("초기값을 주입하지 않으면 에러를 발생시킨다.", () => {
    //const actual = () => (counter = App.Counter())
    const actual = () => {
      counter = App.Counter();
    };
    expect(actual).toThrowError(App.Counter.messages.noData);
  });

  beforeEach(() => {
    counter = App.Counter(data);
  });

  describe("getValue()", () => {
    it("초기값이 0인 카운터", () => {
      expect(counter.getValue()).toBe(0);
    });
  });
  /*
    describe('increaseValue()', () => {
        it('카운터 1 증가', () => {
            const initValue = counter.getValue();
            counter.increaseValue();
            expect(counter.getValue()).toBe(initValue + 1);
        })
    });
    describe('decreaseValue()', () => {
        it('counter 1 감소', () => {
            const initValue = counter.getValue();
            counter.decreaseValue();
            expect(counter.getValue()).toBe(initValue - 1);
        })
    });
    */
  describe("count()", () => {
    it("카운터 1증가", () => {
      const initValue = counter.getValue();
      counter.count();
      expect(counter.getValue()).toBe(initValue + 1);
    });
  });
  describe("setCountFn", () => {
    it("인자로 함수를 넘기면 count()를 대체한다.", () => {
      const add2 = (value) => value + 2;
      const expected = add2(data.value);
      counter.setCountFn(add2).count();
      const actual = counter.getValue();
      expect(actual).toBe(expected);
    });
  });
});

/*
모듈 주입 방식으로 생각하기!
    Counter 객체를 만들어 파라미터로 전달받기
    data를 출력할 DOM element도 파라미터로 전달받기
*/
describe("App.CounterView", () => {
  let counter, updateEl, triggerEl, view;
  const data = { value: 0 };

  beforeEach(() => {
    /* DRY(Do not Repeat Yourself) 원칙  */
    updateEl = document.createElement("span");
    triggerEl = document.createElement("button");
    counter = App.Counter(data);
    view = App.CounterView(counter, { updateEl, triggerEl });
  });

  describe("네거티브 테스트", () => {
    it("counter 주입되지않으면 error return", () => {
      const actual = () => App.CounterView(null, { updateEl });
      expect(actual).toThrowError(App.CounterView.messages.noCounter);
    });

    it("updateEl 주입되지않으면 error return", () => {
      const actual = () => App.CounterView(counter, { triggerEl });
      expect(actual).toThrowError(App.CounterView.messages.noUpdateEl);
    });
  });

  describe("updateView()", () => {
    it("Counter getValue()", () => {
      let counterValue = counter.getValue();
      view.updateView();
      expect(updateEl.innerHTML).toBe(counterValue.toString());
    });
  });

  describe("countAndUpdateView()는", () => {
    it("Counter의 count 함수 실행", () => {
      spyOn(counter, "count");
      view.countAndUpdateView();
      expect(counter.count).toHaveBeenCalled();
    });
    it("CounterView의 updateView 함수 실행", () => {
      spyOn(view, "updateView");
      view.countAndUpdateView();
      expect(view.updateView).toHaveBeenCalled();
    });
  });

  it("Click 이벤트가 발생하면 countAndUpdateView를 실행한다.", () => {
    spyOn(view, "countAndUpdateView");
    triggerEl.click();
    expect(view.countAndUpdateView).toHaveBeenCalled();
  });
});
