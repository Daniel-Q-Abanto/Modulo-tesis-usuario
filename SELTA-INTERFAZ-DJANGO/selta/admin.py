from django.contrib import admin
from .models import Usuario, Diseño, Personalizacion, Orden, Producto, HistorialIA, RolPermiso

# Personalización para la visualización de los registros
class UsuarioAdmin(admin.ModelAdmin):
    list_display = ('id_usuario', 'nombre_usuario', 'correo', 'rol', 'fecha_registro')
    search_fields = ('nombre_usuario', 'correo')
    list_filter = ('rol',)

class DiseñoAdmin(admin.ModelAdmin):
    list_display = ('id_diseño', 'nombre_diseño', 'estado', 'usuario', 'fecha_creacion')
    search_fields = ('nombre_diseño',)
    list_filter = ('estado', 'usuario')

class PersonalizacionAdmin(admin.ModelAdmin):
    list_display = ('id_personalizacion', 'diseño', 'tipo_personalizacion', 'fecha_personalizacion')
    search_fields = ('tipo_personalizacion',)
    list_filter = ('diseño',)

class OrdenAdmin(admin.ModelAdmin):
    list_display = ('id_orden', 'usuario', 'diseño', 'cantidad', 'precio_total', 'estado', 'fecha_orden')
    search_fields = ('usuario__nombre_usuario', 'diseño__nombre_diseño')
    list_filter = ('estado', 'usuario')

class ProductoAdmin(admin.ModelAdmin):
    list_display = ('id_producto', 'nombre_producto', 'precio', 'stock', 'imagen_producto')
    search_fields = ('nombre_producto',)
    list_filter = ('stock',)

class HistorialIAAdmin(admin.ModelAdmin):
    list_display = ('id_historial', 'usuario', 'fecha_generacion', 'prompt', 'imagen_generada')
    search_fields = ('usuario__nombre_usuario', 'prompt')
    list_filter = ('usuario',)

class RolPermisoAdmin(admin.ModelAdmin):
    list_display = ('id_rol', 'rol', 'permiso')
    search_fields = ('rol', 'permiso')

# Registro de modelos
admin.site.register(Usuario, UsuarioAdmin)
admin.site.register(Diseño, DiseñoAdmin)
admin.site.register(Personalizacion, PersonalizacionAdmin)
admin.site.register(Orden, OrdenAdmin)
admin.site.register(Producto, ProductoAdmin)
admin.site.register(HistorialIA, HistorialIAAdmin)
admin.site.register(RolPermiso, RolPermisoAdmin)
