import random
rock = '''
    _______
---'   ____)
      (_____)
      (_____)
      (____)
---.__(___)
'''

paper = '''
    _______
---'   ____)____
          ______)
          _______)
         _______)
---.__________)
'''

scissors = '''
    _______
---'   ____)____
          ______)
       __________)
      (____)
---.__(___)
'''

list = [rock, paper, scissors]

def helpmenu():
    print("\n________________________________")
    print("         Parancsok:")
    print("kő: k")
    print("papír: p")
    print("olló: o")

def main():
    machinMove = random.randint(0,2)
    playerMove = 0
    cm = input("\nVálasztásod: ")
    if cm == "k":
        playerMove = 0
    elif cm == "p":
        playerMove = 1
    elif cm == "o":
        playerMove = 2
    else:
        print("Hibás input!")
        helpmenu()
        main()
    
    print(list[machinMove])
    print(list[playerMove])

    if (playerMove == 0 and machinMove == 2) or (playerMove == 1 and machinMove == 0) or (playerMove == 2 and machinMove == 1):
        print("Elsöprő győzelem!")
    elif (playerMove == 0 and machinMove == 1) or (playerMove == 1 and machinMove == 2) or (playerMove == 2 and machinMove == 0):
        print("Megalázó vereség!")
    elif playerMove == machinMove:
        print("Meglepő döntetlen!")

    inp = input("Szeretmél még játszani? \nHa igen akkor nyomj egy enter ha nem akkor bármi mást\n>>")
    if inp == "":
        helpmenu()
        main()
    else:
        print("Köszönöm hogy játszotál!")

helpmenu()
main()
