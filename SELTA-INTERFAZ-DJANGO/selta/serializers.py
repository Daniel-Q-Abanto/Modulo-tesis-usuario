from rest_framework import serializers
from .models import Usuario, Diseño, Personalizacion, Orden, Producto, HistorialIA, RolPermiso

# Serializador para el modelo de roles
class RolPermisoSerializer(serializers.ModelSerializer):
    class Meta:
        model = RolPermiso
        fields = ['id_rol', 'rol', 'permiso']  # Especificamos los campos que queremos exponer

class UsuarioSerializer(serializers.ModelSerializer):
    rol = RolPermisoSerializer(read_only=True)  # Solo lectura, no es necesario recibir desde el frontend
    rol_id = serializers.PrimaryKeyRelatedField(
        queryset=RolPermiso.objects.all(),
        write_only=True,  # Escribimos este campo pero no lo leemos
        source='rol',  # En lugar de 'rol_id', lo llamamos 'rol'
        required=False  # Lo marcamos como no obligatorio
    )

    class Meta:
        model = Usuario
        fields = [
            'id_usuario',
            'correo',
            'nombre_usuario',
            'password',
            'rol',  # Este campo es solo lectura
            'rol_id',  # Este campo es solo para escritura y no es obligatorio
            'is_active',
            'is_staff',
            'is_superuser',
            'fecha_registro'
        ]
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def create(self, validated_data):
        password = validated_data.pop('password')  # 'password' en lugar de 'contraseña'
        rol = validated_data.pop('rol', None)  # El rol debe ser asignado aquí si no se envía desde el frontend

        # Asignamos el rol "trabajador" por defecto si no se ha enviado
        if not rol:
            rol = RolPermiso.objects.get(rol='trabajador')

        user = Usuario(**validated_data, rol=rol)
        user.set_password(password)  # Usamos 'set_password' para guardar la contraseña de forma segura
        user.save()
        return user
    
    
class DiseñoSerializer(serializers.ModelSerializer):
    usuario = UsuarioSerializer(read_only=True)
    class Meta:
        model = Diseño
        fields = ['id_diseño', 'nombre_diseño', 'descripcion', 'imagen_diseño', 'usuario', 'fecha_creacion', 'estado']

class PersonalizacionSerializer(serializers.ModelSerializer):
    diseño = DiseñoSerializer(read_only=True)
    class Meta:
        model = Personalizacion
        fields = ['id_personalizacion', 'diseño', 'tipo_personalizacion', 'valores', 'fecha_personalizacion']

class OrdenSerializer(serializers.ModelSerializer):
    usuario = UsuarioSerializer(read_only=True)
    diseño = DiseñoSerializer(read_only=True)
    class Meta:
        model = Orden
        fields = ['id_orden', 'usuario', 'diseño', 'cantidad', 'precio_total', 'estado', 'fecha_orden']

class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = ['id_producto', 'nombre_producto', 'descripcion', 'precio', 'stock', 'imagen_producto']

class HistorialIASerializer(serializers.ModelSerializer):
    usuario = UsuarioSerializer(read_only=True)  # Solo lectura para usuario
    
    class Meta:
        model = HistorialIA
        fields = ['id_historial', 'usuario', 'prompt', 'imagen_generada', 'fecha_generacion']



class TokenObtainSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
