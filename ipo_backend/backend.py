#!/usr/bin/env python3
"""
Django REST API Backend - Fixed Version with Templates
"""

import os
import sys

# Set Django settings
os.environ.setdefault('DJANGO_SETTINGS_MODULE', '__main__')

import django
from django.conf import settings

# Configure Django
settings.configure(
    DEBUG=True,
    SECRET_KEY='django-secret-key-12345678',
    INSTALLED_APPS=[
        'django.contrib.admin',
        'django.contrib.auth',
        'django.contrib.contenttypes',
        'django.contrib.sessions',
        'django.contrib.messages',
        'django.contrib.staticfiles',
        'rest_framework',
        'corsheaders',
    ],
    MIDDLEWARE=[
        'corsheaders.middleware.CorsMiddleware',
        'django.middleware.security.SecurityMiddleware',
        'django.contrib.sessions.middleware.SessionMiddleware',
        'django.middleware.common.CommonMiddleware',
        'django.middleware.csrf.CsrfViewMiddleware',
        'django.contrib.auth.middleware.AuthenticationMiddleware',
        'django.contrib.messages.middleware.MessageMiddleware',
        'django.middleware.clickjacking.XFrameOptionsMiddleware',
    ],
    ROOT_URLCONF=__name__,
    DATABASES={
        'default': {
            'ENGINE': 'django.db.backends.postgresql',
            'NAME': 'ipo_db',
            'USER': 'postgres',
            'PASSWORD': '123',
            'HOST': 'localhost',
            'PORT': '5432',
        }
    },
    REST_FRAMEWORK={
        'DEFAULT_AUTHENTICATION_CLASSES': [
            'rest_framework.authentication.SessionAuthentication',
            'rest_framework.authentication.TokenAuthentication',
        ],
        'DEFAULT_PERMISSION_CLASSES': [
            'rest_framework.permissions.IsAuthenticated',
        ],
        'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
        'PAGE_SIZE': 20
    },
    TEMPLATES=[
        {
            'BACKEND': 'django.template.backends.django.DjangoTemplates',
            'DIRS': [],
            'APP_DIRS': True,
            'OPTIONS': {
                'context_processors': [
                    'django.template.context_processors.debug',
                    'django.template.context_processors.request',
                    'django.contrib.auth.context_processors.auth',
                    'django.contrib.messages.context_processors.messages',
                ],
            },
        },
    ],
    CORS_ALLOW_ALL_ORIGINS=True,
    CORS_ALLOWED_HEADERS=[
        'accept', 'accept-encoding', 'authorization', 'content-type',
        'dnt', 'origin', 'user-agent', 'x-csrftoken', 'x-requested-with',
    ],
    STATIC_URL='/static/',
    USE_TZ=True,
    TIME_ZONE='UTC',
)

# Setup Django
django.setup()

# Import Django components
from django.urls import path, include
from django.contrib import admin
from django.db import models
from django.contrib.auth.models import User
from rest_framework import viewsets, serializers, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from django.core.wsgi import get_wsgi_application
from django.core.management import execute_from_command_line

# Models
class Task(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    completed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='tasks')

    class Meta:
        app_label = 'backend'
        ordering = ['-created_at']

    def __str__(self):
        return self.title

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    color = models.CharField(max_length=7, default='#000000')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        app_label = 'backend'
        verbose_name_plural = 'categories'
        ordering = ['name']

    def __str__(self):
        return self.name

# Serializers
class TaskSerializer(serializers.ModelSerializer):
    owner = serializers.StringRelatedField(read_only=True)
    
    class Meta:
        model = Task
        fields = ['id', 'title', 'description', 'completed', 'created_at', 'updated_at', 'owner']
        read_only_fields = ['id', 'created_at', 'updated_at', 'owner']

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'description', 'color', 'created_at']
        read_only_fields = ['id', 'created_at']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'date_joined']
        read_only_fields = ['id', 'date_joined']

# ViewSets
class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Task.objects.filter(owner=self.request.user)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated]

# API Views
@api_view(['GET'])
def api_overview(request):
    return Response({
        'overview': '/api/',
        'tasks': '/api/tasks/',
        'categories': '/api/categories/',
        'profile': '/api/profile/',
        'admin': '/admin/',
        'auth': '/api-auth/login/',
    })

@api_view(['GET'])
def user_profile(request):
    if request.user.is_authenticated:
        serializer = UserSerializer(request.user)
        return Response(serializer.data)
    return Response({'error': 'Not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['GET'])
def dashboard_stats(request):
    if not request.user.is_authenticated:
        return Response({'error': 'Not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)
    
    user_tasks = Task.objects.filter(owner=request.user)
    stats = {
        'total_tasks': user_tasks.count(),
        'completed_tasks': user_tasks.filter(completed=True).count(),
        'pending_tasks': user_tasks.filter(completed=False).count(),
        'total_categories': Category.objects.count(),
    }
    if stats['total_tasks'] > 0:
        stats['completion_rate'] = (stats['completed_tasks'] / stats['total_tasks'] * 100)
    else:
        stats['completion_rate'] = 0
    
    return Response(stats)

# URL Configuration
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'tasks', TaskViewSet, basename='task')
router.register(r'categories', CategoryViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', api_overview, name='api-overview'),
    path('api/', include(router.urls)),
    path('api/profile/', user_profile, name='user-profile'),
    path('api/dashboard/', dashboard_stats, name='dashboard-stats'),
    path('api-auth/', include('rest_framework.urls')),
]

# WSGI Application
application = get_wsgi_application()

def run_server():
    try:
        print("🔧 Creating database tables...")
        execute_from_command_line(['manage.py', 'migrate', '--run-syncdb'])
        print("✅ Database tables created!")
    except Exception as e:
        print(f"⚠️  Migration info: {e}")
    
    try:
        if not User.objects.filter(is_superuser=True).exists():
            print("👤 Creating admin user...")
            User.objects.create_superuser('admin', 'admin@example.com', 'admin123')
            print("✅ Admin user created: admin/admin123")
    except Exception as e:
        print(f"⚠️  User creation info: {e}")
    
    print("\n" + "="*60)
    print("🚀 DJANGO REST API SERVER STARTED!")
    print("="*60)
    print("📍 API Overview:  http://localhost:8000/api/")
    print("🔧 Admin Panel:   http://localhost:8000/admin/")
    print("👤 Login:        admin / admin123")
    print("💾 Database:     ipo_db (PostgreSQL)")
    print("="*60)
    print("📝 Press Ctrl+C to stop the server")
    print("="*60)
    
    execute_from_command_line(['manage.py', 'runserver', '0.0.0.0:8000'])

if __name__ == '__main__':
    if len(sys.argv) > 1:
        execute_from_command_line(sys.argv)
    else:
        run_server()