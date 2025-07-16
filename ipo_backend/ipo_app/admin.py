from django.contrib import admin
from .models import Sector, IPO, IPOApplication

@admin.register(Sector)
class SectorAdmin(admin.ModelAdmin):
    list_display = ['name', 'description', 'color', 'created_at']
    list_filter = ['created_at']
    search_fields = ['name', 'description']
    ordering = ['name']

@admin.register(IPO)
class IPOAdmin(admin.ModelAdmin):
    list_display = [
        'company_name', 'sector', 'status', 'ipo_open_date', 
        'ipo_close_date', 'price_band', 'is_active'
    ]
    list_filter = ['status', 'sector', 'is_active', 'ipo_open_date']
    search_fields = ['company_name', 'lead_managers', 'sector__name']
    ordering = ['-ipo_open_date']
    date_hierarchy = 'ipo_open_date'
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('company_name', 'company_logo', 'sector', 'status', 'is_active')
        }),
        ('IPO Dates', {
            'fields': ('ipo_open_date', 'ipo_close_date', 'listing_date')
        }),
        ('Price Information', {
            'fields': ('price_band_min', 'price_band_max', 'lot_size')
        }),
        ('Issue Size', {
            'fields': ('total_issue_size', 'fresh_issue', 'offer_for_sale')
        }),
        ('Market Participants', {
            'fields': ('lead_managers', 'registrar', 'market_maker')
        }),
        ('Subscription Details', {
            'fields': ('retail_subscription', 'qib_subscription', 'nii_subscription')
        }),
        ('Listing Details', {
            'fields': ('listing_price', 'listing_gains')
        }),
        ('Documents', {
            'fields': ('rhp_link',)
        }),
        ('Meta Information', {
            'fields': ('created_by',),
            'classes': ('collapse',)
        })
    )
    
    readonly_fields = ['created_at', 'updated_at']

@admin.register(IPOApplication)
class IPOApplicationAdmin(admin.ModelAdmin):
    list_display = [
        'user', 'ipo', 'bid_price', 'quantity', 
        'total_amount', 'status', 'application_date'
    ]
    list_filter = ['status', 'application_date', 'ipo__sector']
    search_fields = ['user__username', 'ipo__company_name']
    ordering = ['-application_date']
    date_hierarchy = 'application_date'
    
    fieldsets = (
        ('Application Details', {
            'fields': ('user', 'ipo', 'status')
        }),
        ('Bid Information', {
            'fields': ('bid_price', 'quantity', 'total_amount')
        }),
        ('Meta Information', {
            'fields': ('application_date',),
            'classes': ('collapse',)
        })
    )
    
    readonly_fields = ['application_date']