#!/usr/bin/env python3
"""
Django REST API Backend - IPO Platform
"""

import os
import sys
from datetime import datetime, date, timedelta
from decimal import Decimal
from pathlib import Path

# Set Django settings
os.environ.setdefault('DJANGO_SETTINGS_MODULE', '__main__')

import django
from django.conf import settings

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

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
        'rest_framework.authtoken',
        'rest_framework_simplejwt',
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
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': BASE_DIR / 'ipo_db.sqlite3',
        }
    },
    REST_FRAMEWORK={
        'DEFAULT_AUTHENTICATION_CLASSES': [
            'rest_framework_simplejwt.authentication.JWTAuthentication',
            'rest_framework.authentication.SessionAuthentication',
            'rest_framework.authentication.TokenAuthentication',
        ],
        'DEFAULT_PERMISSION_CLASSES': [
            'rest_framework.permissions.IsAuthenticated',
        ],
        'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
        'PAGE_SIZE': 20
    },
    SIMPLE_JWT={
        'ACCESS_TOKEN_LIFETIME': timedelta(minutes=60),
        'REFRESH_TOKEN_LIFETIME': timedelta(days=7),
        'ROTATE_REFRESH_TOKENS': True,
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
from rest_framework import viewsets, serializers, status, filters
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.core.wsgi import get_wsgi_application
from django.core.management import execute_from_command_line
from django_filters.rest_framework import DjangoFilterBackend

# IPO Models
class Sector(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        app_label = 'backend'
        ordering = ['name']

    def __str__(self):
        return self.name

class IPO(models.Model):
    STATUS_CHOICES = [
        ('upcoming', 'Upcoming'),
        ('open', 'Open'),
        ('closed', 'Closed'),
        ('listed', 'Listed'),
        ('cancelled', 'Cancelled'),
    ]

    company_name = models.CharField(max_length=200)
    company_logo = models.URLField(blank=True, null=True)
    sector = models.ForeignKey(Sector, on_delete=models.SET_NULL, null=True, blank=True)
    ipo_open_date = models.DateField()
    ipo_close_date = models.DateField()
    price_band_min = models.DecimalField(max_digits=10, decimal_places=2)
    price_band_max = models.DecimalField(max_digits=10, decimal_places=2)
    lot_size = models.IntegerField()
    total_issue_size = models.BigIntegerField(help_text="Total issue size in rupees")
    fresh_issue = models.BigIntegerField(default=0, help_text="Fresh issue amount in rupees")
    offer_for_sale = models.BigIntegerField(default=0, help_text="Offer for sale amount in rupees")
    rhp_link = models.URLField(help_text="Red Herring Prospectus link")
    listing_date = models.DateField(null=True, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='upcoming')
    
    # Additional IPO details
    lead_managers = models.TextField(help_text="Comma separated lead managers")
    registrar = models.CharField(max_length=200, blank=True)
    market_maker = models.CharField(max_length=200, blank=True)
    
    # Subscription details
    retail_subscription = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    qib_subscription = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    nii_subscription = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    
    # Trading details
    listing_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    listing_gains = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True, help_text="Listing gains in percentage")
    
    # Meta information
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        app_label = 'backend'
        ordering = ['-ipo_open_date']

    def __str__(self):
        return f"{self.company_name} - {self.status}"

    @property
    def price_band(self):
        return f"₹{self.price_band_min} - ₹{self.price_band_max}"

    @property
    def is_open(self):
        today = date.today()
        return self.ipo_open_date <= today <= self.ipo_close_date

    @property
    def days_remaining(self):
        if self.status == 'upcoming':
            return (self.ipo_open_date - date.today()).days
        elif self.status == 'open':
            return (self.ipo_close_date - date.today()).days
        return 0

class IPOApplication(models.Model):
    """Track user applications to IPOs"""
    ipo = models.ForeignKey(IPO, on_delete=models.CASCADE, related_name='applications')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    bid_price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.IntegerField(help_text="Number of lots")
    total_amount = models.DecimalField(max_digits=15, decimal_places=2)
    application_date = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=[
        ('submitted', 'Submitted'),
        ('confirmed', 'Confirmed'),
        ('allotted', 'Allotted'),
        ('rejected', 'Rejected'),
    ], default='submitted')

    class Meta:
        app_label = 'backend'
        unique_together = ['ipo', 'user']

    def __str__(self):
        return f"{self.user.username} - {self.ipo.company_name}"

