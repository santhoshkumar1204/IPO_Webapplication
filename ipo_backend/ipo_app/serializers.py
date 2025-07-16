from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Sector, IPO, IPOApplication

class SectorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sector
        fields = ['id', 'name', 'description', 'color', 'created_at']
        read_only_fields = ['id', 'created_at']

class IPOSerializer(serializers.ModelSerializer):
    sector_name = serializers.CharField(source='sector.name', read_only=True)
    sector_color = serializers.CharField(source='sector.color', read_only=True)
    price_band = serializers.CharField(read_only=True)
    is_open = serializers.BooleanField(read_only=True)
    days_remaining = serializers.IntegerField(read_only=True)
    created_by_username = serializers.CharField(source='created_by.username', read_only=True)

    class Meta:
        model = IPO
        fields = [
            'id', 'company_name', 'company_logo', 'sector', 'sector_name', 'sector_color',
            'ipo_open_date', 'ipo_close_date', 'listing_date', 'price_band_min', 'price_band_max',
            'price_band', 'lot_size', 'total_issue_size', 'fresh_issue', 'offer_for_sale',
            'rhp_link', 'status', 'lead_managers', 'registrar', 'market_maker',
            'retail_subscription', 'qib_subscription', 'nii_subscription',
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