Here is my Ruby project that allows you to crawl a list of items of you choice. 

To run it you need 
Ruby (>= 2.7)
nokogiri for parsing HTML
open-uri for handling HTTP requests
sequel for database interaction
sqlite3 for the SQLite database

get these:
gem install nokogiri open-uri sequel sqlite3

then run the script:
ruby main.rb

and choose what you want to look for

The results are gonna appear on sceen and in you db!

![image](https://github.com/user-attachments/assets/ada748c6-abcd-47c0-a238-604b6c93283a)

The database contains info:
Item name, price, link to item, rating, availability, description

Have fun searching for your items.
