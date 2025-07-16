from django.db import models
from django.contrib.auth.models import User
from datetime import date

class Sector(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    color = models.CharField(max_length=7, default='#000000')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = 'sectors'
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

    # Basic IPO Information
    company_name = models.CharField(max_length=200)
    company_logo = models.URLField(blank=True, null=True)
    sector = models.ForeignKey(Sector, on_delete=models.SET_NULL, null=True, blank=True)
    
    # IPO Dates
    ipo_open_date = models.DateField()
    ipo_close_date = models.DateField()
    listing_date = models.DateField(null=True, blank=True)
    
    # Price Information
    price_band_min = models.DecimalField(max_digits=10, decimal_places=2)
    price_band_max = models.DecimalField(max_digits=10, decimal_places=2)
    lot_size = models.IntegerField()
    
    # Issue Size
    total_issue_size = models.BigIntegerField(help_text="Total issue size in rupees")
    fresh_issue = models.BigIntegerField(default=0, help_text="Fresh issue amount in rupees")
    offer_for_sale = models.BigIntegerField(default=0, help_text="Offer for sale amount in rupees")
    
    # Documents and Links
    rhp_link = models.URLField(help_text="Red Herring Prospectus link")
    
    # Status
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='upcoming')
    
    # Market Participants
    lead_managers = models.TextField(help_text="Comma separated lead managers")
    registrar = models.CharField(max_length=200, blank=True)
    market_maker = models.CharField(max_length=200, blank=True)
    
    # Subscription Details
    retail_subscription = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    qib_subscription = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    nii_subscription = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    
    # Listing Details
    listing_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    listing_gains = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True, help_text="Listing gains in percentage")
    
    # Meta Information
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='created_ipos')
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['-ipo_open_date']

    def __str__(self):
        return f"{self.company_name} - {self.status}"

    @property
    def price_band(self):
        return f"₹{self.price_band_min} - ₹{self.price_band_max}"

    @property
    def is_open(self):
        today = date.today()
        return self.ipo_open_date <= today <= self.ipo_close_date and self.status == 'open'

    @property
    def days_remaining(self):
        today = date.today()
        if self.status == 'upcoming':
            return max(0, (self.ipo_open_date - today).days)
        elif self.status == 'open':
            return max(0, (self.ipo_close_date - today).days)
        return 0

class IPOApplication(models.Model):
    """User IPO Applications"""
    ipo = models.ForeignKey(IPO, on_delete=models.CASCADE, related_name='applications')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='ipo_applications')
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
        unique_together = ['ipo', 'user']
        ordering = ['-application_date']

    def __str__(self):
        return f"{self.user.username} - {self.ipo.company_name}"