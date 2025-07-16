from django.db import models
from django.contrib.auth.models import User
from rest_framework import viewsets, status, filters
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.permissions import IsAuthenticated, AllowAny
from django_filters.rest_framework import DjangoFilterBackend

from .models import Sector, IPO, IPOApplication
from .serializers import SectorSerializer, IPOSerializer, IPOApplicationSerializer, UserSerializer

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
        
        # Additional filtering
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
        """Get upcoming IPOs only"""
        upcoming_ipos = self.get_queryset().filter(status='upcoming')
        serializer = self.get_serializer(upcoming_ipos, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def open_now(self, request):
        """Get currently open IPOs"""
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
            'total_sectors': Sector.objects.count(),
        }
        return Response(stats)

class IPOApplicationViewSet(viewsets.ModelViewSet):
    serializer_class = IPOApplicationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Users see only their own applications
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
        'auth': '/api-auth/login/',
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

@api_view(['GET'])
def dashboard_stats(request):
    if not request.user.is_authenticated:
        return Response({'error': 'Not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)
    
    user_applications = IPOApplication.objects.filter(user=request.user)
    all_ipos = IPO.objects.filter(is_active=True)
    
    stats = {
        'total_ipos': all_ipos.count(),
        'my_applications': user_applications.count(),
        'upcoming_ipos': all_ipos.filter(status='upcoming').count(),
        'open_ipos': all_ipos.filter(status='open').count(),
        'my_allotted': user_applications.filter(status='allotted').count(),
        'total_sectors': Sector.objects.count(),
    }
    
    return Response(stats)