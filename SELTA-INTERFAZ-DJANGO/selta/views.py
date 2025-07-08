from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.contrib.auth import get_user_model
from rest_framework import status
import os
from openai import OpenAI

from .models import Usuario, Diseño, Personalizacion, Orden, Producto, HistorialIA, RolPermiso
from .serializers import (
    UsuarioSerializer, DiseñoSerializer, PersonalizacionSerializer,
    OrdenSerializer, ProductoSerializer, HistorialIASerializer, RolPermisoSerializer
)


import requests
# Vista de registro
class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        try:
            # Si el rol no se pasa desde el frontend, se asignará "trabajador" por defecto
            request.data['rol'] = RolPermiso.objects.get(rol='trabajador').id_rol

            serializer = UsuarioSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response({"message": "Usuario registrado exitosamente."}, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except RolPermiso.DoesNotExist:
            return Response({"detail": "El rol 'trabajador' no existe en la base de datos."}, status=status.HTTP_400_BAD_REQUEST)

# Login de usuario
class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        correo = request.data.get('email')
        password = request.data.get('password')

        try:
            user = get_user_model().objects.get(correo=correo)
            if user.check_password(password):
                # Generar el token para el usuario
                refresh = RefreshToken.for_user(user)

                # Obtener el rol del usuario y devolverlo junto con el token
                user_role = user.rol.rol  # Asegúrate de que el modelo de usuario tiene el rol

                return Response({
                    'access': str(refresh.access_token),
                    'refresh': str(refresh),
                    'role': user_role,  # Devolver el rol del usuario
                })
            else:
                return Response({"detail": "Contraseña incorrecta"}, status=400)
        except get_user_model().DoesNotExist:
            return Response({"detail": "Usuario no encontrado"}, status=404)
        
class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UsuarioSerializer(request.user)
        return Response(serializer.data, status=200)

    def put(self, request):
        serializer = UsuarioSerializer(request.user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=200)
        return Response(serializer.errors, status=400)
    

class GenerarImagenAPIView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        prompt = request.data.get("prompt")
        if not prompt:
            return Response({"error": "El prompt es obligatorio."}, status=400)

        # ✅ Inicializamos el cliente aquí, en cada solicitud
        api_key = os.environ.get("OPENAI_API_KEY")
        if not api_key:
            return Response({"error": "La API key de OpenAI no está configurada."}, status=500)

        client = OpenAI(api_key=api_key)

        try:
            response = client.images.generate(
                model="dall-e-3",
                prompt=prompt,
                size="1024x1024",
                n=1
            )
            image_url = response.data[0].url

            HistorialIA.objects.create(
                usuario=request.user,
                prompt=prompt,
                imagen_generada=image_url
            )
            return Response({"imagen_url": image_url}, status=200)
        except Exception as e:
            return Response({"error": str(e)}, status=500)


# CRUDs
class UsuarioViewSet(ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

class DiseñoViewSet(ModelViewSet):
    queryset = Diseño.objects.all()
    serializer_class = DiseñoSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

class PersonalizacionViewSet(ModelViewSet):
    queryset = Personalizacion.objects.all()
    serializer_class = PersonalizacionSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

class OrdenViewSet(ModelViewSet):
    queryset = Orden.objects.all()
    serializer_class = OrdenSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

class ProductoViewSet(ModelViewSet):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

class HistorialIAViewSet(ModelViewSet):
    queryset = HistorialIA.objects.all()
    serializer_class = HistorialIASerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return HistorialIA.objects.filter(usuario=self.request.user).order_by('-fecha_generacion')

    def perform_create(self, serializer):
        serializer.save(usuario=self.request.user)

class RolPermisoViewSet(ModelViewSet):
    queryset = RolPermiso.objects.all()
    serializer_class = RolPermisoSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
