from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .views import (
    SectorViewSet, IPOViewSet, IPOApplicationViewSet,
    api_overview, user_profile, register_user, dashboard_stats
)

# DRF Router for ViewSets
router = DefaultRouter()
router.register(r'ipos', IPOViewSet, basename='ipo')
router.register(r'sectors', SectorViewSet)
router.register(r'applications', IPOApplicationViewSet, basename='application')

# App URL patterns
urlpatterns = [
    # API Overview
    path('', api_overview, name='api-overview'),
    
    # ViewSet URLs (automatically generated)
    path('', include(router.urls)),
    
    # Custom API Views
    path('profile/', user_profile, name='user-profile'),
    path('dashboard/', dashboard_stats, name='dashboard-stats'),
    
    # Authentication URLs
    path('auth/register/', register_user, name='register'),
    path('auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    # DRF Authentication URLs
    path('api-auth/', include('rest_framework.urls')),
]