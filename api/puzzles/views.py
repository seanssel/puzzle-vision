from rest_framework.permissions import AllowAny
from rest_framework.viewsets import ReadOnlyModelViewSet
from django_filters import FilterSet, NumberFilter
from .models import Puzzle
from .serializers import PuzzleSerializer


class PuzzleFilter(FilterSet):
    class Meta:
        model = Puzzle
        fields = ['pieces']
        fields = {
            'nbpieces': ['exact', 'range'],
            'nbmoves': ['exact', 'range'],
            'themes': ['icontains']
        }


class PuzzleViewSet(ReadOnlyModelViewSet):
    queryset = Puzzle.objects.all()
    serializer_class = PuzzleSerializer
    permission_classes = [AllowAny]
    filterset_class = PuzzleFilter
