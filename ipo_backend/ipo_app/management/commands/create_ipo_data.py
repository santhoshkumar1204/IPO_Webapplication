from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from datetime import datetime
from ipo_app.models import Sector, IPO, IPOApplication

class Command(BaseCommand):
    help = 'Create realistic IPO dummy data'

    def handle(self, *args, **options):
        self.stdout.write(self.style.SUCCESS('📊 Creating IPO platform dummy data...'))
        
        # Create sectors
        sectors_data = [
            {'name': 'Technology', 'description': 'Information Technology and Software companies', 'color': '#007bff'},
            {'name': 'Financial Services', 'description': 'Banks, NBFCs, and Financial institutions', 'color': '#28a745'},
            {'name': 'Healthcare', 'description': 'Pharmaceuticals and Healthcare companies', 'color': '#dc3545'},
            {'name': 'Manufacturing', 'description': 'Manufacturing and Industrial companies', 'color': '#fd7e14'},
            {'name': 'Real Estate', 'description': 'Real Estate and Construction companies', 'color': '#6610f2'},
            {'name': 'Energy', 'description': 'Power, Oil & Gas companies', 'color': '#e83e8c'},
            {'name': 'Consumer Goods', 'description': 'FMCG and Consumer products', 'color': '#20c997'},
            {'name': 'Telecommunications', 'description': 'Telecom and Communication services', 'color': '#6f42c1'},
        ]
        
        for sector_data in sectors_data:
            sector, created = Sector.objects.get_or_create(
                name=sector_data['name'],
                defaults={
                    'description': sector_data['description'],
                    'color': sector_data['color']
                }
            )
            if created:
                self.stdout.write(f"✅ Created Sector: {sector.name}")
        
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
                self.stdout.write(f"✅ Created IPO: {ipo.company_name}")
        
        self.stdout.write(self.style.SUCCESS('✅ IPO platform dummy data created successfully!'))