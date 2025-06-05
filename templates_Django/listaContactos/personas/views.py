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
    form = PersonaForm(request.POST or None)
    if form.is_valid():
        form.save()
        form = PersonaForm()

    context = {
        'form': form
    }
    return render(request, 'personas/crear.html', context)