# Serializers
class SectorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sector
        fields = ['id', 'name', 'description', 'created_at']
        read_only_fields = ['id', 'created_at']

class IPOSerializer(serializers.ModelSerializer):
    sector_name = serializers.CharField(source='sector.name', read_only=True)
    price_band = serializers.CharField(read_only=True)
    is_open = serializers.BooleanField(read_only=True)
    days_remaining = serializers.IntegerField(read_only=True)
    created_by_username = serializers.CharField(source='created_by.username', read_only=True)

    class Meta:
        model = IPO
        fields = [
            'id', 'company_name', 'company_logo', 'sector', 'sector_name',
            'ipo_open_date', 'ipo_close_date', 'price_band_min', 'price_band_max',
            'price_band', 'lot_size', 'total_issue_size', 'fresh_issue', 'offer_for_sale',
            'rhp_link', 'listing_date', 'status', 'lead_managers', 'registrar',
            'market_maker', 'retail_subscription', 'qib_subscription', 'nii_subscription',
            'listing_price', 'listing_gains', 'is_open', 'days_remaining',
            'created_at', 'updated_at', 'created_by_username', 'is_active'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at', 'created_by_username']

class IPOApplicationSerializer(serializers.ModelSerializer):
    ipo_name = serializers.CharField(source='ipo.company_name', read_only=True)
    user_name = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = IPOApplication
        fields = [
            'id', 'ipo', 'ipo_name', 'user', 'user_name',
            'bid_price', 'quantity', 'total_amount', 'application_date', 'status'
        ]
        read_only_fields = ['id', 'application_date', 'user']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'date_joined', 'is_staff']
        read_only_fields = ['id', 'date_joined']

# ViewSets
class SectorViewSet(viewsets.ModelViewSet):
    queryset = Sector.objects.all()
    serializer_class = SectorSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'description']
    ordering_fields = ['name', 'created_at']

