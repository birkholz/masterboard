# masterboard
jQuery leaderboard that pulls in JSON from an API and shuffles the players in real-time. I really wanted to try my hand at building a dynamic leaderboard, and I couldn't find any examples of what I wanted in the community, so I built my own.

# Instructions
To run a server to pull example JSON from,
```
pip install -r requirements.txt
python manage.py syncdb
python manage.py loaddata mb_example/fixtures/players.json
python manage.py runserver
```
load `http://localhost:8000` in browser to see example page
