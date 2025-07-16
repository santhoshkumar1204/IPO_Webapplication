#!/usr/bin/env python3
"""
IPO Platform Server Startup Script
"""
import os
import sys
import django
from django.core.management import execute_from_command_line
from django.contrib.auth.models import User

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ipo_backend.settings')
django.setup()

def run_server():
    """
    Run the IPO Platform server with proper setup
    """
    try:
        print("🔧 Creating database tables...")
        execute_from_command_line(['manage.py', 'migrate'])
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
    
    try:
        print("📊 Creating IPO dummy data...")
        execute_from_command_line(['manage.py', 'create_ipo_data'])
        print("✅ IPO dummy data created!")
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
    print("   📈 Dashboard:      GET /api/dashboard/")
    print("🔐 Authentication:")
    print("   🔑 Login:          POST /api/auth/login/")
    print("   ♻️  Refresh:        POST /api/auth/refresh/")
    print("   📝 Register:       POST /api/auth/register/")
    print("="*70)
    print("📝 Press Ctrl+C to stop the server")
    print("="*70)
    
    execute_from_command_line(['manage.py', 'runserver', '0.0.0.0:8000'])

if __name__ == '__main__':
    run_server()