class IPOViewSet(viewsets.ModelViewSet):
    serializer_class = IPOSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['status', 'sector', 'is_active']
    search_fields = ['company_name', 'sector__name', 'lead_managers']
    ordering_fields = ['ipo_open_date', 'ipo_close_date', 'company_name', 'created_at']
    ordering = ['-ipo_open_date']

    def get_queryset(self):
        queryset = IPO.objects.filter(is_active=True)
        
        # Filter by date ranges
        open_from = self.request.query_params.get('open_from')
        open_to = self.request.query_params.get('open_to')
        
        if open_from:
            queryset = queryset.filter(ipo_open_date__gte=open_from)
        if open_to:
            queryset = queryset.filter(ipo_open_date__lte=open_to)
            
        return queryset

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    @action(detail=False, methods=['get'])
    def upcoming(self, request):
        """Get only upcoming IPOs"""
        upcoming_ipos = self.get_queryset().filter(status='upcoming')
        serializer = self.get_serializer(upcoming_ipos, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def open_now(self, request):
        """Get IPOs that are currently open"""
        open_ipos = self.get_queryset().filter(status='open')
        serializer = self.get_serializer(open_ipos, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def statistics(self, request):
        """Get IPO statistics"""
        queryset = self.get_queryset()
        stats = {
            'total_ipos': queryset.count(),
            'upcoming_ipos': queryset.filter(status='upcoming').count(),
            'open_ipos': queryset.filter(status='open').count(),
            'closed_ipos': queryset.filter(status='closed').count(),
            'listed_ipos': queryset.filter(status='listed').count(),
            'avg_listing_gains': queryset.filter(
                listing_gains__isnull=False
            ).aggregate(models.Avg('listing_gains'))['listing_gains__avg'] or 0,
        }
        return Response(stats)

class IPOApplicationViewSet(viewsets.ModelViewSet):
    serializer_class = IPOApplicationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        if self.request.user.is_staff:
            return IPOApplication.objects.all()
        return IPOApplication.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

# API Views
@api_view(['GET'])
@permission_classes([AllowAny])
def api_overview(request):
    return Response({
        'overview': '/api/',
        'authentication': {
            'login': '/api/auth/login/',
            'refresh': '/api/auth/refresh/',
            'register': '/api/auth/register/',
        },
        'ipo_endpoints': {
            'ipos': '/api/ipos/',
            'upcoming_ipos': '/api/ipos/upcoming/',
            'open_ipos': '/api/ipos/open_now/',
            'ipo_statistics': '/api/ipos/statistics/',
        },
        'sectors': '/api/sectors/',
        'applications': '/api/applications/',
        'profile': '/api/profile/',
        'admin': '/admin/',
    })

@api_view(['GET'])
def user_profile(request):
    if request.user.is_authenticated:
        serializer = UserSerializer(request.user)
        return Response(serializer.data)
    return Response({'error': 'Not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')
    first_name = request.data.get('first_name', '')
    last_name = request.data.get('last_name', '')

    if not username or not password:
        return Response({'error': 'Username and password required'}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(
        username=username,
        email=email,
        password=password,
        first_name=first_name,
        last_name=last_name
    )
    
    serializer = UserSerializer(user)
    return Response({
        'message': 'User created successfully',
        'user': serializer.data
    }, status=status.HTTP_201_CREATED)

# URL Configuration
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'ipos', IPOViewSet, basename='ipo')
router.register(r'sectors', SectorViewSet)
router.register(r'applications', IPOApplicationViewSet, basename='application')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', api_overview, name='api-overview'),
    path('api/', include(router.urls)),
    path('api/profile/', user_profile, name='user-profile'),
    path('api/auth/register/', register_user, name='register'),
    path('api/auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api-auth/', include('rest_framework.urls')),
]

# WSGI Application
application = get_wsgi_application()

def create_dummy_data():
    """Create realistic IPO dummy data"""
    print("📊 Creating dummy IPO data...")
    
    # Create sectors
    sectors_data = [
        {'name': 'Technology', 'description': 'Information Technology and Software companies'},
        {'name': 'Financial Services', 'description': 'Banks, NBFCs, and Financial institutions'},
        {'name': 'Healthcare', 'description': 'Pharmaceuticals and Healthcare companies'},
        {'name': 'Manufacturing', 'description': 'Manufacturing and Industrial companies'},
        {'name': 'Real Estate', 'description': 'Real Estate and Construction companies'},
        {'name': 'Energy', 'description': 'Power, Oil & Gas companies'},
        {'name': 'Consumer Goods', 'description': 'FMCG and Consumer products'},
        {'name': 'Telecommunications', 'description': 'Telecom and Communication services'},
    ]
    
    for sector_data in sectors_data:
        sector, created = Sector.objects.get_or_create(
            name=sector_data['name'],
            defaults={'description': sector_data['description']}
        )
    
    # Create sample IPOs
    ipos_data = [
        {
            'company_name': 'TechNova Solutions',
            'sector': 'Technology',
            'ipo_open_date': '2024-02-15',
            'ipo_close_date': '2024-02-17',
            'price_band_min': 250,
            'price_band_max': 265,
            'lot_size': 56,
            'total_issue_size': 5000000000,
            'fresh_issue': 3000000000,
            'offer_for_sale': 2000000000,
            'status': 'upcoming',
            'lead_managers': 'ICICI Securities, Kotak Mahindra Capital',
            'registrar': 'Link Intime India',
        },
        {
            'company_name': 'GreenEnergy Power',
            'sector': 'Energy',
            'ipo_open_date': '2024-02-20',
            'ipo_close_date': '2024-02-22',
            'price_band_min': 180,
            'price_band_max': 195,
            'lot_size': 77,
            'total_issue_size': 3500000000,
            'fresh_issue': 2500000000,
            'offer_for_sale': 1000000000,
            'status': 'upcoming',
            'lead_managers': 'SBI Capital Markets, Axis Capital',
            'registrar': 'KFin Technologies',
        },
        {
            'company_name': 'HealthCare Plus',
            'sector': 'Healthcare',
            'ipo_open_date': '2024-01-15',
            'ipo_close_date': '2024-01-17',
            'price_band_min': 320,
            'price_band_max': 340,
            'lot_size': 44,
            'total_issue_size': 4200000000,
            'fresh_issue': 4200000000,
            'offer_for_sale': 0,
            'status': 'listed',
            'listing_price': 380,
            'listing_gains': 11.76,
            'lead_managers': 'Morgan Stanley, Goldman Sachs',
            'registrar': 'Computech Sharecap',
        },
        {
            'company_name': 'FinTech Innovations',
            'sector': 'Financial Services',
            'ipo_open_date': '2024-02-10',
            'ipo_close_date': '2024-02-12',
            'price_band_min': 450,
            'price_band_max': 475,
            'lot_size': 31,
            'total_issue_size': 6000000000,
            'fresh_issue': 4000000000,
            'offer_for_sale': 2000000000,
            'status': 'open',
            'lead_managers': 'HDFC Bank, ICICI Securities',
            'registrar': 'Bigshare Services',
        },
        {
            'company_name': 'Smart Manufacturing',
            'sector': 'Manufacturing',
            'ipo_open_date': '2024-02-25',
            'ipo_close_date': '2024-02-27',
            'price_band_min': 290,
            'price_band_max': 310,
            'lot_size': 48,
            'total_issue_size': 2800000000,
            'fresh_issue': 1800000000,
            'offer_for_sale': 1000000000,
            'status': 'upcoming',
            'lead_managers': 'Yes Securities, Motilal Oswal',
            'registrar': 'Link Intime India',
        }
    ]
    
    for ipo_data in ipos_data:
        sector = Sector.objects.get(name=ipo_data.pop('sector'))
        ipo_data['sector'] = sector
        ipo_data['rhp_link'] = f"https://example.com/rhp/{ipo_data['company_name'].lower().replace(' ', '-')}.pdf"
        
        # Convert string dates to date objects
        ipo_data['ipo_open_date'] = datetime.strptime(ipo_data['ipo_open_date'], '%Y-%m-%d').date()
        ipo_data['ipo_close_date'] = datetime.strptime(ipo_data['ipo_close_date'], '%Y-%m-%d').date()
        
        ipo, created = IPO.objects.get_or_create(
            company_name=ipo_data['company_name'],
            defaults=ipo_data
        )
        if created:
            print(f"✅ Created IPO: {ipo.company_name}")

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
    
    # Create dummy data
    try:
        create_dummy_data()
        print("✅ Dummy IPO data created!")
    except Exception as e:
        print(f"⚠️  Dummy data info: {e}")
    
    print("\n" + "="*70)
    print("🚀 IPO PLATFORM API SERVER STARTED!")
    print("="*70)
    print("📍 API Overview:      http://localhost:8000/api/")
    print("🔧 Admin Panel:       http://localhost:8000/admin/")
    print("👤 Login:            admin / admin123")
    print("💾 Database:         ipo_db (PostgreSQL)")
    print("🏢 IPO Endpoints:")
    print("   📋 All IPOs:       GET /api/ipos/")
    print("   🔮 Upcoming:       GET /api/ipos/upcoming/")
    print("   🟢 Open Now:       GET /api/ipos/open_now/")
    print("   📊 Statistics:     GET /api/ipos/statistics/")
    print("   🏭 Sectors:        GET /api/sectors/")
    print("   📝 Applications:   GET /api/applications/")
    print("🔐 Authentication:")
    print("   🔑 Login:          POST /api/auth/login/")
    print("   ♻️  Refresh:        POST /api/auth/refresh/")
    print("   📝 Register:       POST /api/auth/register/")
    print("="*70)
    print("📝 Press Ctrl+C to stop the server")
    print("="*70)
    
    execute_from_command_line(['manage.py', 'runserver', '0.0.0.0:8000'])

if __name__ == '__main__':
    if len(sys.argv) > 1:
        execute_from_command_line(sys.argv)
    else:
        run_server()