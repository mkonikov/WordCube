class Dice {

  static rollDice() {
    const diceArrays = [
      ['a', 'e', 'd', 'n', 'n', 'n'],
      ['a', 'e', 'g', 'n', 'n', 'm'],
      ['a', 'f', 'i', 'y', 's', 'r'],
      ['a', 'e', 'm', 'e', 'e', 'e'],
      ['a', 'e', 'a', 'e', 'e', 'e'],
      ['a', 'f', 'a', 'i', 'r', 's'],
      ['a', 'u', 'm', 'e', 'g', 'e'],
      ['a', 'r', 'a', 's', 'f', 'a'],
      ['e', 'n', 'u', 's', 's', 's'],
      ['e', 'l', 'p', 't', 'i', 's'],
      ['e', 'c', 'p', 'i', 's', 't'],
      ['e', 't', 'i', 'l', 's', 'i'],
      ['e', 't', 'i', 't', 'i', 'i'],
      ['e', 't', 'm', 't', 'o', 't'],
      ['e', 'c', 'c', 'n', 't', 's'],
      ['o', 'u', 'o', 't', 'n', 'w'],
      ['o', 't', 'd', 'h', 'n', 'd'],
      ['o', 'n', 'd', 'l', 'h', 'r'],
      ['o', 'r', 'd', 'h', 'h', 'l'],
      ['o', 'n', 'd', 'w', 'h', 'h'],
      ['o', 'g', 'w', 'r', 'v', 'r'],
      ['o', 'o', 'o', 't', 't', 'u'],
      ['i', 'r', 'p', 's', 'y', 'y'],
      ['b', 'b', 'z', 'j', 'x', 'k'],
      ['er', 'in', 'an', 'he', 'th', 'qu']
    ];
    let i;
    let j;
    let temp;

    for (i = diceArrays.length - 1; i > 0; i -= 1) {
      j = Math.floor(Math.random() * (i + 1));
      temp = diceArrays[i];
      diceArrays[i] = diceArrays[j];
      diceArrays[j] = temp;
    }

    return diceArrays;
  }

}

export default Dice;
