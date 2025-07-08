from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    RegisterView, LoginView, ProfileView, GenerarImagenAPIView,
    UsuarioViewSet, DiseñoViewSet, PersonalizacionViewSet,
    OrdenViewSet, ProductoViewSet, HistorialIAViewSet, RolPermisoViewSet
)

router = DefaultRouter()
router.register('usuarios', UsuarioViewSet)
router.register('diseños', DiseñoViewSet)
router.register('personalizaciones', PersonalizacionViewSet)
router.register('ordenes', OrdenViewSet)
router.register('productos', ProductoViewSet)
router.register('historial-ia', HistorialIAViewSet)
router.register('roles-y-permisos', RolPermisoViewSet)

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('profile/', ProfileView.as_view(), name='profile'),
    path('generar-imagen/', GenerarImagenAPIView.as_view(), name='generar-imagen'),  # Esta línea
    path('', include(router.urls)),
]
