# tube-tracking
Where is my test tube?

Przykładowa aplikacja która śledzi próbki - w jakim budynku obecnie się znajduje, w jakich budynkach wcześniej była, kto nad nią pracuje (jacy pracownicy laboratorium) oraz ich status (przykładowy)

An example application that tracks samples - what building it is currently in, what buildings it was in before, who is working on it (which laboratory employees) and their status (example)

struktura forderów
w głównym katalogu:
/
forder structure
in the main directory:

` api: `
# api-tree.txt

` frontend:  `
# frontend-tree.txt

skrypty/scripts:
w głównym katalogu/in the main directory:

*/ start dev /*

`linux/macos`
# ./start-dev.sh

`windows`
# ./start-dev.bat

`lub wpisać komende/or enter the command:`
# npm run dev

*/ start build & start production /*

`linux/macos`
# ./start-build.sh

`windows`
# ./start-build.bat

`lub wpisać komende/or enter the command:`
# npm run build && npm start

w apps/api | w apps/frontend:

*/ start dev /*
# npm run dev

*/ start test /*
# npm test


` jesli masz komunikat # command not found # to musisz uzyć chmod, np.: `
` if you get the message # command not found # then you need to use chmod, e.g.: `
# chmod +x start-dev.sh