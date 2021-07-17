from rest_framework.permissions import BasePermission, SAFE_METHODS

class IsOwnerOrReadOnly(BasePermission):
    #cuando yo veo una sola request, en realidad esta haciendo todas
    # pero anda bien, me deja GET y DELETE solo me deja si coincide created_by y token de user
    def has_object_permission(self, request, view, obj):
    
        if request.method in SAFE_METHODS:
            return True   
        return obj.created_by == request.user
    
    