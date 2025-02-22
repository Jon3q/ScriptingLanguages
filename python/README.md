Here is a chatbot project.

In order to run it on u need to:
Setup you rasa_env in additon to this rasa app, to ensure ut works properly.

When you do, run:
rasa run --enable-api --cors "*" --debug

And in second terminal
rasa run actions

And in third, 
ngrok http 5005

If you train your app beforhand using 
rasa train

And set up your slack api (remember to transfer your tokens to rasa app)
you should get results that give you informations about a restaurant.

Here are my results

![image](https://github.com/user-attachments/assets/a9c7decb-0d9c-47b8-8407-97d59fabb536)

![image](https://github.com/user-attachments/assets/76c49720-995d-4f35-8440-e10904fe610e)

Have fun!

