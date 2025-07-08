from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('selta.urls')),  # Muy importante que el archivo selta/urls.py exista
]
