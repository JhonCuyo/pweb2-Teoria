from django.shortcuts import render
from .models import Persona
from .forms import PersonaForm

def personaTestView(request):
    obj = Persona.objects.get(id=1)
    context = {
        'objeto': obj,
        }
    return render(request, 'personas/descripcion.html', context)
    
def personaCreativeView(request):
    print('GET:', request.GET)
    print('POST:', request.POST)
    context = {}
    return render(request, 'personas/personasCreate.html', context)

def searchForHelp(request):
    return render(request, 'personas/search.html', {})