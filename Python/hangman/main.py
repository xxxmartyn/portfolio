import random

stages = ['''
  +---+
  |   |
  O   |
 /|\  |
 / \  |
      |
=========
''', '''
  +---+
  |   |
  O   |
 /|\  |
 /    |
      |
=========
''', '''
  +---+
  |   |
  O   |
 /|\  |
      |
      |
=========
''', '''
  +---+
  |   |
  O   |
 /|   |
      |
      |
=========''', '''
  +---+
  |   |
  O   |
  |   |
      |
      |
=========
''', '''
  +---+
  |   |
  O   |
      |
      |
      |
=========
''', '''
  +---+
  |   |
      |
      |
      |
      |
=========
''']

global manIndex
manIndex = len(stages)-1
badAnswer = []
output_text = []

words = ["macska","padlizsán","alma","erdő","pizza","laptop","pc","ló"]
global word
word = random.choice(words)

for x in range(0,len(word)):
  output_text.append("_")
print(output_text)
def main():
    
    global manIndex
    global word
    global output_text

    letter_in = input("Adjon meg egy betűt, \nVagy irja be azt, hogy >> exit << a kilépéshez\n").lower()

    if letter_in == "exit":
      print("Köszönöm, hogy játszott!")
      exit(0)

    corect = False

    for i in range(0,len(word)):
        if word[i] == letter_in:
            output_text[i] = letter_in
            corect = True

    if not corect:
      manIndex -= 1
      badAnswer.append(letter_in)

    print(stages[manIndex])
    print(output_text)
    print(letter_in)
    print(f"Az eddig tippelt betűk amik nem találtak: {badAnswer}")

    testerStr = []
    for k in range(0,len(output_text)):
      testerStr.append(word[k])

    if manIndex == 0:
        print("Elfogytak az életei!\nFelakasztották! :(")
        print(f"A megfejtendő szó a(z) {word} volt")
        exit(0)
    elif testerStr == output_text:
      print(f"Ügyes volt!\nNyert!\nKitalálta azt a szót, hogy {word}")
      exit(0)

    main()
      
main()
