# masterboard
jQuery leaderboard that pulls in JSON from an API and shuffles the players in real-time

# Instructions
To run a server to pull example JSON from,

`pip install -r requirements.txt`

`python manage.py syncdb`

`python manage.py loaddata mb_example/fixtures/players.json `

`python manage.py runserver`

load localhost:8000 in browser to see example page
