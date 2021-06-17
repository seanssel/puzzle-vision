from . import views
from rest_framework.routers import SimpleRouter

router = SimpleRouter()
router.register(r'puzzles', views.PuzzleViewSet)
urlpatterns = router.urls