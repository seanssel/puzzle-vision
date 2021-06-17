from rest_framework.pagination import PageNumberPagination
from random import randint


class PuzzlePagination(PageNumberPagination):
    """
    Allows random page return with ?page=random
    """
    random_page_strings = ('random',)
    page_size_query_param = 'page_size'
    max_page_size = 100

    def get_page_number(self, request, paginator):
        page_number = request.query_params.get(self.page_query_param, 1)
        if page_number:
            if page_number in self.last_page_strings:
                page_number = paginator.num_pages
            if page_number in self.random_page_strings:
                page_number = randint(1, paginator.num_pages)

        return page_number
