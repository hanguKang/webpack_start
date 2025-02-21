const xPlusTwo = (x = 0) => x + 2;
const xTimesThree = (x = 0) => x * 3;
const getResult3 = (x = 0) => {
  return x |> xPlusTwo |> xTimesThree; //파이프라인 오퍼레이터는 전달인자를 건네주면서 함수를 순서대로 나열하면 그대로 실행한다. 짱!!!! 임
  // 원래는 이렇게 복잡하게 해야 함. xTimesThree(xPlusTwo(x));
};

export { getResult3 };
