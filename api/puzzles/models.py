from django.db import models

class Puzzle(models.Model):
    puzzleid = models.CharField(max_length=11, primary_key=True)
    fen = models.CharField(max_length=100)
    moves = models.CharField(max_length=255)
    rating = models.IntegerField()
    ratingdeviation = models.IntegerField()
    popularity = models.IntegerField()
    nbplays = models.IntegerField()
    themes = models.CharField(max_length=255)
    gameurl = models.CharField(max_length=60)
    nbpieces = models.IntegerField()
    nbmoves = models.IntegerField()

    class Meta:
        db_table = "puzzles"

    def __str__(self):
        return self.puzzleid