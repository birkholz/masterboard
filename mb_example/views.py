from django.shortcuts import render
from django.http import HttpResponse
import json
import random

from models import Player


class JsonResponse(HttpResponse):
    """
        JSON response
    """
    def __init__(self, content, status=None, content_type='application/json'):
        super(JsonResponse, self).__init__(
            content=json.dumps(content),
            status=status,
            content_type=content_type,
        )


def get_players(request):
    '''
    Returns JSON of all player data
    '''
    players = Player.objects.all()
    player_list = []
    for player in players:
        player_dict = {
            'id': player.id,
            'name': player.name,
            'score': player.score,
            'img': player.avatar.url
        }
        player_list.append(player_dict)
    return JsonResponse(player_list)


def mod_scores(request):
    players = Player.objects.all()
    for player in players:
        player.score = player.score + random.choice([-1, 1])
        if player.score < 0:
            player.score = 1
        elif player.score > 10:
            player.score = 9
        player.save()
    return HttpResponse(status=200)


def get_scores(request):
    '''
    Returns JSON of only player ids and scores
    For testing, it randomly adjusts players' scores
    '''
    players = Player.objects.all()
    for player in players:
        player.score = player.score + random.choice([-1, 1])
        if player.score < 0:
            player.score = 1
        elif player.score > 10:
            player.score = 9
        player.save()
    return HttpResponse(json.dumps([{'id': player.id,'score': player.score} for player in players]), content_type="application/json")