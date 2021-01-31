var App = App || {};

App.Counter = (_data) => {
  if (!_data) throw new Error(App.Counter.messages.noData);

  /*
    유연하게 사용하기 위함
    data를 공유하기 위해서 원시형(Number)을 사용할 수 없다.
    생성인자로 넘겨주면 그 값은 복사되기 때문에 레퍼런스로 받는 객체타입을 사용해야한다!!
    */
  const data = _data;
  data.value = data.value || 0;

  return {
    getValue() {
      return data.value;
    },
    /*
    increaseValue() {
        data.value ++;
    },
    decreaseValue() {
        data.value --;
    }
    */
    count() {
      data.value++;
    },
    setCountFn(fn) {
        console.log(fn);
      this.count = () => (data.value = fn(data.value)) 
      return this;
    },
  };
};

App.Counter.messages = {
  noData: "초기값을 주입해야합니다.",
};

/*
모듈 주입 방식으로 생각하기!
    Counter 객체를 만들어 파라미터로 전달받기
    data를 출력할 DOM element도 파라미터로 전달받기
*/
App.CounterView = (counter, options) => {
  if (!counter) throw new Error(App.CounterView.messages.noCounter);
  if (!options.updateEl) throw new Error(App.CounterView.messages.noUpdateEl);
  if (!options.triggerEl) throw new Error(App.CounterView.messages.noTriggerEl);

  const view = {
    updateView() {
      options.updateEl.innerHTML = counter.getValue();
    },

    countAndUpdateView() {
      counter.count();
      this.updateView();
    },
  };
  options.triggerEl.addEventListener("click", () => {
    view.countAndUpdateView();
  });
  return view;
};

App.CounterView.messages = {
  noCounter: "Counter를 주입해야합니다.",
  noUpdateEl: "update Element를 주입해야합니다.",
  noTriggerEl: "trigger Element를 주입해야 합니다",
};
