# **fe-with-tdd**

### **jasmine-sample-code**

\- 2.7.0 Release<br/>
<a href="https://github.com/jasmine/jasmine/releases">https://github.com/jasmine/jasmine/releases</a>


\- standalone 방식

\- TestRunner : SpecRunner.html

### jasmine sample 테스트러너 실행 결과
<img src="images/jasmine-01.png" />

### **jasmine 문법**
<a href="https://jasmine.github.io/api/2.7/global.html#expect">API Document</a>

> 테스트
- describe : 스펙 그룹 (Test unit group)
- it : 단일 테스트 스펙 (Test unit)
- expect : matcher (검증용)
- beforeEach : describe 호출 전 설정 실행

```js
describe('test group description', function() {
  beforeEach(function() {
    // common setting
  });
  it('test description', function() {
    expect(actual).tobe(expect value);
  })
});
```

> 테스트 더블
- spyOn(테스트 더블) : 감시할 객체, 메소드 

```js
// bar함수가 App.foo함수를 실행하는지 검증하는 코드

// 특정 모듈의 함수 감시하도록 설정
spyOn(App, 'foo')
// 특정 행동 수행
bar();
// 감시한 함수가 잘 실행되었는지 감시
expect(App.foo).toHaveBeenCalled();

```

> ### 예제

**src/player.js**

``` js
function Player() {
}

Player.prototype.play = function(song) {
  this.currentlyPlayingSong = song;
  this.isPlaying = true;
};
```

**spec/PlayerSpec.js**

``` js
describe("Player", function() {
  var player;
  var song;

// 공통으로 사용할 내용 beforeEach에 정의
  beforeEach(function() {
    player = new Player(); // Player.js
    song = new Song();
  });

// it (Test description ,함수) 생성
  it("should be able to play a Song", function() {
    player.play(song);
    // 결과 값 : player.currentlyPlayingSong, 기대값 : song
    expect(player.currentlyPlayingSong).toEqual(song);
  });
  ...
});
```
> ### **jasmine sample 코드설명**
> Player라고 정의한 테스트 유닛들에서 공통으로 사용될 내용을 beforeEach에 정의한다.
it 함수를 이용하여 "should be able to play a Song" Test description과 Test function을 작성한다.
player는 Player.js 의 객체로 this.currentlyPlayingSong = song; 으로 정의되어 있으므로 expect의 기대값인 song과 실제 값인 player.currentlyPlayingSong이 동일하여 테스트가 성공한다.
성공이 아닌 케이스를 확인하고 싶다면 song을 다른 text로 변경해보면 다음과 같이 test fail 결과를 확인할 수 있다.

<img src="images/jasmine-fail.png" />

### TDD 용어
> 테스트 더블 : 단위 테스트 패턴으로, 테스트하기 곤란한 컴포넌트를 대체하여 테스트하는 것 (Jasmine: spies)
  - 더미 : 함수 인자를 채우기 위해 사용
  - 스텁 : return 값이 있는 것(return 값 하드코딩), 더미에서 발전된 개념
  - 스파이 : 내부적으로 기록을 남김, 스텁과 비슷
  - 페이크 : return값을 받는 것(하드코딩 X, 운영에서 사용 불가)
  - 목 : 더미 + 스텁 + 스파이스