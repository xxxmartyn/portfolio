#include <iostream>
#include <fstream>
#include <string>
#include <list>
#include <sstream>
#include <cstdlib>

void Login();
void ReadFile();
void Split(std::string str, char cut, std::string arryS[]);
void Save();

struct Player{
  std::string name;
  int balance;
};
std::list<Player> players;
int curentBall = 100;
std::string playerName = "";
bool newPlayer = true;

int main(int argc, const char * argv[])
{
    ReadFile();
    
    std::cout << "\n\t\t======== ŰDVÖZÖLEK A CSODA KASZINOBAN =======\n\n";
    std::cout << "\n\t\t======== A játék lényge meg tippelni mire gondolt a gép (1-10) =======\n\n";
    std::cout << "\n\t\t======== Ha eltalálod a téted dupláját kapod meg! =======\n\n";
    std::cout << "\n\t\t======== Ha egy eltéres van felfelé vagy lefelé akkor a tétet kapod vissza! =======\n\n";
    std::cout << "\n\t\t======== Ha 2 eltéres van akkor a téted felét kapod vissza! =======\n\n";
    std::cout << ">Kérlek admeg a neved a kezdéshez:\n";
    
    Login();
    std::cout << "\n======== Egyenleged: " << curentBall << "$ =======\n\n";
    
    int bet;
    int gues;
    bool inGame = true;
    char cmd;
    
    while (inGame)
    {
        std::cout << "Kérem a tétet! " << std::endl;
        std::cin >> bet;
        if (bet <= curentBall)
        {
            std::cout << "Kérem a tippet! 1-10" << std::endl;
            std::cin >> gues;
            
            int theNumber = 1 + (rand() % 10);
            
            if(gues >= 1 || gues >= 10)
            {
                if (theNumber == gues)
                {
                    curentBall += 2*bet;
                }
                else if(theNumber+1 == gues || theNumber-1 == gues)
                {
                    curentBall = curentBall;
                }
                else if(theNumber+2 == gues || theNumber-2 == gues)
                {
                    curentBall -= bet/2;
                }
                else
                {
                    curentBall -= bet;
                }
                std::cout << "A tipplet száma a: " << gues << std::endl;
                std::cout << "A gép száma a: " << theNumber << std::endl;
                std::cout << "\n======== Egyenleged: " << curentBall << "$ =======\n\n";
                
                if(curentBall <= 0)
                {
                    std::cout << "Nem folytatad hatotd a játékot mert elfogyott a pénzed :(" << std::endl;
                    std::cout << "A karaktered nem mentetük így ha következőleg játszol folytathatod a csőd előtről!" << std::endl;
                    inGame = false;
                }
                else
                {
                    std::cout << "Szeretné folytatni? Ha nem akkor egy {n} ! Ha igen akkor mindegy mit nyomsz!" << std::endl;
                    std::cin >> cmd;
                    
                    if(cmd == 'n' || cmd == 'N')
                    {
                        inGame = false;
                        Save();
                    }
                }
            }
            else
                std::cout << "A tippnek 1-10 között kell lenije!" << std::endl << "Kérjük a tip 1 és 10 között legyen!" << std::endl;
        }
        else
            std::cout << "A téted nagyobb mint a pénzed!" << std::endl << "Kérjük anyi tétet adj meg maximum mint a pénzed!" << std::endl;
        
    }
    
    return 0;
}
void Split(std::string str, char cut, std::string arryS[])
{
    std::string out = "";
    int index = 0;
    
    for(int i = 0; i < str.length(); ++i)
    {
        if (str[i] == cut || str == "") {
            arryS[index] = out;
            index++;
            out = "";
        }
        else
        {
            out += str[i];
        }
    }
    arryS[index] = out;
}
void Login()
{
    std::cout << "<< ";
    std::string name;
    std::cin >> name;
    for (Player p:players)
    {
        if (p.name == name)
        {
            curentBall = p.balance;
            newPlayer = false;
        }
        else
        {
            playerName = name;
        }
    }
}
void ReadFile()
{
    std::fstream myFile;
    myFile.open("playersDatadbase.txt", std::ios::in);
    
    if (myFile.is_open())
    {
        std::string line;
        while (!myFile.eof())
        {
            std::string reader[2];
            getline(myFile,line);
            
            Split(line, ':', reader);
            Player p;
            p.name = reader[0];
            std::istringstream ( reader[1] ) >> p.balance;
            players.push_back(p);
        }
    }
    else
    {
        std::cout << "Az adatbázis nem érhető le!" << std::endl <<"Ezért létrehoztunk egyet!" << std::endl;
        
        myFile.open("playersDatadbase.txt", std::ios::out);
        if (myFile.is_open())
        {
            myFile << "admin" << ":" << "99999" << "\n";
            myFile << "tim" << ":" << "300";
        }
        else
            std::cout << "Az adat bázis nem hozható létre!" << std::endl;
        
        myFile.close();
        ReadFile();
    }
    
    myFile.close();
}

void Save()
{
    std::fstream myFile;
    myFile.open("playersDatadbase.txt", std::ios::out);
    
    if (myFile.is_open())
    {
        if(newPlayer)
        {
            Player p;
            p.name = playerName;
            p.balance = curentBall;
            players.push_back(p);
            for (Player p:players)
            {
                if (p.name != "") {
                    myFile << p.name << ":" << p.balance << "\n";
                }
            }
        }
        else
        {
            for (Player p:players)
            {
                if (p.name != "") {
                    if(p.name == playerName)
                        myFile << playerName << ":" << curentBall << "\n";
                     else
                         myFile << p.name << ":" << p.balance << "\n";
                }
            }
        }
        std::cout << "Az adatok mentése sikeresen megtörtént" << std::endl;
    }
    else
        std::cout << "Az adat bázis nem hozható létre!" << std::endl;
    
    myFile.close();
}
