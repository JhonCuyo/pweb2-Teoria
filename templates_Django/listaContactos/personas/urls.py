from django.urls import path
from .views import (PersonaListView,)

urlpatterns = [
    path('', PersonaListView.as_view(), name='persona-list'),
]