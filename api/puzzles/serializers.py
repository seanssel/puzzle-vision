from rest_framework import serializers
from . import models


class PuzzleSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Puzzle
        fields = '__all__'
