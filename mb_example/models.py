from django.db import models

class Player(models.Model):
    name = models.CharField(max_length=30)
    score = models.IntegerField(default=0)
    avatar = models.ImageField(upload_to='avatars/')

    def __unicode__(self):
        return self.name

    class Meta:
        ordering = ['-score']