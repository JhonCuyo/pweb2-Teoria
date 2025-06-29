from django.shortcuts import render
from django.urls import reverse_lazy
from .models import Persona
from .forms import PersonaForm
from django.http import HttpResponse, JsonResponse
from django.views import View
from django.views.generic.list import (ListView, DetailView,
                                       CreateView, UpdateView,
                                       DeleteView)

def personaTestView(request):
    obj = Persona.objects.get(id=1)
    context = {
        'objeto': obj,
        }
    return render(request, 'personas/descripcion.html', context)
    
def personaCreativeView(request):
    print(request)
    if request.method == 'POST':
        nombre = request.POST.get('q')
        print(nombre)
    context = {}
    return render(request, 'personas/personasCreate.html', context)

def searchForHelp(request):
    return render(request, 'personas/search.html', {})

class PersonaListView(ListView):
    model= Persona
    queryset = Persona.objects.filter(edad__lte='40')

class PersonaDetailView(ListView):
    model = Persona

class PersonaCreateView(CreateView):
    model = Persona
    fields = ['nombres', 'apellidos', 'edad', 'donador']
    
class PersonaUpdateView(UpdateView):
    model = Persona
    fields = ['nombres', 'apellidos', 'edad', 'donador']

class PersonaDeleteView(DeleteView):
    model = Persona
    success_url = reverse_lazy('personas:persona-list')

class PersonaQueryView(View):
    def get(self, request, *args, **kwargs):
        queryset = Persona.objects.filter(edad__lte=40)
        return JsonResponse(list(queryset.values()), safe=False)